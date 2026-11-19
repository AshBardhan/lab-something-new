import { Injectable, signal, computed } from '@angular/core';
import { Todo, TodoFilter } from '../models/todo.model';

/**
 * Todo Service
 *
 * Core service for managing todo items and business logic.
 * Uses Angular signals for reactive state management.
 *
 * This service handles:
 * - CRUD operations for todos (Create, Read, Update, Delete)
 * - Filtering logic for different views
 * - Persistence to localStorage
 * - Computed statistics for todos
 */
@Injectable({
  providedIn: 'root' // Makes this service available application-wide as a singleton
})
export class TodoService {
  /**
   * LOCAL_STORAGE_KEY
   * Key used to store/retrieve todos from browser's localStorage
   */
  private readonly LOCAL_STORAGE_KEY = 'angular-todos';

  /**
   * Signal holding the array of all todos
   * Signals are Angular's reactive primitives that notify when values change
   */
  private todosSignal = signal<Todo[]>(this.loadTodosFromStorage());

  /**
   * Signal holding the current filter state
   * Default is 'all' to show all todos on initial load
   */
  private filterSignal = signal<TodoFilter>('all');

  /**
   * Public readonly access to all todos
   * Returns the current array of todos
   */
  public readonly todos = this.todosSignal.asReadonly();

  /**
   * Public readonly access to current filter
   * Returns the current filter state
   */
  public readonly currentFilter = this.filterSignal.asReadonly();

  /**
   * Computed signal: Filtered todos based on current filter
   * Automatically recalculates when todos or filter changes
   *
   * @returns Filtered array of todos based on currentFilter value
   */
  public readonly filteredTodos = computed(() => {
    const todos = this.todosSignal();
    const filter = this.filterSignal();

    switch (filter) {
      case 'active':
        // Return only todos that are not completed
        return todos.filter(todo => !todo.completed);
      case 'completed':
        // Return only todos that are completed
        return todos.filter(todo => todo.completed);
      default:
        // Return all todos
        return todos;
    }
  });

  /**
   * Computed signal: Count of active (incomplete) todos
   * Useful for displaying "X items left" in the UI
   *
   * @returns Number of todos that are not completed
   */
  public readonly activeTodoCount = computed(() => {
    return this.todosSignal().filter(todo => !todo.completed).length;
  });

  /**
   * Computed signal: Count of completed todos
   * Used to conditionally show/hide "Clear completed" button
   *
   * @returns Number of todos that are completed
   */
  public readonly completedTodoCount = computed(() => {
    return this.todosSignal().filter(todo => todo.completed).length;
  });

  /**
   * Computed signal: Check if there are any todos
   * Useful for conditional rendering of the todo list section
   *
   * @returns true if there are todos, false otherwise
   */
  public readonly hasTodos = computed(() => {
    return this.todosSignal().length > 0;
  });

  /**
   * Add a new todo item
   *
   * Creates a new todo with the provided title and adds it to the list.
   * The new todo is marked as not completed by default.
   *
   * @param title - The text content of the new todo
   */
  addTodo(title: string): void {
    // Trim whitespace and check if title is not empty
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return; // Don't add empty todos
    }

    // Create new todo object
    const newTodo: Todo = {
      id: Date.now(), // Use timestamp as unique ID
      title: trimmedTitle,
      completed: false,
      createdAt: new Date()
    };

    // Update the signal with new array including the new todo
    this.todosSignal.update(todos => [...todos, newTodo]);

    // Persist to localStorage
    this.saveTodosToStorage();
  }

  /**
   * Toggle the completed status of a todo
   *
   * Finds the todo by ID and flips its completed property.
   *
   * @param id - The unique identifier of the todo to toggle
   */
  toggleTodo(id: number): void {
    this.todosSignal.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // Create new object with flipped completed status
          : todo // Keep other todos unchanged
      )
    );

    this.saveTodosToStorage();
  }

  /**
   * Delete a todo item
   *
   * Removes the todo with the specified ID from the list.
   *
   * @param id - The unique identifier of the todo to delete
   */
  deleteTodo(id: number): void {
    this.todosSignal.update(todos =>
      todos.filter(todo => todo.id !== id) // Keep all todos except the one with matching ID
    );

    this.saveTodosToStorage();
  }

  /**
   * Update the title of an existing todo
   *
   * Finds the todo by ID and updates its title with the new value.
   *
   * @param id - The unique identifier of the todo to update
   * @param newTitle - The new title text for the todo
   */
  updateTodo(id: number, newTitle: string): void {
    const trimmedTitle = newTitle.trim();

    // If title is empty after trimming, delete the todo
    if (!trimmedTitle) {
      this.deleteTodo(id);
      return;
    }

    this.todosSignal.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, title: trimmedTitle } // Create new object with updated title
          : todo
      )
    );

    this.saveTodosToStorage();
  }

  /**
   * Remove all completed todos
   *
   * Filters out all todos where completed is true.
   * Useful for bulk cleanup of finished tasks.
   */
  clearCompleted(): void {
    this.todosSignal.update(todos =>
      todos.filter(todo => !todo.completed) // Keep only active todos
    );

    this.saveTodosToStorage();
  }

  /**
   * Toggle all todos to completed or active
   *
   * If all todos are currently completed, mark them all as active.
   * If any todo is active, mark all as completed.
   *
   * @param completed - The target completed state for all todos
   */
  toggleAll(completed: boolean): void {
    this.todosSignal.update(todos =>
      todos.map(todo => ({ ...todo, completed }))
    );

    this.saveTodosToStorage();
  }

  /**
   * Set the current filter
   *
   * Updates the filter signal which automatically updates filteredTodos.
   *
   * @param filter - The filter to apply ('all', 'active', or 'completed')
   */
  setFilter(filter: TodoFilter): void {
    this.filterSignal.set(filter);
  }

  /**
   * Load todos from localStorage
   *
   * Retrieves and parses the stored todos from browser's localStorage.
   * Called during service initialization.
   *
   * @returns Array of todos from storage, or empty array if none exist
   * @private
   */
  private loadTodosFromStorage(): Todo[] {
    try {
      const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      // Convert date strings back to Date objects
      return parsed.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  }

  /**
   * Save todos to localStorage
   *
   * Serializes the current todos array and stores it in localStorage.
   * Called after any modification to the todos list.
   *
   * @private
   */
  private saveTodosToStorage(): void {
    try {
      const todos = this.todosSignal();
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }
}

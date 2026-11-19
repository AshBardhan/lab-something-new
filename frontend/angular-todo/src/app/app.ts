import { Component, inject } from '@angular/core';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { TodoService } from './services/todo.service';
import { TodoFilter } from './models/todo.model';

/**
 * App Component (Root Component)
 *
 * The main application component that orchestrates the todo list functionality.
 * This component acts as the container/smart component that:
 * - Injects and uses the TodoService for state management
 * - Renders presentational/dumb components (TodoInput, TodoList, TodoFooter)
 * - Handles events from child components and delegates to the service
 *
 * Component Architecture:
 * - Uses Angular's standalone component API (no NgModule needed)
 * - Leverages dependency injection for the TodoService
 * - Uses signals for reactive state management
 * - Follows container/presentational component pattern
 */
@Component({
  selector: 'app-root',
  imports: [TodoInputComponent, TodoListComponent, TodoFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /**
   * Inject the TodoService
   *
   * The inject() function is Angular's modern way to inject dependencies.
   * This gives us access to all todo-related operations and computed state.
   */
  private todoService = inject(TodoService);

  /**
   * Expose service properties to the template
   * These are readonly signals that automatically update the view
   */
  protected filteredTodos = this.todoService.filteredTodos;
  protected activeTodoCount = this.todoService.activeTodoCount;
  protected completedTodoCount = this.todoService.completedTodoCount;
  protected currentFilter = this.todoService.currentFilter;
  protected hasTodos = this.todoService.hasTodos;

  /**
   * Handle new todo submission
   *
   * Called when user adds a new todo via TodoInputComponent.
   * Delegates the actual creation to the service.
   *
   * @param title - The title of the new todo
   */
  onTodoAdded(title: string): void {
    this.todoService.addTodo(title);
  }

  /**
   * Handle todo toggle (mark as complete/incomplete)
   *
   * Called when user clicks the checkbox on a todo item.
   * Delegates to the service to update the todo's completed status.
   *
   * @param id - The ID of the todo to toggle
   */
  onTodoToggled(id: number): void {
    this.todoService.toggleTodo(id);
  }

  /**
   * Handle todo deletion
   *
   * Called when user clicks the delete button on a todo item.
   * Delegates to the service to remove the todo.
   *
   * @param id - The ID of the todo to delete
   */
  onTodoDeleted(id: number): void {
    this.todoService.deleteTodo(id);
  }

  /**
   * Handle todo update (editing title)
   *
   * Called when user finishes editing a todo's title.
   * Delegates to the service to update the todo.
   *
   * @param data - Object containing the todo ID and new title
   */
  onTodoUpdated(data: { id: number; title: string }): void {
    this.todoService.updateTodo(data.id, data.title);
  }

  /**
   * Handle filter change
   *
   * Called when user clicks a filter button (All, Active, Completed).
   * Updates the service's filter, which automatically updates the filtered todos.
   *
   * @param filter - The new filter to apply
   */
  onFilterChanged(filter: TodoFilter): void {
    this.todoService.setFilter(filter);
  }

  /**
   * Handle clear completed action
   *
   * Called when user clicks "Clear completed" button.
   * Delegates to the service to remove all completed todos.
   */
  onClearCompleted(): void {
    this.todoService.clearCompleted();
  }
}

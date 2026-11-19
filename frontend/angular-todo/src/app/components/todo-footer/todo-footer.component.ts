import { Component, input, output } from '@angular/core';
import { TodoFiltersComponent } from '../todo-filters/todo-filters.component';
import { TodoFilter } from '../../models/todo.model';

/**
 * TodoFooterComponent
 *
 * Footer component displaying todo statistics and actions.
 *
 * Features:
 * - Shows count of active (incomplete) todos
 * - Contains filter buttons (via TodoFiltersComponent)
 * - "Clear completed" button (shown only when there are completed todos)
 *
 * Usage:
 * <todo-footer
 *   [activeCount]="activeTodosCount"
 *   [completedCount]="completedTodosCount"
 *   [currentFilter]="filter"
 *   (filterChanged)="handleFilterChange($event)"
 *   (clearCompleted)="handleClearCompleted()"
 * />
 */
@Component({
  selector: 'todo-footer',
  imports: [TodoFiltersComponent],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent {
  /**
   * Input: Number of active (incomplete) todos
   * Used to display "X item(s) left" message
   */
  activeCount = input.required<number>();

  /**
   * Input: Number of completed todos
   * Used to conditionally show "Clear completed" button
   */
  completedCount = input.required<number>();

  /**
   * Input: Currently active filter
   * Passed down to TodoFiltersComponent
   */
  currentFilter = input.required<TodoFilter>();

  /**
   * Output: Emitted when user changes the filter
   * Forwards event from TodoFiltersComponent to parent
   */
  filterChanged = output<TodoFilter>();

  /**
   * Output: Emitted when "Clear completed" button is clicked
   */
  clearCompleted = output<void>();

  /**
   * Handle filter change from child component
   *
   * @param filter - The new filter selected by user
   */
  onFilterChange(filter: TodoFilter): void {
    this.filterChanged.emit(filter);
  }

  /**
   * Handle clear completed button click
   * Emits event to parent to remove all completed todos
   */
  onClearCompleted(): void {
    this.clearCompleted.emit();
  }

  /**
   * Get the correct pluralization for "item(s)"
   *
   * @returns "item" if count is 1, "items" otherwise
   */
  getItemText(): string {
    return this.activeCount() === 1 ? 'item' : 'items';
  }
}

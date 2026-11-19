import { Component, input, output } from '@angular/core';
import { TodoFilter } from '../../models/todo.model';

/**
 * TodoFiltersComponent
 *
 * Navigation component for filtering todos by status.
 * Provides buttons to switch between 'all', 'active', and 'completed' views.
 *
 * Features:
 * - Three filter buttons (All, Active, Completed)
 * - Visual indication of currently active filter
 * - Emits filter change events to parent
 *
 * Usage:
 * <todo-filters
 *   [currentFilter]="filter"
 *   (filterChanged)="handleFilterChange($event)"
 * />
 */
@Component({
  selector: 'todo-filters',
  imports: [],
  templateUrl: './todo-filters.component.html',
  styleUrl: './todo-filters.component.css'
})
export class TodoFiltersComponent {
  /**
   * Input: The currently active filter
   * Used to highlight the active button
   */
  currentFilter = input.required<TodoFilter>();

  /**
   * Output: Emitted when user clicks a filter button
   * Passes the selected filter to parent
   */
  filterChanged = output<TodoFilter>();

  /**
   * Handle filter button click
   *
   * Emits the filterChanged event with the selected filter.
   *
   * @param filter - The filter that was clicked ('all', 'active', or 'completed')
   */
  onFilterClick(filter: TodoFilter): void {
    this.filterChanged.emit(filter);
  }

  /**
   * Check if a filter is currently active
   *
   * Used to apply the active modifier class to the button.
   *
   * @param filter - The filter to check
   * @returns true if this filter is currently active
   */
  isActive(filter: TodoFilter): boolean {
    return this.currentFilter() === filter;
  }
}

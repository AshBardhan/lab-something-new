import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

/**
 * TodoListComponent
 *
 * Container component that renders a list of todos.
 * Acts as a mediator between individual TodoItems and the parent.
 *
 * Features:
 * - Renders multiple TodoItemComponents
 * - Forwards events from child components to parent
 * - Displays message when list is empty
 *
 * Usage:
 * <todo-list
 *   [todos]="todoArray"
 *   (todoToggled)="handleToggle($event)"
 *   (todoDeleted)="handleDelete($event)"
 *   (todoUpdated)="handleUpdate($event)"
 * />
 */
@Component({
  selector: 'todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  /**
   * Input: Array of todos to display
   * Required property passed from parent component
   */
  todos = input.required<Todo[]>();

  /**
   * Output: Emitted when a todo's checkbox is toggled
   * Forwards the event from TodoItemComponent
   */
  todoToggled = output<number>();

  /**
   * Output: Emitted when a todo is deleted
   * Forwards the event from TodoItemComponent
   */
  todoDeleted = output<number>();

  /**
   * Output: Emitted when a todo is updated
   * Forwards the event from TodoItemComponent
   */
  todoUpdated = output<{ id: number; title: string }>();

  /**
   * Handle toggle event from child component
   * Simply forwards the event to parent
   *
   * @param id - The ID of the todo that was toggled
   */
  onToggle(id: number): void {
    this.todoToggled.emit(id);
  }

  /**
   * Handle delete event from child component
   * Simply forwards the event to parent
   *
   * @param id - The ID of the todo that was deleted
   */
  onDelete(id: number): void {
    this.todoDeleted.emit(id);
  }

  /**
   * Handle update event from child component
   * Simply forwards the event to parent
   *
   * @param data - Object containing todo ID and new title
   */
  onUpdate(data: { id: number; title: string }): void {
    this.todoUpdated.emit(data);
  }
}

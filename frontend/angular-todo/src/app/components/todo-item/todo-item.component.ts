import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';

/**
 * TodoItemComponent
 *
 * Displays a single todo item with interactive features.
 * Features:
 * - Checkbox to toggle completion status
 * - Double-click to edit
 * - Delete button
 * - Inline editing mode
 * - Visual indication of completed state
 *
 * Usage:
 * <todo-item
 *   [todo]="todoItem"
 *   (toggled)="handleToggle($event)"
 *   (deleted)="handleDelete($event)"
 *   (updated)="handleUpdate($event)"
 * />
 */
@Component({
  selector: 'todo-item',
  imports: [FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  /**
   * Input: The todo item to display
   * Required property passed from parent component
   */
  todo = input.required<Todo>();

  /**
   * Output: Emitted when checkbox is toggled
   * Passes the todo ID to parent
   */
  toggled = output<number>();

  /**
   * Output: Emitted when delete button is clicked
   * Passes the todo ID to parent
   */
  deleted = output<number>();

  /**
   * Output: Emitted when editing is complete
   * Passes an object with todo ID and new title
   */
  updated = output<{ id: number; title: string }>();

  /**
   * Local state: Whether this todo is in edit mode
   */
  protected isEditing = false;

  /**
   * Local state: The current value in the edit field
   */
  protected editText = '';

  /**
   * Handle checkbox toggle
   * Emits the toggled event with todo ID
   */
  onToggle(): void {
    this.toggled.emit(this.todo().id);
  }

  /**
   * Handle delete button click
   * Emits the deleted event with todo ID
   */
  onDelete(): void {
    this.deleted.emit(this.todo().id);
  }

  /**
   * Enter edit mode
   *
   * Called when user double-clicks the todo label.
   * Sets up the edit field with current title and focuses it.
   */
  startEditing(): void {
    this.isEditing = true;
    this.editText = this.todo().title;

    // Focus the input after the view updates
    setTimeout(() => {
      const input = document.querySelector('.todo-item__edit') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select(); // Select all text for easy replacement
      }
    }, 0);
  }

  /**
   * Exit edit mode and save changes
   *
   * Called when user presses Enter or clicks outside the edit field.
   * Emits the updated event if text has changed.
   */
  finishEditing(): void {
    if (!this.isEditing) {
      return;
    }

    this.isEditing = false;
    const trimmedText = this.editText.trim();

    // Only emit update if text has changed
    if (trimmedText && trimmedText !== this.todo().title) {
      this.updated.emit({
        id: this.todo().id,
        title: trimmedText
      });
    }
  }

  /**
   * Cancel editing
   *
   * Called when user presses Escape key.
   * Reverts to view mode without saving changes.
   */
  cancelEditing(): void {
    this.isEditing = false;
    this.editText = '';
  }

  /**
   * Handle keyboard events in edit mode
   *
   * - Enter: Save changes
   * - Escape: Cancel editing
   *
   * @param event - The keyboard event
   */
  onEditKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.finishEditing();
    } else if (event.key === 'Escape') {
      this.cancelEditing();
    }
  }
}

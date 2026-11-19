import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * TodoInputComponent
 *
 * Reusable component for adding new todos.
 * Features:
 * - Input field for entering todo text
 * - Emits event when user submits a new todo
 * - Clears input after submission
 * - Handles Enter key press for quick submission
 *
 * Usage:
 * <todo-input (todoAdded)="handleNewTodo($event)" />
 */
@Component({
  selector: 'todo-input',
  imports: [FormsModule], // Import FormsModule for ngModel directive
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {
  /**
   * The current value of the input field
   * Bound to the input element using ngModel (two-way binding)
   */
  protected todoTitle = '';

  /**
   * Output event emitter
   * Emits the new todo title when user submits
   * Parent component listens to this event to handle the new todo
   */
  todoAdded = output<string>();

  /**
   * Handle form submission
   *
   * Called when user presses Enter or clicks submit.
   * Validates input, emits event, and clears the field.
   */
  onSubmit(): void {
    // Trim whitespace from input
    const trimmedTitle = this.todoTitle.trim();

    // Only emit if there's actual content
    if (trimmedTitle) {
      this.todoAdded.emit(trimmedTitle);
      // Clear the input field after successful submission
      this.todoTitle = '';
    }
  }
}

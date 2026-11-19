/**
 * Todo Model
 *
 * Represents a single todo item in the application.
 * This interface defines the structure of a todo object with its properties.
 */
export interface Todo {
  /**
   * Unique identifier for the todo item
   * Generated using timestamp to ensure uniqueness
   */
  id: number;

  /**
   * The text content/description of the todo item
   */
  title: string;

  /**
   * Indicates whether the todo item has been completed
   * true = completed, false = active/pending
   */
  completed: boolean;

  /**
   * Timestamp when the todo was created
   * Used for sorting and display purposes
   */
  createdAt: Date;
}

/**
 * Filter Type
 *
 * Defines the possible filter states for displaying todos
 * - 'all': Show all todos (completed and active)
 * - 'active': Show only incomplete/pending todos
 * - 'completed': Show only completed todos
 */
export type TodoFilter = 'all' | 'active' | 'completed';

# Angular Todo List Application

A modern, feature-rich todo list application built with Angular 21, demonstrating best practices in component architecture, state management, and CSS design systems.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)
- [Testing](#testing)

## Features

### Core Functionality

- **Add Todos**: Create new todo items with a simple input interface
- **Edit Todos**: Double-click any todo to edit its text inline
- **Toggle Completion**: Mark todos as complete or incomplete with a checkbox
- **Delete Todos**: Remove individual todos with a delete button
- **Filter Todos**: View all, active, or completed todos
- **Clear Completed**: Bulk delete all completed todos at once
- **Persistent Storage**: Todos are automatically saved to localStorage

### Technical Features

- **Reactive State Management**: Built with Angular Signals for optimal performance
- **Standalone Components**: Modern Angular architecture without NgModules
- **TypeScript**: Full type safety throughout the application
- **BEM Methodology**: Organized and maintainable CSS with Block Element Modifier naming
- **Design Tokens**: Consistent styling using CSS custom properties
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Computed Values**: Efficient derived state using computed signals
- **Component Communication**: Type-safe event handling between components

## Project Structure

```text
angular-todo/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── todo-input/      # Todo creation component
│   │   │   ├── todo-item/       # Individual todo display component
│   │   │   ├── todo-list/       # Todo list container component
│   │   │   ├── todo-filters/    # Filter navigation component
│   │   │   ├── todo-footer/     # Statistics and actions footer
│   │   ├── models/              # Data models and interfaces
│   │   │   └── todo.model.ts    # Todo interface and types
│   │   ├── services/            # Business logic and state management
│   │   │   └── todo.service.ts  # Todo CRUD operations and state
│   │   ├── app.ts               # Root application component
│   │   ├── app.html             # Root component template
│   │   ├── app.css              # Root component styles
│   │   └── app.config.ts        # Application configuration
│   ├── styles.css               # Global styles and design tokens
│   ├── main.ts                  # Application bootstrap
│   └── index.html               # HTML entry point
├── public/                      # Static assets
├── angular.json                 # Angular CLI configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Architecture

### Component Hierarchy

```
App (Root Component)
├── TodoInputComponent        # Creates new todos
├── TodoListComponent        # Displays filtered todos
│   └── TodoItemComponent    # Individual todo with edit/delete
└── TodoFooterComponent      # Statistics and filters
    └── TodoFiltersComponent # Filter navigation buttons
```

### Design Patterns

#### Container/Presentational Pattern

- **Container Components** (App): Manage state and business logic
- **Presentational Components** (TodoInput, TodoItem, etc.): Display data and emit events

#### Service Layer

The `TodoService` provides centralized state management:
- Reactive state using Angular Signals
- Computed derived values for efficiency
- LocalStorage persistence
- Clean separation of concerns

## Design System

### BEM Methodology

Components use Block Element Modifier naming:

```css
.todo-item                    /* Block */
.todo-item__label             /* Element */
.todo-item__button            /* Element */
.todo-item--completed         /* Modifier */
```

### Design Tokens

CSS Custom Properties organize styling:

```css
/* Colors (RGB for alpha channel support) */
--color-primary-rgb: 74, 144, 226;
--color-primary: rgb(var(--color-primary-rgb));

/* Spacing (8px grid system) */
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */

/* Typography */
--font-size-md: 1rem;
--font-weight-medium: 500;

/* Transitions */
--transition-normal: 250ms ease-in-out;
```

### Color Palette

- **Primary (Blue)**: rgb(74, 144, 226) - Main actions and focus states
- **Success (Green)**: rgb(76, 175, 80) - Completion indicators
- **Danger (Red)**: rgb(244, 67, 54) - Delete actions
- **Neutral Grays**: For text, backgrounds, and borders

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v10 or higher)

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

## Development

### Code Scaffolding

Generate new components using Angular CLI:

```bash
# Generate a new component
ng generate component component-name

# Generate a service
ng generate service service-name

# Other schematics
ng generate --help
```

### Component Communication

Components communicate through:

1. **Inputs**: Pass data down to child components
```typescript
@Component({...})
export class ChildComponent {
  data = input.required<DataType>();
}
```

2. **Outputs**: Emit events up to parent components
```typescript
@Component({...})
export class ChildComponent {
  dataChanged = output<DataType>();
  
  handleClick() {
    this.dataChanged.emit(newData);
  }
}
```

### State Management with Signals

Signals provide reactive state management:

```typescript
// Writable signal
private todosSignal = signal<Todo[]>([]);

// Readonly signal
public readonly todos = this.todosSignal.asReadonly();

// Computed signal
public readonly activeTodoCount = computed(() => {
  return this.todosSignal().filter(todo => !todo.completed).length;
});
```

## Building

Build the project for production:

```bash
# Production build
npm run build
# or
ng build
```

Build artifacts are stored in the `dist/` directory with optimizations:
- Ahead-of-Time (AOT) compilation
- Tree-shaking for smaller bundle sizes
- Minification and optimization

## Testing

### Unit Tests

Execute unit tests using Vitest:

```bash
npm test
# or
ng test
```

### Test Coverage

Generate test coverage reports:

```bash
ng test --coverage
```

Coverage reports are available in the `coverage/` directory.

## Key Concepts for Learning Angular

### Standalone Components

This application uses Angular's standalone component API:
- No `NgModule` required
- Components declare their own dependencies via `imports`
- Simpler and more modern approach

### Signals

Angular Signals provide reactive programming:
- **signal()**: Create reactive state
- **computed()**: Derive values automatically
- **effect()**: Run side effects when signals change

### Dependency Injection

Services are injected using the `inject()` function:
```typescript
private todoService = inject(TodoService);
```

### Template Syntax

Modern Angular template features:
- `@if`: Conditional rendering
- `@for`: List rendering with tracking
- `[property]`: Property binding
- `(event)`: Event binding
- `[(ngModel)]`: Two-way binding

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [BEM Methodology](http://getbem.com/)

## License

This project is for educational purposes.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

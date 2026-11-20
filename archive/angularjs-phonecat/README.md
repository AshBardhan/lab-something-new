# AngularJS Phone Catalog Tutorial Application

## Overview

A tutorial web application built with **AngularJS 1.8.x** that demonstrates the fundamentals of building single-page applications using the AngularJS framework. The application is a phone catalog where users can:

- Browse a list of phones with images and descriptions
- Search and filter phones by name or features
- Sort phones alphabetically or by age
- View detailed specifications for each phone
- Navigate between different views using client-side routing

This is a static application (no backend server) that uses JSON files to simulate API responses, making it perfect for learning front-end development patterns.

**Original Tutorial**: [AngularJS Official Tutorial](https://docs.angularjs.org/tutorial)

---

## Tech Stack

### Core Framework

- **AngularJS 1.8.x** - MVC JavaScript framework
- **Angular Animate 1.8.x** - Animation support
- **Angular Resource 1.8.x** - RESTful resource interactions
- **Angular Route 1.8.x** - Client-side routing

### UI & Styling

- **Bootstrap 3.3.x** - Responsive CSS framework
- **jQuery 3.3.x** - DOM manipulation library

### Development Tools

- **Node.js** - Runtime environment
- **http-server** - Lightweight development server

### Testing

- **Karma 3.1.4** - Test runner for unit tests
- **Jasmine 3.5.0** - BDD testing framework
- **Cypress 15.10.0** - Modern E2E testing framework
- **karma-coverage 2.2.1** - Code coverage reporting

---

## Code Architecture

The application follows **AngularJS 1.5+ component-based architecture** with feature modules.

### Directory Structure

```text
angularjs-phonecat/
├── app/                              # Application source code
│   ├── core/                         # Core module (shared functionality)
│   │   ├── checkmark/                # Custom filter for boolean checkmarks
│   │   │   ├── checkmark.filter.js
│   │   │   └── checkmark.filter.spec.js
│   │   ├── phone/                    # Phone service (data fetching)
│   │   │   ├── phone.service.js
│   │   │   └── phone.service.spec.js
│   │   └── core.module.js            # Core module definition
│   │
│   ├── phone-list/                   # Phone list component
│   │   ├── phone-list.component.js   # Component logic
│   │   ├── phone-list.component.spec.js
│   │   ├── phone-list.module.js
│   │   └── phone-list.template.html  # Component template
│   │
│   ├── phone-detail/                 # Phone detail component
│   │   ├── phone-detail.component.js
│   │   ├── phone-detail.component.spec.js
│   │   ├── phone-detail.module.js
│   │   └── phone-detail.template.html
│   │
│   ├── phones/                       # Static JSON data (mock API)
│   │   └── *.json                    # Phone data files
│   │
│   ├── img/                          # Phone images
│   ├── lib/                          # Third-party libraries (auto-generated)
│   ├── app.module.js                 # Main application module
│   ├── app.config.js                 # Routing configuration
│   ├── app.animations.js             # Animation hooks
│   ├── app.css                       # Application styles
│   └── index.html                    # Main HTML template
│
├── cypress/                          # Cypress E2E tests
│   ├── e2e/
│   │   └── phonecat.cy.js            # E2E test specs
│   └── support/
│       └── e2e.js                    # Cypress support file
│
├── coverage/                         # Code coverage reports (generated)
├── node_modules/                     # Dependencies (auto-generated)
├── cypress.config.js                 # Cypress configuration
├── karma.conf.js                     # Karma test configuration
└── package.json                      # Project metadata and scripts
```

### Key Files

| File | Purpose |
|------|---------|

| `app/app.module.js` | Main application module that imports all feature modules |
| `app/app.config.js` | Routing configuration defining URL patterns |
| `app/core/phone/phone.service.js` | Service using `$resource` to fetch phone data from JSON files |
| `app/phone-list/phone-list.component.js` | Component with search, filter, and sort functionality |
| `app/phone-detail/phone-detail.component.js` | Component displaying detailed phone specifications |
| `karma.conf.js` | Configuration for unit tests (browsers, reporters, coverage) |
| `cypress.config.js` | Configuration for E2E tests (base URL, viewport, etc.) |

---

## Setup and Installation

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)

### Installation Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

   This will:
   - Install all Node.js dependencies
   - Copy AngularJS libraries to `app/lib/`

2. **Start the development server**

   ```bash
   npm start
   ```

   - Opens at: `http://localhost:8000`
   - Auto-reloads on file changes (cache disabled with `-c-1`)

3. **Open in browser**

   ```bash
   http://localhost:8000/index.html
   ```

### Available Commands

| Command | Description |
|---------|-------------|

| `npm start` | Start development server on port 8000 |
| `npm test` | Run unit tests with Karma (watch mode) |
| `npm run test-single-run` | Run unit tests once (CI mode) |
| `npm run test-coverage` | Serve coverage report on port 8080 |
| `npm run e2e` | Run Cypress E2E tests (headless) |
| `npm run e2e:open` | Open Cypress Test Runner (interactive) |
| `npm run cypress` | Open Cypress UI manually |
| `npm run cypress:run` | Run Cypress tests headlessly |

---

## Testing Strategies

### Unit Testing with Karma + Jasmine

**Purpose**: Test individual components, services, and filters in isolation.

**Configuration**: `karma.conf.js`

**Running Tests**:

```bash
# Watch mode (auto-reruns on file changes)
npm test

# Single run (for CI/CD)
npm run test-single-run
```

**Test Structure**:

- Tests are co-located with source files: `*.spec.js`
- Uses Jasmine BDD syntax: `describe()`, `it()`, `expect()`
- Includes AngularJS testing utilities via `angular-mocks`

**Example Test Files**:

- `app/core/phone/phone.service.spec.js` - Tests `Phone` service
- `app/phone-list/phone-list.component.spec.js` - Tests list component
- `app/phone-detail/phone-detail.component.spec.js` - Tests detail component

**Code Coverage**:

```bash
# Run tests (coverage auto-generated)
npm test

# View coverage report in browser
npm run test-coverage
# Opens at: http://localhost:8080
```

Coverage report shows:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage
- Per-file breakdown with highlighted uncovered lines

### E2E Testing with Cypress

**Purpose**: Test complete user workflows and interactions in a real browser.

**Configuration**: `cypress.config.js`

**Running Tests**:

```bash
# Headless mode (CI/CD)
npm run e2e

# Interactive mode (development)
npm run e2e:open
```

**Test Structure**:

- Tests located in: `cypress/e2e/phonecat.cy.js`
- Uses Cypress API: `cy.visit()`, `cy.get()`, `cy.click()`
- Automatically starts app server before tests

**Test Scenarios**:

1. **Redirect test** - Verify index.html redirects to phone list
2. **Search filter** - Type in search box and verify filtered results
3. **Sort functionality** - Change dropdown and verify phone order
4. **Navigation** - Click phone link and verify detail page loads
5. **Phone details** - Verify phone name, images, and specifications
6. **Image gallery** - Click thumbnails and verify main image changes

---

## Development Workflow

1. **Start development server**: `npm start`
2. **Make code changes** in `app/`
3. **Write unit tests** in corresponding `.spec.js` files
4. **Run unit tests**: `npm test` (runs in watch mode)
5. **Write E2E tests** in `cypress/e2e/`
6. **Run E2E tests**: `npm run e2e:open` (interactive) or `npm run e2e` (headless)
7. **Check coverage**: `npm run test-coverage`

---

## Browser Support

- **Chrome/Chromium** (recommended for development)
- **Firefox**
- Other modern browsers with ES5 support

---

## License

MIT

---

## Resources

- [AngularJS Documentation](https://docs.angularjs.org/)
- [AngularJS Tutorial](https://docs.angularjs.org/tutorial)
- [Karma Documentation](https://karma-runner.github.io/)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Cypress Documentation](https://docs.cypress.io/)

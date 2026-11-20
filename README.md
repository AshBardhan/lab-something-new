# Code Lab

Hands-on experiments with frontend frameworks, state management, and backend APIs. Each folder is a small, self-contained app built while studying.

## Directory

### Frontend - Frameworks & Ecosystems

| Project | Description |
| ------- | ----------- |
| [Angular Todo](frontend/angular-todo/) | Component architecture, state management, and a CSS design system |
| [Puck Visual Editor](frontend/my-puck-react-app/) | Next.js with the Puck visual page editor |
| [Next.js Dashboard](frontend/nextjs-dashboard/) | Next.js App Router dashboard with Tailwind and auth |
| [React App](frontend/react-app/) | Employees, customers, and dictionary search with a REST API |
| [React GraphQL](frontend/react-graphql/) | Customers with orders over GraphQL using Apollo Client |
| [React HTML](frontend/react-html/) | Single-file React example with no build step |
| [Next.js Basic](frontend/react-with-next-basic/) | Basic Next.js App Router example |
| [React with TypeScript](frontend/react-with-typescript/) | React app written in TypeScript |
| [React Zustand](frontend/react-zustand/) | Modular React app with Vite and Zustand |
| [Redux Fundamentals](frontend/redux-fundamentals-example-app/) | Example app from the Redux fundamentals tutorial |

### Backend - Servers & APIs

| Project | Description |
| ------- | ----------- |
| [Django Server](backend/django-server/) | REST and GraphQL customer/order API with JWT auth |
| [Node.js Swagger API](backend/nodejs-swagger-api/) | Express API with in-memory items and Swagger UI |

## Project Combinations

These folders are meant to run together. Everything else is independent.

| Combination | Description |
| ----------- | ----------- |
| `backend/django-server/` and `frontend/react-app/` | REST CRUD for customers (`:8000`) consumed by the React UI |
| `backend/django-server/` and `frontend/react-graphql/` | GraphQL customers and orders (`:8000/graphql/`) consumed by the React UI |

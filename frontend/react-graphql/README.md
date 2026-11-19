# Complete React Project with CRA (Deprecated) and GraphQL (Apollo Client)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) after studying a complete [React Course](https://www.codebreakthrough.com/products/free-react-course).

## Features

**Current**
- Local client page
  - Render a list of customers with their respective orders fetched from a local GraphQL server
  - Add a new customer
  - Add a new order of a particular customer
- Remote client page
  - Render a list of locations from a remote GraphQL server

**Future**
- Complete CRUD operations for both customers and orders
- Handle loading and error states while fetching data from backend API
- Integrate MSW for mocking backend APIs
- Implement unit and end-to-end testing
- Make app responsive with Headless UI and TailwindCSS

## Tech Stack
- ReactJS v18 and related libraries
- GraphQL Apollo Client
- CRA CLI (Deprecated)
- Backend API (Django GraphQL Framework managed on different repository)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

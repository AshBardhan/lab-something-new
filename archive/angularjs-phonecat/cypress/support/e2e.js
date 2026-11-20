// ***********************************************************
// This support file is processed and loaded automatically before your test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Disable Cypress's default behavior of failing tests on uncaught exceptions
// This is useful for older AngularJS apps that may have minor console errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // only ignore certain errors if needed
  if (err.message.includes('AngularJS')) {
    return false
  }
  return true
})

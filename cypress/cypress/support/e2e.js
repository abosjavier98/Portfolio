// Import commands.js using ES2015 syntax:
import "./commands";
// import "cypress-real-events";
// import "cypress-file-upload";
// import "cypress-axe";
// import "@percy/cypress";

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

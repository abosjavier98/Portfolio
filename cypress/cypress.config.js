const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    browser: "chrome",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 15000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    chromeWebSecurity: false,
    // Demo mode settings
    slowTestThreshold: 30000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // Custom task for database seeding
      on("task", {
        seedDatabase() {
          // Database seeding logic would go here
          return null;
        },
        clearDatabase() {
          // Database cleanup logic
          return null;
        },
      });
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    excludeSpecPattern: ["cypress/e2e/examples/*", "cypress/e2e/**/*.skip.*"],
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.js",
  },
  env: {
    percy_token: process.env.PERCY_TOKEN,
    environment: process.env.CYPRESS_ENV || "production",
    apiUrl: "https://automationexercise.com/api",
    coverage: false,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});

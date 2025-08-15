// Custom commands for Automation Exercise testing
// These commands help avoid duplicating common actions across tests

// Simple navigation helper - saves repeating visit + click
Cypress.Commands.add("navigateTo", (page) => {
  cy.visit("/");
  cy.contains(page).click();
});

// Login attempt helper (mainly for testing error scenarios)
Cypress.Commands.add("attemptLogin", (email, password) => {
  cy.visit("/login");
  cy.get('.login-form input[type="email"]').type(email);
  cy.get('.login-form input[type="password"]').type(password);
  cy.get('.login-form button[type="submit"]').click();
});

// Product search helper
Cypress.Commands.add("searchProducts", (searchTerm) => {
  cy.visit("/products");
  cy.get("#search_product").type(searchTerm);
  cy.get("#submit_search").click();
});

// API testing helper - keeps the API tests clean
Cypress.Commands.add("testAPI", (endpoint) => {
  cy.request("GET", endpoint).then((response) => {
    expect(response.status).to.eq(200);
    const body =
      typeof response.body === "string"
        ? JSON.parse(response.body)
        : response.body;
    expect(body).to.have.property("responseCode", 200);
    return cy.wrap(body);
  });
});

// E-commerce flow commands
Cypress.Commands.add("addProductToCart", (productIndex = 0, quantity = 1) => {
  cy.visit("/products");
  cy.get(".choose a").eq(productIndex).click();
  if (quantity > 1) {
    cy.get("input#quantity").clear().type(quantity.toString());
  }
  cy.get(".cart").click();
  cy.get(".modal-content").should("be.visible");
});

Cypress.Commands.add("viewCartAndVerify", () => {
  cy.contains("View Cart").click();
  cy.url().should("include", "/view_cart");
  cy.get("#cart_info").should("be.visible");
  cy.get(".cart_description").should("have.length.greaterThan", 0);
});

Cypress.Commands.add("proceedToCheckout", () => {
  cy.contains("Proceed To Checkout").click();
  cy.get(".modal-content").should("be.visible");
});

// Mobile-specific commands
Cypress.Commands.add("setMobileViewport", () => {
  // iPhone 14 Pro dimensions
  cy.viewport(430, 932);
});

Cypress.Commands.add("setTabletViewport", () => {
  // iPad dimensions
  cy.viewport(768, 1024);
});

Cypress.Commands.add("resetViewport", () => {
  // Back to desktop
  cy.viewport("macbook-16");
});

Cypress.Commands.add("verifyMobileLayout", () => {
  // Check that content doesn't overflow on mobile
  cy.get("body").invoke("outerWidth").should("be.lte", 430);
  cy.get("html").should("not.have.attr", "style", /overflow-x:\s*scroll/);
});

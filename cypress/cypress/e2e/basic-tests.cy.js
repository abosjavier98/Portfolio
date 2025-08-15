describe("Automation Exercise - Basic Tests", () => {
  it("should load the homepage successfully", () => {
    cy.visit("/");
    cy.get("body").should("be.visible");
    cy.title().should("contain", "Automation Exercise");
    cy.url().should("eq", "https://automationexercise.com/");
  });

  it("should navigate to login page", () => {
    cy.visit("/");
    cy.contains("Signup").click();
    cy.url().should("include", "/login");
    cy.get("h2").should("contain", "Login");
  });

  it("should navigate to products page", () => {
    cy.visit("/");
    cy.contains("Products").click();
    cy.url().should("include", "/products");
    cy.get("h2").should("contain", "All Products");
  });

  it("should have basic page structure", () => {
    cy.visit("/");
    cy.get("body").should("be.visible");
    cy.get("header").should("exist");
    cy.get("footer").should("exist");
    cy.get(".features_items").should("exist");
  });
});

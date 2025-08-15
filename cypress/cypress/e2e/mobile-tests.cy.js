// Mobile-specific test suite
// Testing responsive behavior and mobile user experience

describe("Mobile E-commerce Tests", () => {
  beforeEach(() => {
    // iPhone 14 Pro viewport dimensions
    cy.viewport(430, 932);
  });

  afterEach(() => {
    // Clean up - reset to default desktop viewport
    cy.viewport("macbook-16");
  });

  describe("Mobile Navigation & Layout", () => {
    it("should display homepage correctly on mobile", () => {
      cy.visit("/");

      // Basic mobile layout verification
      cy.title().should("contain", "Automation Exercise");
      cy.get("body").should("be.visible");

      // Check mobile navigation accessibility
      // Mobile sites often have hamburger menus or condensed nav
      cy.contains("Products").should("be.visible");
      cy.contains("Home").should("be.visible");

      // Verify no horizontal scroll needed
      cy.get("body").invoke("outerWidth").should("be.lte", 430);
    });

    it("should handle mobile menu interactions", () => {
      cy.visit("/");

      // Test main navigation works on mobile
      cy.contains("Products").click();
      cy.url().should("include", "/products");

      // Go back and test another nav item
      cy.visit("/");
      cy.contains("Login").click();
      cy.url().should("include", "/login");
    });
  });

  describe("Mobile Forms & Input", () => {
    it("should render login forms properly on mobile", () => {
      cy.visit("/login");

      // Verify forms are usable on mobile screen
      cy.get('.login-form input[type="email"]')
        .should("be.visible")
        .and("have.attr", "placeholder");

      cy.get('.login-form input[type="password"]')
        .should("be.visible")
        .and("have.attr", "placeholder");

      // Test that forms are properly sized for mobile
      cy.get(".login-form").should("be.visible");
      cy.get(".signup-form").should("be.visible");

      // Try typing in mobile form (virtual keyboard simulation)
      cy.get('.login-form input[type="email"]').type("test@mobile.com");
      cy.get('.login-form input[type="password"]').type("password123");
    });

    it("should handle mobile signup form", () => {
      cy.visit("/login");

      // Test mobile signup form
      cy.get('.signup-form input[name="name"]').should("be.visible");
      cy.get('.signup-form input[type="email"]').should("be.visible");

      // Fill out signup form on mobile
      cy.get('.signup-form input[name="name"]').type("Mobile User");
      cy.get('.signup-form input[type="email"]').type("mobile@test.com");

      // Submit should be accessible
      cy.get('.signup-form button[type="submit"]').should("be.visible");
    });
  });

  describe("Mobile Shopping Experience", () => {
    it("should display products grid responsively", () => {
      cy.visit("/products");

      // Verify products page loads on mobile
      cy.get("h2").should("contain", "All Products");

      // Check product cards are mobile-friendly
      cy.get(".productinfo").should("have.length.greaterThan", 5);
      cy.get(".productinfo").first().should("be.visible");

      // Verify images load properly on mobile
      cy.get(".productinfo img").first().should("be.visible");

      // Test product interaction on mobile
      cy.get(".choose a").first().should("be.visible");
    });

    it("should handle mobile product details and cart", () => {
      cy.visit("/products");

      // Navigate to product details on mobile
      cy.get(".choose a").first().click();
      cy.url().should("include", "/product_details");

      // Verify product details are mobile-friendly
      cy.get(".product-information").should("be.visible");
      cy.get("input#quantity").should("be.visible");

      // Test add to cart on mobile
      cy.get("input#quantity").clear().type("2");
      cy.get(".cart").click();

      // Verify mobile cart modal
      cy.get(".modal-content").should("be.visible");
      cy.contains("Added!").should("be.visible");
    });

    it("should navigate mobile cart and checkout flow", () => {
      cy.visit("/products");

      // Add item and go to cart on mobile
      cy.get(".choose a").first().click();
      cy.get(".cart").click();
      cy.contains("View Cart").click();

      // Verify mobile cart layout
      cy.url().should("include", "/view_cart");
      cy.get("#cart_info").should("be.visible");

      // Check cart table is responsive
      cy.get(".cart_description").should("be.visible");
      cy.get(".cart_quantity").should("be.visible");

      // Test checkout button accessibility on mobile
      cy.contains("Proceed To Checkout").should("be.visible");
    });
  });

  describe("Mobile Touch Interactions", () => {
    it("should handle mobile search functionality", () => {
      cy.visit("/products");

      // Test search on mobile
      cy.get("#search_product").should("be.visible");
      cy.get("#submit_search").should("be.visible");

      // Perform search on mobile
      cy.get("#search_product").type("shirt");
      cy.get("#submit_search").click();

      // Verify search results display properly on mobile
      cy.get(".productinfo").should("be.visible");
    });

    it("should support mobile scrolling and interaction", () => {
      cy.visit("/");

      // Test vertical scrolling on mobile
      cy.scrollTo("bottom");
      cy.get("footer").should("be.visible");

      // Scroll back to top
      cy.scrollTo("top");
      cy.get("header").should("be.visible");

      // Test that elements remain interactive after scroll
      cy.contains("Products").should("be.visible").click();
      cy.url().should("include", "/products");
    });
  });
});

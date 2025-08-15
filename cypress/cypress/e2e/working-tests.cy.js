describe("Automation Exercise - Working Tests", () => {
  describe("Basic Navigation", () => {
    it("should load homepage and navigate to login", () => {
      cy.visit("/");
      cy.title().should("contain", "Automation Exercise");
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
  });

  describe("Login Page Tests", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("should display login and signup forms", () => {
      cy.get("h2").should("contain", "Login");
      cy.get("h2").should("contain", "New User Signup!");
      cy.get('.login-form input[type="email"]').should("be.visible");
      cy.get('.login-form input[type="password"]').should("be.visible");
    });

    it("should handle login attempt with invalid credentials", () => {
      cy.get('.login-form input[type="email"]').type("invalid@email.com");
      cy.get('.login-form input[type="password"]').type("wrongpassword");
      cy.get('.login-form button[type="submit"]').click();
      cy.get("p").should("contain", "incorrect");
    });
  });

  describe("Products Page Tests", () => {
    beforeEach(() => {
      cy.visit("/products");
    });

    it("should display products list", () => {
      cy.get("h2").should("contain", "All Products");
      cy.get(".features_items").should("be.visible");
      cy.get(".productinfo").should("have.length.greaterThan", 0);
    });

    it("should have search functionality", () => {
      cy.get("#search_product").type("blue");
      cy.get("#submit_search").click();
      cy.get("h2").should("contain", "Searched Products");
      cy.get(".productinfo").should("be.visible");
    });
  });

  describe("API Tests", () => {
    it("should fetch products list via API", () => {
      cy.request("GET", "/api/productsList").then((response) => {
        expect(response.status).to.eq(200);
        const body =
          typeof response.body === "string"
            ? JSON.parse(response.body)
            : response.body;
        expect(body).to.have.property("responseCode", 200);
        expect(body).to.have.property("products");
        expect(body.products).to.be.an("array");
        expect(body.products.length).to.be.greaterThan(0);
      });
    });

    it("should fetch brands list via API", () => {
      cy.request("GET", "/api/brandsList").then((response) => {
        expect(response.status).to.eq(200);
        const body =
          typeof response.body === "string"
            ? JSON.parse(response.body)
            : response.body;
        expect(body).to.have.property("responseCode", 200);
        expect(body).to.have.property("brands");
        expect(body.brands).to.be.an("array");
      });
    });
  });

  describe("E-commerce Flow Tests", () => {
    it("should complete full shopping flow - browse, add to cart, checkout", () => {
      // Step 1: Browse products
      cy.visit("/");
      cy.contains("Products").click();
      cy.url().should("include", "/products");
      cy.get("h2").should("contain", "All Products");

      // Step 2: Select a product
      cy.get(".productinfo")
        .first()
        .within(() => {
          cy.get("p").should("be.visible"); // Product name
          cy.get("h2").should("be.visible"); // Price
        });

      // Step 3: View product details
      cy.get(".choose a").first().click();
      cy.url().should("include", "/product_details");
      cy.get(".product-information").should("be.visible");
      cy.get("h2").should("be.visible"); // Product name
      cy.get("span span").should("contain", "Rs."); // Price

      // Step 4: Add to cart
      cy.get("input#quantity").clear().type("2");
      cy.get(".cart").click();
      cy.get(".modal-content").should("be.visible");
      cy.contains("Added!").should("be.visible");

      // Step 5: View cart
      cy.contains("View Cart").click();
      cy.url().should("include", "/view_cart");
      cy.get("#cart_info").should("be.visible");
      cy.get(".cart_description").should("be.visible");
      cy.get(".cart_quantity button").should("contain", "2");

      // Step 6: Proceed to checkout (demonstrates checkout flow)
      cy.contains("Proceed To Checkout").click();

      // Step 7: Verify checkout requirements (login/register modal or redirect)
      cy.url().then((url) => {
        if (url.includes("/login")) {
          // Redirected to login page
          cy.get("h2").should("contain", "Login");
        } else {
          // Modal appeared
          cy.get(".modal-content").should("be.visible");
          cy.contains("Register").should("be.visible");
        }
      });
    });

    it("should handle cart operations - add, update, remove", () => {
      // Add multiple products to cart
      cy.visit("/products");

      // Add first product
      cy.get(".choose a").eq(0).click();
      cy.get(".cart").click();
      cy.contains("Continue Shopping").click();

      // Add second product
      cy.visit("/products");
      cy.get(".choose a").eq(1).click();
      cy.get("input#quantity").clear().type("3");
      cy.get(".cart").click();

      // View cart and verify items
      cy.contains("View Cart").click();
      cy.get(".cart_description").should("have.length", 2);

      // Verify quantity and total calculations
      cy.get("#cart_info_table").should("be.visible");
      cy.get(".cart_total_price").should("be.visible");

      // Remove an item
      cy.get(".cart_quantity_delete").first().click();
      cy.get(".cart_description").should("have.length", 1);
    });
  });

  describe("Mobile Responsive Tests", () => {
    beforeEach(() => {
      // Set mobile viewport (iPhone 14 Pro size)
      cy.viewport(430, 932);
    });

    afterEach(() => {
      // Reset to default viewport
      cy.viewport("macbook-16");
    });

    it("should display mobile navigation correctly", () => {
      cy.visit("/");

      // Check if mobile navigation is working
      cy.get("body").should("be.visible");
      cy.title().should("contain", "Automation Exercise");

      // Mobile menu might have different structure
      // Check that main navigation elements are accessible
      cy.contains("Products").should("be.visible");
      cy.contains("Cart").should("be.visible");
    });

    it("should handle mobile login form layout", () => {
      cy.visit("/login");

      // Verify forms are responsive and usable on mobile
      cy.get('.login-form input[type="email"]').should("be.visible");
      cy.get('.login-form input[type="password"]').should("be.visible");
      cy.get('.login-form button[type="submit"]').should("be.visible");

      // Check that forms don't overflow viewport
      cy.get(".login-form").should("be.visible");
      cy.get(".signup-form").should("be.visible");
    });

    it("should display products in mobile layout", () => {
      cy.visit("/products");

      // Verify products page works on mobile
      cy.get("h2").should("contain", "All Products");
      cy.get(".productinfo").should("have.length.greaterThan", 5);

      // Check that product cards are properly sized for mobile
      cy.get(".productinfo").first().should("be.visible");
      cy.get(".productinfo img").first().should("be.visible");
    });

    it("should handle mobile shopping flow", () => {
      cy.visit("/products");

      // Add product to cart on mobile
      cy.get(".choose a").first().click();
      cy.get(".cart").should("be.visible").click();

      // Verify mobile cart modal/page
      cy.get(".modal-content").should("be.visible");
      cy.contains("Added!").should("be.visible");

      // Go to cart view
      cy.contains("View Cart").click();
      cy.url().should("include", "/view_cart");

      // Verify cart table is responsive
      cy.get("#cart_info").should("be.visible");
      cy.get(".cart_description").should("be.visible");
    });
  });
});

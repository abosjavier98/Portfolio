describe("E-commerce Shopping Flow - LIVE DEMO", () => {
  it("🛒 Complete Shopping Journey - Step by Step Demo", () => {
    // 🏠 Step 1: Start at Homepage
    cy.visit("/");
    cy.wait(2000); // Pause to show homepage
    cy.title().should("contain", "Automation Exercise");

    // Log current step
    cy.log("🏠 STEP 1: Homepage loaded successfully");

    // 📦 Step 2: Navigate to Products
    cy.contains("Products").click();
    cy.wait(2000); // Pause to show products page
    cy.url().should("include", "/products");
    cy.get("h2").should("contain", "All Products");

    cy.log("📦 STEP 2: Products catalog displayed");

    // 👀 Step 3: Browse Products (show product list)
    cy.get(".productinfo").should("have.length.greaterThan", 5);
    cy.wait(3000); // Give time to see products

    // Highlight first product
    cy.get(".productinfo")
      .first()
      .within(() => {
        cy.get("p").should("be.visible"); // Product name
        cy.get("h2").should("be.visible"); // Price
      });

    cy.log("👀 STEP 3: Browsing available products");

    // 🔍 Step 4: Select Product for Details
    cy.get(".choose a").first().click();
    cy.wait(3000); // Show product details page
    cy.url().should("include", "/product_details");
    cy.get(".product-information").should("be.visible");

    // Show product information
    cy.get("h2").should("be.visible"); // Product name
    cy.get("span span").should("contain", "Rs."); // Price

    cy.log("🔍 STEP 4: Product details page displayed");

    // ⚙️ Step 5: Configure Quantity
    cy.get("input#quantity").clear();
    cy.wait(1000);
    cy.get("input#quantity").type("2");
    cy.wait(2000); // Show quantity selection

    cy.log("⚙️ STEP 5: Quantity set to 2 items");

    // 🛒 Step 6: Add to Cart
    cy.get(".cart").click();
    cy.wait(2000); // Show add to cart action

    // Verify success modal
    cy.get(".modal-content").should("be.visible");
    cy.contains("Added!").should("be.visible");
    cy.wait(3000); // Show success message

    cy.log("🛒 STEP 6: Product added to cart successfully");

    // 📋 Step 7: View Shopping Cart
    cy.contains("View Cart").click();
    cy.wait(3000); // Show cart page
    cy.url().should("include", "/view_cart");
    cy.get("#cart_info").should("be.visible");

    // Verify cart contents
    cy.get(".cart_description").should("be.visible");
    cy.get(".cart_quantity button").should("contain", "2");
    cy.wait(3000); // Show cart details

    cy.log("📋 STEP 7: Shopping cart displayed with items");

    // 💳 Step 8: Proceed to Checkout
    cy.contains("Proceed To Checkout").click();
    cy.wait(3000); // Show checkout initiation

    cy.log("💳 STEP 8: Proceeding to checkout");

    // 🔐 Step 9: Authentication Required
    cy.url().then((url) => {
      if (url.includes("/login")) {
        // Redirected to login page
        cy.get("h2").should("contain", "Login");
        cy.wait(2000);
        cy.log("🔐 STEP 9: Login page displayed");
      } else {
        // Modal appeared
        cy.get(".modal-content").should("be.visible");
        cy.contains("Register").should("be.visible");
        cy.wait(2000);
        cy.log("🔐 STEP 9: Registration modal displayed");
      }
    });

    cy.wait(3000); // Final pause to show completion
    cy.log("✅ DEMO COMPLETE: Full shopping flow demonstrated");
  });

  it("🛒 Shopping Cart Management - Add Multiple Items Demo", () => {
    cy.log("🚀 Starting cart management demonstration");

    // Add first product
    cy.visit("/products");
    cy.wait(2000);

    cy.log("📦 Adding first product to cart");
    cy.get(".choose a").eq(0).click();
    cy.wait(2000);
    cy.get(".cart").click();
    cy.wait(2000);
    cy.contains("Continue Shopping").click();
    cy.wait(2000);

    // Add second product with different quantity
    cy.visit("/products");
    cy.wait(2000);

    cy.log("📦 Adding second product with quantity 3");
    cy.get(".choose a").eq(1).click();
    cy.wait(2000);
    cy.get("input#quantity").clear();
    cy.wait(1000);
    cy.get("input#quantity").type("3");
    cy.wait(2000);
    cy.get(".cart").click();
    cy.wait(2000);

    // View cart with multiple items
    cy.contains("View Cart").click();
    cy.wait(3000);
    cy.get(".cart_description").should("have.length", 2);

    cy.log("📋 Cart now contains 2 different products");

    // Demonstrate remove functionality
    cy.get(".cart_quantity_delete").first().click();
    cy.wait(3000);
    cy.get(".cart_description").should("have.length", 1);

    cy.log("🗑️ One item removed from cart");
    cy.log("✅ Cart management demo complete");
  });
});

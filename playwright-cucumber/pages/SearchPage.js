class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = '[data-test="inventory-list"]';
    this.inventoryItems = '[data-test="inventory-item"]';
    this.firstProduct = '[data-test="inventory-item"]:first-child';
    this.productNames = '[data-test="inventory-item-name"]';
    this.addToCartButtons = '[data-test="add-to-cart"]';
    this.sortDropdown = '[data-test="product-sort-container"]';
  }

  async getProductsContaining(searchTerm) {
    const productNames = await this.page.locator(this.productNames);
    const allNames = await productNames.allTextContents();
    return allNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async isInventoryDisplayed() {
    return await this.page.isVisible(this.inventoryList);
  }

  async selectFirstProduct() {
    const firstProductName = this.page
      .locator(this.firstProduct)
      .locator(this.productNames);
    await firstProductName.click();
    await this.page.waitForLoadState("networkidle");
  }

  async selectProductByName(productName) {
    // Click on the product name to go to product detail page
    const product = this.page.locator('[data-test="inventory-item-name"]', {
      hasText: productName,
    });
    await product.click();
    await this.page.waitForLoadState("networkidle");
  }

  async addProductToCartByName(productName) {
    // Map product names to their data-test attributes
    const productToButtonMap = {
      "Sauce Labs Backpack": "add-to-cart-sauce-labs-backpack",
      "Sauce Labs Bike Light": "add-to-cart-sauce-labs-bike-light",
      "Sauce Labs Bolt T-Shirt": "add-to-cart-sauce-labs-bolt-t-shirt",
      "Sauce Labs Fleece Jacket": "add-to-cart-sauce-labs-fleece-jacket",
      "Sauce Labs Onesie": "add-to-cart-sauce-labs-onesie",
      "Test.allTheThings() T-Shirt (Red)":
        "add-to-cart-test.allthethings()-t-shirt-(red)",
    };

    const buttonSelector = productToButtonMap[productName];
    if (buttonSelector) {
      await this.page.locator(`[data-test="${buttonSelector}"]`).click();
    } else {
      throw new Error(`Product "${productName}" not found in mapping`);
    }
  }

  async addFirstProductToCart() {
    // Add the first product (Sauce Labs Backpack) to cart
    const firstAddToCartButton = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );
    await firstAddToCartButton.click();
  }

  async sortProducts(sortOption) {
    await this.page.selectOption(this.sortDropdown, sortOption);
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = InventoryPage;

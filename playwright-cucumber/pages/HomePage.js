class HomePage {
  constructor(page) {
    this.page = page;
    // SauceDemo doesn't have a search feature, but has product inventory
    this.inventoryContainer = '[data-test="inventory-container"]';
    this.inventoryList = '[data-test="inventory-list"]';
    this.productItems = '[data-test="inventory-item"]';
    this.menuButton = '[data-test="open-menu"]';
    this.cartIcon = '[data-test="shopping-cart-link"]';
    this.cartBadge = '[data-test="shopping-cart-badge"]';
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async getProductCount() {
    const products = await this.page.locator(this.productItems);
    return await products.count();
  }

  async getProductNames() {
    const productNames = await this.page.locator(
      '[data-test="inventory-item-name"]'
    );
    return await productNames.allTextContents();
  }

  async isInventoryDisplayed() {
    return await this.page.isVisible(this.inventoryContainer);
  }
}

module.exports = HomePage;

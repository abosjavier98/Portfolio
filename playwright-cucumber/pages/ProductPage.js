class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = '[data-test="add-to-cart"]';
    this.removeFromCartButton = '[data-test="remove"]';
    this.cartBadge = '[data-test="shopping-cart-badge"]';
    this.cartIcon = '[data-test="shopping-cart-link"]';
    this.productName = '[data-test="inventory-item-name"]';
    this.productPrice = '[data-test="inventory-item-price"]';
    this.backToProductsButton = '[data-test="back-to-products"]';
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
    // Wait for the button text to change to "Remove"
    await this.page.waitForSelector(this.removeFromCartButton);
  }

  async removeFromCart() {
    await this.page.click(this.removeFromCartButton);
    await this.page.waitForSelector(this.addToCartButton);
  }

  async getCartItemCount() {
    const cartBadge = this.page.locator(this.cartBadge);
    if (await cartBadge.isVisible()) {
      const countText = await cartBadge.textContent();
      return parseInt(countText);
    }
    return 0;
  }

  async getProductName() {
    return await this.page.textContent(this.productName);
  }

  async getProductPrice() {
    const priceText = await this.page.textContent(this.productPrice);
    return priceText.replace("$", "");
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = ProductPage;

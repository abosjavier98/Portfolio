class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = '[data-test="cart-list"]';
    this.cartItems = '[data-test="cart-item"]';
    this.cartItemNames = '[data-test="inventory-item-name"]';
    this.cartItemPrices = '[data-test="inventory-item-price"]';
    this.continueShoppingButton = '[data-test="continue-shopping"]';
    this.checkoutButton = '[data-test="checkout"]';
    this.removeButtons = '[data-test="remove"]';
    this.cartBadge = '[data-test="shopping-cart-badge"]';
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/cart.html");
  }

  async getCartItemCount() {
    const items = await this.page.locator(this.cartItems);
    return await items.count();
  }

  async getCartItemNames() {
    const names = await this.page.locator(this.cartItemNames);
    return await names.allTextContents();
  }

  async removeItemByName(itemName) {
    const itemRow = this.page
      .locator(this.cartItems)
      .filter({ hasText: itemName });
    const removeButton = itemRow.locator(this.removeButtons);
    await removeButton.click();
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
    await this.page.waitForLoadState("networkidle");
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
    await this.page.waitForLoadState("networkidle");
  }

  async isCartEmpty() {
    const cartBadge = this.page.locator(this.cartBadge);
    return !(await cartBadge.isVisible());
  }

  async getCartTotal() {
    // SauceDemo doesn't show total in cart, only in checkout
    const prices = await this.page.locator(this.cartItemPrices);
    const priceTexts = await prices.allTextContents();
    let total = 0;
    priceTexts.forEach((price) => {
      total += parseFloat(price.replace("$", ""));
    });
    return total.toFixed(2);
  }
}

module.exports = CartPage;

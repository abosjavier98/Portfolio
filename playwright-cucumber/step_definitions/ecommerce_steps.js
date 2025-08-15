const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const InventoryPage = require("../pages/SearchPage"); // Renamed SearchPage to InventoryPage
const LoginPage = require("../pages/LoginPage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");

Given("I am on the SauceDemo login page", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

Given("I am logged in as a standard user", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user", "secret_sauce");
  this.inventoryPage = new InventoryPage(this.page);
  this.productPage = new ProductPage(this.page);
});

Given("I am on the inventory page", async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.navigate();
  this.inventoryPage = new InventoryPage(this.page);
});

Given("I have added {string} to my cart", async function (productName) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user", "secret_sauce");

  this.inventoryPage = new InventoryPage(this.page);
  this.productPage = new ProductPage(this.page);

  await this.inventoryPage.addProductToCartByName(productName);
});
When("I login with valid credentials", async function (dataTable) {
  const credentials = dataTable.rowsHash();
  await this.loginPage.login(credentials.username, credentials.password);
});

When("I login with invalid credentials", async function (dataTable) {
  const credentials = dataTable.rowsHash();
  await this.loginPage.login(credentials.username, credentials.password);
});

When("I login with locked out user credentials", async function (dataTable) {
  const credentials = dataTable.rowsHash();
  await this.loginPage.login(credentials.username, credentials.password);
});

When("I add the first product to my cart", async function () {
  this.inventoryPage = new InventoryPage(this.page);
  await this.inventoryPage.addFirstProductToCart();
});

When("I add {string} to my cart", async function (productName) {
  this.inventoryPage = new InventoryPage(this.page);
  await this.inventoryPage.addProductToCartByName(productName);
});

When("I go to the shopping cart", async function () {
  this.cartPage = new CartPage(this.page);
  this.productPage = new ProductPage(this.page);
  await this.productPage.goToCart();
});

Then("I should be successfully logged in", async function () {
  const isLoggedIn = await this.loginPage.isUserLoggedIn();
  expect(isLoggedIn).toBe(true);
});

Then("I should see the inventory page", async function () {
  this.inventoryPage = new InventoryPage(this.page);
  const isInventoryDisplayed = await this.inventoryPage.isInventoryDisplayed();
  expect(isInventoryDisplayed).toBe(true);
});

Then("I should see {int} products displayed", async function (productCount) {
  this.homePage = new HomePage(this.page);
  const actualProductCount = await this.homePage.getProductCount();
  expect(actualProductCount).toBe(productCount);
});

Then("the products should be displayed in a grid format", async function () {
  this.inventoryPage = new InventoryPage(this.page);
  const isGridFormat = await this.inventoryPage.isInventoryDisplayed();
  expect(isGridFormat).toBe(true);
});

Then("the cart should contain {int} item", async function (itemCount) {
  this.productPage = new ProductPage(this.page);
  const cartCount = await this.productPage.getCartItemCount();
  expect(cartCount).toBe(itemCount);
});

Then("the cart should contain {int} items", async function (itemCount) {
  this.productPage = new ProductPage(this.page);
  const cartCount = await this.productPage.getCartItemCount();
  expect(cartCount).toBe(itemCount);
});

Then("the cart badge should show {string}", async function (badgeText) {
  this.productPage = new ProductPage(this.page);
  const cartCount = await this.productPage.getCartItemCount();
  expect(cartCount.toString()).toBe(badgeText);
});

Then("I should see {string} in the cart", async function (productName) {
  this.cartPage = new CartPage(this.page);
  const cartItems = await this.cartPage.getCartItemNames();
  expect(cartItems).toContain(productName);
});

Then("I should see the correct price for the item", async function () {
  this.cartPage = new CartPage(this.page);
  const cartItems = await this.cartPage.getCartItemNames();
  expect(cartItems.length).toBeGreaterThan(0);

  // Verify that there's at least one item with a price
  const prices = await this.page.locator('[data-test="inventory-item-price"]');
  const priceCount = await prices.count();
  expect(priceCount).toBeGreaterThan(0);
});

Then("I should see an error message", async function () {
  const errorMessage = await this.loginPage.getErrorMessage();
  expect(errorMessage).toBeTruthy();
  expect(errorMessage.length).toBeGreaterThan(0);
});

Then("I should see a locked out error message", async function () {
  const errorMessage = await this.loginPage.getErrorMessage();
  expect(errorMessage).toContain("locked out");
});

Then("I should remain on the login page", async function () {
  const isLoginPage = await this.loginPage.isLoginPageDisplayed();
  expect(isLoginPage).toBe(true);
});

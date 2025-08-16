class LoginPage {
  constructor(page) {
    this.page = page;
    // Using SauceDemo's data-test attributes - much more reliable than CSS selectors
    this.usernameInput = '[data-test="username"]';
    this.passwordInput = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.errorMessage = '[data-test="error"]';
    this.appLogo = ".app_logo";
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    // Wait for navigation with a more reasonable approach for CI
    try {
      await this.page.waitForURL("**/inventory.html", { timeout: 10000 });
    } catch (error) {
      // If it's an invalid login, we stay on the same page - that's expected
      if (!username.includes("invalid") && !username.includes("locked")) {
        throw error;
      }
    }
  }

  async isUserLoggedIn() {
    // Simple but effective - check URL contains inventory path
    return await this.page.url().includes("/inventory.html");
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async isLoginPageDisplayed() {
    // Check if we're on the login page by looking for login elements and URL
    const hasLoginForm = await this.page.isVisible(this.loginButton);
    const isLoginUrl =
      this.page.url().includes("saucedemo.com") &&
      !this.page.url().includes("/inventory.html");
    return hasLoginForm && isLoginUrl;
  }
}

module.exports = LoginPage;

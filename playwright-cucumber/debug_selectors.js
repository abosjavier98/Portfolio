const { chromium } = require("playwright");

async function investigateSauceDemo() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to SauceDemo
  await page.goto("https://www.saucedemo.com/");

  // Login
  await page.fill('[data-test="username"]', "standard_user");
  await page.fill('[data-test="password"]', "secret_sauce");
  await page.click('[data-test="login-button"]');

  // Wait for inventory page
  await page.waitForLoadState("networkidle");

  // Get all add to cart buttons
  const addToCartButtons = await page
    .locator("button")
    .filter({ hasText: "Add to cart" })
    .all();
  console.log("Number of Add to Cart buttons:", addToCartButtons.length);

  // Get data-test attributes of these buttons
  for (let i = 0; i < addToCartButtons.length; i++) {
    const dataTest = await addToCartButtons[i].getAttribute("data-test");
    console.log(`Button ${i}: data-test="${dataTest}"`);
  }

  // Wait a bit to see the page
  await page.waitForTimeout(5000);

  await browser.close();
}

investigateSauceDemo().catch(console.error);

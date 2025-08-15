const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");

// Had to increase this from 15s - some tests were timing out randomly
setDefaultTimeout(30 * 1000);

let browser;
let context;
let page;

BeforeAll(async function () {
  // Chrome is my go-to browser, but can switch via env var for cross-browser testing
  const browserType = process.env.BROWSER || "chromium";

  switch (browserType) {
    case "firefox":
      browser = await firefox.launch({
        headless: process.env.HEADLESS !== "false",
      });
      break;
    case "webkit":
      browser = await webkit.launch({
        headless: process.env.HEADLESS !== "false",
      });
      break;
    default:
      // Chrome/Chromium is my default - most stable and widely used
      browser = await chromium.launch({
        headless: process.env.HEADLESS !== "false",
      });
  }
});

Before(async function () {
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  });

  page = await context.newPage();
  this.page = page;
  this.context = context;
});

After(async function (scenario) {
  if (scenario.result.status === "FAILED") {
    const screenshot = await page.screenshot();
    this.attach(screenshot, "image/png");
  }

  await context.close();
});

AfterAll(async function () {
  await browser.close();
});

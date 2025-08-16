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
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);

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

# Playwright + Cucumber Test Suite

BDD implementation using Playwright with Cucumber.js for automated testing.

## Test Coverage

Target Application: SauceDemo (https://www.saucedemo.com/)

**Scenarios Covered:**

- Login validation (valid/invalid credentials, locked users)
- Product inventory browsing and validation
- Shopping cart functionality and price calculations
- Cart management operations

## Technical Setup

- **Playwright** for browser automation (Chrome/Firefox support)
- **Cucumber.js** for BDD scenarios in Gherkin
- **Page Object Model** to keep locators organized
- **Environment configuration** via env vars

## Running the Tests

```bash
# Install dependencies
npm install

# Install browsers (first time only)
npx playwright install chromium firefox

# Run all tests
npm test

# Run only smoke tests
npm run test:smoke

# Run regression suite
npm run test:regression

# Run in headed mode (see browser)
npm run test:headed

# Run with Firefox
npm run test:firefox
```

## Project Structure

```
├── features/
│   └── ecommerce.feature      # Gherkin scenarios
├── pages/
│   ├── LoginPage.js          # Login page actions
│   ├── SearchPage.js         # Product inventory handling
│   ├── ProductPage.js        # Product detail actions
│   └── CartPage.js           # Shopping cart operations
├── step_definitions/
│   └── ecommerce_steps.js    # Step implementations
└── support/
    └── hooks.js              # Test setup/teardown
```

## Personal Notes

### What I Learned

- **BDD scenarios** are definitely more readable, but they add a layer of abstraction
- **Page Objects** with Playwright are clean - the auto-wait features help a lot
- **Cross-browser testing** is pretty straightforward once set up
- **Test data management** gets tricky with multiple environments

### Pain Points

- **Gherkin step definitions** can get verbose for complex scenarios
- **Debugging** is a bit harder when errors happen in step definitions
- **IDE support** for Gherkin isn't as good as plain JavaScript

### Would I Use This Again?

For a team with lots of business stakeholders who want to read tests - maybe. For pure technical teams, I think plain JavaScript tests might be more efficient.

## Useful Commands

```bash
# Debug specific test
npm run test:debug

# Generate HTML report
npm test && open reports/cucumber-report.html

# Run with specific tags
npm test -- --tags @smoke
npm test -- --tags @regression
```

- **Maintainability** - changes in UI require updates in one place
- **Reusability** - page methods used across multiple tests
- **Readability** - clear separation of test logic and page interactions

## Project Structure

```
playwright-cucumber/
├── features/
│   └── ecommerce.feature          # BDD scenarios in Gherkin
├── pages/
│   ├── HomePage.js                # Main page/inventory
│   ├── LoginPage.js               # Login page
│   ├── SearchPage.js              # Inventory navigation
│   ├── ProductPage.js             # Product handling
│   └── CartPage.js                # Shopping cart
├── step_definitions/
│   └── ecommerce_steps.js         # Step implementations
├── support/
│   └── hooks.js                   # Configuration and hooks
├── reports/                       # Generated reports
├── cucumber.js                    # Cucumber configuration
└── package.json
```

## Key Metrics

- **Test Coverage**: 7 critical user scenarios automated
- **Execution Time**: ~12 seconds for full regression suite
- **Browsers Supported**: Chrome, Firefox, Safari (WebKit)
- **Flakiness Rate**: 0% (stable selectors + smart waits)
- **Maintenance Effort**: Minimal (Page Object pattern)

## What I Built

### Test Automation

- Test framework setup with Playwright and Cucumber
- Cross-browser testing (Chrome, Firefox, Safari)
- Test data management with real applications
- CI-ready test structure

### Software Development

- Clean code and documentation
- Page Object Model pattern
- Git version control
- JavaScript/Node.js development

### Quality Engineering

- Risk-based testing (@smoke tags for critical paths)
- Screenshot capture on failures
- Parallel test execution
- BDD scenarios for stakeholder communication

## Tested Functionality

### User Authentication

- Successful login with valid credentials
- Invalid credentials handling
- Locked out user (locked_out_user)

### Inventory Management

- Product display (6 products)
- Grid format navigation

### Shopping Cart

- Add individual products
- Add multiple products
- Cart counter verification
- Cart content visualization

## Test Website

**URL**: [https://www.saucedemo.com/](https://www.saucedemo.com/)

### Test Users

- **standard_user** / secret_sauce (normal user)
- **locked_out_user** / secret_sauce (locked user)

## Installation and Usage

### Prerequisites

- Node.js 16+
- npm

### Installation

```bash
npm install
npm run install:browsers
```

### Test Execution

```bash
# All tests
npm test

# Smoke tests only (critical paths)
npm run test:smoke

# Regression tests only
npm run test:regression

# Visual execution (with visible browser)
npm run test:headed

# Specific tests by tag
npm test -- --tags "@user-authentication"
npm test -- --tags "@shopping-cart"

# Cross-browser testing
npm run test:chrome
npm run test:firefox
```

### Available Tags

- `@smoke` - Critical basic tests (fastest feedback)
- `@regression` - Complete regression suite
- `@user-authentication` - Login functionality tests
- `@shopping-cart` - Cart functionality tests
- `@product-inventory` - Inventory management
- `@checkout-process` - Purchase process
- `@error-handling` - Error handling scenarios

## Reports

Reports are automatically generated in:

- `reports/cucumber-report.html` - Visual HTML report
- `reports/cucumber-report.json` - JSON data for CI/CD integration

Screenshots of failures are automatically included in reports.

## Configuration

### Timeouts

- Default timeout: 30 seconds
- Configured in `support/hooks.js`

### Supported Browsers

- **Chromium** (default)
- **Firefox**
- **WebKit** (Safari)

Change browser with environment variable:

```bash
BROWSER=firefox npm test
```

### Headless Mode

```bash
HEADLESS=false npm test  # With visible browser
```

## Implemented Best Practices

- **data-test selectors**: Use of `[data-test="..."]` for better reliability
- **Smart waits**: `waitForLoadState("networkidle")` eliminates race conditions
- **Page Object Model**: Clear separation of responsibilities
- **Error handling**: Automatic screenshots on failures
- **Clean code**: Comments and organized structure
- **Risk-based testing**: @smoke tags prioritize critical user journeys

## Debugging

To debug tests:

```bash
npm run test:debug    # Only tests marked @debug
npm run test:headed   # Visual execution with pause
PWDEBUG=1 npm test    # Playwright inspector mode
```

## Manual vs Automated Comparison

**Manual Testing of These Scenarios:**

- Login validation: ~2 minutes per browser
- Product browsing: ~3 minutes per browser
- Cart functionality: ~3 minutes per browser
- Cross-browser testing: 3x the effort
- **Total manual effort**: ~24 minutes per browser

**Automated Testing:**

- All scenarios across all browsers: ~12 seconds
- **Repeatability**: Unlimited executions with consistent quality
- **Coverage**: Simultaneous multi-browser validation

---

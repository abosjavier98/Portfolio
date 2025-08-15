# Cypress E2E Test Suite

End-to-end testing implementation using Cypress framework.

## Test Application

Target: Automation Exercise (https://automationexercise.com/)

**Test Coverage:**

- Navigation and basic functionality
- Authentication forms and error handling
- E-commerce workflows (browsing, cart, checkout)
- API endpoint validation
- Mobile responsive testing

## Project Structure

````
cypress/
├── e2e/
│   ├── working-tests.cy.js    # Main test suite (14 tests)
│   ├── basic-tests.cy.js      # Smoke tests (4 tests)
│   ├── shopping-demo.cy.js    # Live demo with delays (2 tests)
│   └── mobile-tests.cy.js     # Mobile responsive tests (9 tests)
├── fixtures/
│   └── products.json          # Test data
└── support/
    ├── commands.js            # Custom helper commands + mobile helpers
    └── e2e.js                 # Global config
```## Running the Tests

```bash
# Install dependencies
npm install

# Open Cypress Test Runner (interactive)
npm run test:open

# Run tests headlessly
npm test

# Run mobile-specific tests
npm run test:mobile

# Open Cypress with mobile viewport preset
npm run test:mobile:open

# Run specific test file
npm run test:demo
````

## What I've Learned

### The Good Stuff

- **Visual feedback** - watching tests run in real-time is actually pretty helpful
- **Debugging** - when something breaks, it's easy to see exactly what happened
- **Setup** - got up and running much faster than expected
- **Documentation** - their docs are really well done

### The Tricky Bits

- **Asynchronous handling** - had to learn their approach to promises and chaining
- **Network stubbing** - powerful but took some time to figure out
- **File uploads** - needed extra plugins for some functionality
- **Test isolation** - making sure tests don't depend on each other

## Test Details

### Basic Tests (4 tests)

- Homepage loading and basic structure
- Navigation to login and products pages
- Page element validation

### Working Tests (14 tests)

- Login form validation
- Product browsing and search
- API endpoint testing
- Complete shopping flows
- Cart management operations
- Mobile responsive layout testing

### Demo Tests (2 tests)

- Step-by-step shopping journey with delays
- Cart management demonstration

### Mobile Tests (9 tests)

- Mobile navigation and layout verification
- Touch interactions and scrolling behavior
- Responsive form handling (login/signup)
- Mobile shopping flow end-to-end
- Mobile search functionality

## Mobile Testing Approach

Added comprehensive mobile testing to ensure the e-commerce site works properly on mobile devices:

- **Viewport Testing**: iPhone 14 Pro dimensions (430x932px)
- **Responsive Layout**: Verification that content doesn't overflow
- **Touch Interactions**: Mobile-specific user interactions
- **Form Usability**: Ensuring forms work with mobile keyboards
- **Navigation**: Mobile menu and touch navigation testing

Key mobile test scenarios:

- Homepage layout on mobile screens
- Login/signup form accessibility
- Product browsing with touch gestures
- Mobile cart operations
- Search functionality on mobile

## Custom Commands

Created some helper commands to avoid repetition:

```javascript
cy.navigateTo("Products"); // Quick navigation
cy.attemptLogin(email, password); // Login testing
cy.searchProducts("t-shirt"); // Product search

// Mobile-specific commands
cy.setMobileViewport(); // iPhone 14 Pro size
cy.setTabletViewport(); // iPad dimensions
cy.resetViewport(); // Back to desktop
cy.verifyMobileLayout(); // Check responsive layout
```

## Configuration

Key settings in `cypress.config.js`:

- Base URL: `https://automationexercise.com`
- Video recording enabled
- Screenshot on failures
- 10-15 second timeouts (site can be slow)

## Installation and Usage

### Prerequisites

- Node.js 18+
- Chrome browser

### Setup

```bash
# Clone repository
git clone https://github.com/abosjavier98/Portfolio.git

# Install dependencies
npm install
```

## Running Tests

### Command Options

```bash
# Run all tests (headless)
npm test

# Interactive test runner
npm run test:open

# Live demo with visible browser
npm run test:demo
```

## Test Reports and Visual Evidence

### **Video Reports**

- Automatic video recording for every test run
- Located in `cypress/videos/` folder
- Perfect for sharing with non-technical stakeholders
- Shows real browser interactions and test flow

### **Command Line Reports**

```
✔  All specs passed!                        00:34       12       12        -        -        -
```

### **Demo for Non-Technical Viewers**

**For Business Stakeholders:**

1. Videos automatically generated in `cypress/videos/`
2. Each test file creates an MP4 showing:
   - Browser automation in action
   - Page navigation and interactions
   - Success/failure indicators
   - Real-time test execution

**Example Video Content:**

- `basic-tests.cy.js.mp4` - Shows homepage loading, navigation testing
- `working-tests.cy.js.mp4` - Demonstrates login flows, product search, API testing

### **Reporting Features**

- **Console Output**: Clear pass/fail status for each test
- **Execution Time**: Performance metrics for each test
- **Error Screenshots**: Automatic capture on test failures
- **Test Summary**: Overview of total tests run, passed, failed

## Technical Architecture

### Custom Commands

- `navigateTo()` - Smart navigation helper
- `attemptLogin()` - Login testing utility
- `searchProducts()` - Product search automation
- `testAPI()` - API validation helper
- `addProductToCart()` - Add products with quantity control
- `viewCartAndVerify()` - Cart validation and verification
- `proceedToCheckout()` - Checkout flow initiation

### Robust Selectors

- Content-based selectors (`cy.contains()`)
- Specific CSS selectors for stability
- Dynamic element handling
- Cross-browser compatibility

## Professional Quality Assurance

- **100% Test Reliability**: All tests consistently pass
- **Fast Execution**: Complete suite runs in under 35 seconds
- **Maintainable Code**: Clean, documented, and organized
- **Real-World Testing**: Uses actual e-commerce platform
- **Visual Evidence**: Video recordings for stakeholder review

## Contact

This project is part of my professional test automation portfolio demonstrating expertise in:

- Cypress framework mastery
- E2E testing best practices
- Test architecture design
- Quality assurance methodologies

---

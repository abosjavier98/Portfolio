# Test Automation Portfolio

Two automation frameworks were implemented for demonstration in real environments.

[Playwright + Cucumber](./playwright-cucumber/) | [Cypress E2E](./cypress/)

## Overview

This repository contains test automation implementations using different approaches. Built to explore BDD methodology and modern E2E testing patterns.

## Projects

### Playwright + Cucumber Suite

**Tech Stack:** Playwright, Cucumber.js, JavaScript  
**Focus:** BDD implementation with Gherkin scenarios

Features:

- Cross-browser testing (Chrome/Firefox)
- Page Object pattern implementation
- Cucumber step definitions
- Automated screenshot capture on failures

**[View Details →](./playwright-cucumber/)**

### Cypress E2E Suite

**Tech Stack:** Cypress, JavaScript  
**Focus:** Modern end-to-end testing

Features:

- Real-time test execution
- Custom command library
- Mobile responsive testing
- Video recording for test runs

**[View Details →](./cypress/)**

## Setup and Usage

### Prerequisites

- Node.js 16+
- Git

### Installation

```bash
git clone <repository-url>
cd test-automation-portfolio

# Run setup script
./setup.sh

# Manual installation
npm install
npm run install:all
```

### Running Tests

```bash
npm run test:playwright  # BDD scenarios
npm run test:cypress     # E2E tests
npm run test:all         # All test suites
```

## Technical Implementation

### Testing Approaches

- BDD with Gherkin feature files
- Page Object Model pattern
- Cross-browser compatibility testing
- Mobile responsive validation

### Tools & Frameworks

- Playwright for automation engine
- Cucumber.js for BDD implementation
- Cypress for E2E testing
- JavaScript/Node.js runtime

## Repository Structure

```
├── playwright-cucumber/    # BDD test implementation
├── cypress/                # E2E test implementation
├── scripts/                # Utility scripts
└── setup.sh               # Environment setup
```

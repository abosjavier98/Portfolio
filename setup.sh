#!/bin/bash

# Test Automation Portfolio Setup Script
# This script installs all dependencies and sets up the complete portfolio

set -e

echo "Setting up Test Automation Portfolio..."
echo "=================================================="

# Colors for output
GREEN='\\033[0;32m'
BLUE='\\033[0;34m'
YELLOW='\\033[1;33m'
RED='\\033[0;31m'
NC='\\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node --version)"
    print_error "Playwright requires Node.js 18+. Please update your Node.js installation."
    exit 1
fi

print_success "Node.js $(node --version) is installed"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi

print_success "npm $(npm --version) is installed"

# Install root dependencies
print_status "Installing root dependencies..."
npm install
print_success "Root dependencies installed"

# Install Playwright Cucumber Suite
print_status "Setting up Playwright + Cucumber Suite..."
cd playwright-cucumber
npm install
npx playwright install
print_success "Playwright + Cucumber Suite setup complete"
cd ..

# Install Cypress Testing Suite
print_status "Setting up Cypress Testing Suite..."
cd cypress
npm install
print_success "Cypress Testing Suite setup complete"
cd ..

# Install API Testing Suite
print_status "Setting up API Testing Suite (Newman)..."
if [ -d "api-testing" ]; then
  cd api-testing
  npm install
  print_success "API Testing Suite setup complete"
  cd ..
else
  print_warning "API Testing Suite directory not found, skipping..."
fi

# Install Performance Testing Suite
print_status "Setting up Performance Testing Suite (K6)..."
if [ -d "performance-testing" ]; then
  cd performance-testing
  npm install

  # Check if K6 is installed globally
  if ! command -v k6 &> /dev/null; then
    print_warning "K6 is not installed globally. Please install K6 manually:"
    print_warning "  Linux/Mac: curl https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz -L | tar xvz --strip-components 1"
    print_warning "  Windows: choco install k6"
    print_warning "  Or visit: https://k6.io/docs/getting-started/installation/"
  else
    print_success "K6 $(k6 version --quiet) is installed"
  fi

  print_success "Performance Testing Suite setup complete"
  cd ..
else
  print_warning "Performance Testing Suite directory not found, skipping..."
fi

# Create reports directory
print_status "Creating reports directory..."
mkdir -p reports
print_success "Reports directory created"

# Generate initial portfolio report
print_status "Generating portfolio report..."
npm run report
print_success "Portfolio report generated"

# Final success message
echo ""
echo "=================================================="
print_success "Test Automation Portfolio setup complete!"
echo ""
echo "Available commands:"
echo "  npm run test:all         - Run all test suites"
echo "  npm run test:playwright  - Run Playwright tests"
echo "  npm run test:cypress     - Run Cypress tests"
echo "  npm run report           - Generate portfolio report"
echo ""
echo "Project structure:"
echo "  playwright-cucumber/      - Cross-browser E2E testing"
echo "  cypress/                  - Modern E2E and component testing"
echo "  scripts/                  - Utility scripts and reports"
echo "  reports/                  - Generated test reports"
echo ""
echo "Ready to demonstrate your test automation skills!"
echo "=================================================="

@regression
Feature: SauceDemo E-commerce Functionality
  As a customer
  I want to browse and purchase products on SauceDemo
  So that I can complete my shopping needs online

  @smoke @user-authentication
  Scenario: Successful user login
    Given I am on the SauceDemo login page
    When I login with valid credentials
      | username | standard_user |
      | password | secret_sauce  |
    Then I should be successfully logged in
    And I should see the inventory page

  @product-inventory
  Scenario: View product inventory
    Given I am logged in as a standard user
    When I am on the inventory page
    Then I should see 6 products displayed
    And the products should be displayed in a grid format

  @shopping-cart
  Scenario: Add products to shopping cart
    Given I am logged in as a standard user
    And I am on the inventory page
    When I add the first product to my cart
    Then the cart should contain 1 item
    And the cart badge should show "1"

  @shopping-cart
  Scenario: Add multiple products to cart
    Given I am logged in as a standard user
    And I am on the inventory page
    When I add "Sauce Labs Backpack" to my cart
    And I add "Sauce Labs Bike Light" to my cart
    Then the cart should contain 2 items
    And the cart badge should show "2"

  @checkout-process
  Scenario: View cart contents
    Given I am logged in as a standard user
    And I have added "Sauce Labs Backpack" to my cart
    When I go to the shopping cart
    Then I should see "Sauce Labs Backpack" in the cart
    And I should see the correct price for the item

  @error-handling
  Scenario: Handle invalid login attempts
    Given I am on the SauceDemo login page
    When I login with invalid credentials
      | username | invalid_user    |
      | password | wrong_password  |
    Then I should see an error message
    And I should remain on the login page

  @error-handling  
  Scenario: Handle locked out user
    Given I am on the SauceDemo login page
    When I login with locked out user credentials
      | username | locked_out_user |
      | password | secret_sauce    |
    Then I should see a locked out error message
    And I should remain on the login page

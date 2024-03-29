Feature: Create a menu
  How a customer could register and account and then create a menu.

  Scenario: A customer register and account and create a digital menu
    Given A user visits REGISTER
    And clicks on LANGUAGES
    And clicks on ENGLISH_OR_INGLES
    When fill the register form with "createMenuTest1@example.com" as email
    And clicks on SIGN_UP
    Then a "success" growl appears
    Then is redirected to "/menu"
    And clicks on LOG_OUT
    When clicks on SIGN_IN
    And puts "createMenuTest1@example.com" as EMAIL and "testPassword" as PASSWORD in login form
    And clicks on SIGN_IN_SUBMIT
    Then is redirected to "/menu"
    And clicks on FIRST_MENU_BUTTON
    Then puts "createMenuTest1" as menu name
    And clicks on SAVE_MENU_BUTTON
    Then clicks on ENTER_THE_MENU
    And clicks on PLUS_CREATE_SECTION
    Then puts "createMenuTest1Section1" as section
    And clicks on CREATE_SECTION
    And clicks on DIGITAL_MENU_COLLAPSE
    And clicks on DIGITAL_MENU_COLLAPSE
    Then see the section "createMenuTest1Section1" created
    When create a dish "createMenuTest1Section1Dish1" on "createMenuTest1Section1" section
    And get the QR and clicks on menu link
    And clicks on DIGITAL_MENU_COLLAPSE
    And clicks on DIGITAL_MENU_COLLAPSE
    Then see the section "createMenuTest1Section1" created
    And see the dish "createMenuTest1Section1Dish1" created in section "createMenuTest1Section1"
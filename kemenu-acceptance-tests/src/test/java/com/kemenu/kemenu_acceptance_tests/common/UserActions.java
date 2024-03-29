package com.kemenu.kemenu_acceptance_tests.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotInteractableException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import static com.kemenu.kemenu_acceptance_tests.RunCucumberTests.chromeTestRule;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserActions {

    public static void clickOn(String xPath) {
        clickOn(xPath, 0, 100);
    }

    private static void clickOn(String xPath, int cont, int sleep) {
        try {
            Thread.sleep(500);
            click(xPath);
            Thread.sleep(sleep + 250);
        } catch (StaleElementReferenceException e) {
            if (5 > cont) {
                try {
                    System.out.println("Retrying click");
                    Thread.sleep(sleep + 100);
                } catch (InterruptedException interruptedException) {
                    interruptedException.printStackTrace();
                }
                clickOn(xPath, ++cont, sleep + 100);
            } else {
                throw e;
            }
        } catch (InterruptedException interruptedException) {
            interruptedException.printStackTrace();
        }
    }

    private static void click(String xPath) {
        WebElement buttonElement = chromeTestRule.getChrome().findElementByXPath(xPath);
        try {
            buttonElement.click();
        } catch (ElementNotInteractableException e) {
            chromeTestRule.getChrome().executeScript("arguments[0].click();", buttonElement);
        }
    }

    public static void clickOnSection(String sectionName) {
        UserActions.clickOn("//button[@type = 'submit' and contains(.//span, '" + sectionName + "')]");
    }

    public static String getQRLink() {
        UserActions.clickOn("//button[@type = 'submit' and contains(text(), 'Get QR and share')]");
        new WebDriverWait(chromeTestRule.getChrome(), 2)
                .until(webDriver -> webDriver.findElement(By.xpath("//a[@target = '_blank' and contains(text(), 'http://localhost:4201/show/')]")).getText().contains("http://localhost:4201/show/"));
        return chromeTestRule.getChrome().findElementByXPath("//a[@target = '_blank' and contains(text(), 'http://localhost:4201/show/')]").getText();
    }
}

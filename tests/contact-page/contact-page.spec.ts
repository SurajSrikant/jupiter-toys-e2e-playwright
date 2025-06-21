import { test, expect } from "@playwright/test";
import fillContactForm from "../../helper-functions/contact-page/submitForm";
import PageObjectManager from "../../pages/PageObjectManager";
import pageResponse from "../../helper-functions/util/navigator";

test.describe("Contact page", () => {
  let contactPage;

  test.beforeEach(async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page);
    contactPage = pageObjectManager.getContactPage();
    await page.goto("/");
  });

  test("Checks validation errors", async ({ page }) => {
    const responsePromise = pageResponse(page, "contact");

    await contactPage.contactTabBtn.click();

    const response = await responsePromise;
    expect(response.status()).toBe(200);

    await expect(contactPage.requiredFields).toHaveCount(3);

    await contactPage.submitButton.click();

    await assertInvalidForm(contactPage);

    await fillContactForm(page);

    await expect(contactPage.inlineHelpText).not.toBeVisible();
    await expect(contactPage.submitErrorAlert).not.toBeVisible();
  });
});

async function assertInvalidForm(contactPage) {
  await expect(contactPage.submitErrorAlert).toContainText(
    "We welcome your feedback - but we won't get it unless you complete the form correctly."
  );

  await expect(contactPage.forenameError).toBeVisible();
  await expect(contactPage.forenameError).toContainText("Forename is required");

  await expect(contactPage.emailError).toBeVisible();
  await expect(contactPage.emailError).toContainText("Email is required");

  await expect(contactPage.messageError).toBeVisible();
  await expect(contactPage.messageError).toContainText("Message is required");

  await expect(contactPage.page.locator(".ng-invalid")).toHaveCount(4);
}

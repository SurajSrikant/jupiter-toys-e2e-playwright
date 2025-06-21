import { test, expect } from "@playwright/test";
import PageObjectManager from "../../pages/PageObjectManager";
import fillContactForm from "../../helper-functions/contact-page/submitForm";
import pageResponse from "../../helper-functions/util/navigator";

for (let i = 0; i < 5; i++) {
  test.describe(`Contact page - Run ${i + 1}`, () => {
    let contactPage;

    test.beforeEach(async ({ page }) => {
      const pageObjectManager = new PageObjectManager(page);
      contactPage = pageObjectManager.getContactPage();
      await page.goto("/");
    });

    test("Submit contact form", async ({ page }) => {
      const responsePromise = pageResponse(page, "contact");

      await contactPage.contactTabBtn.click();

      const response = await responsePromise;
      expect(response.status()).toBe(200);

      await fillContactForm(page);

      await contactPage.submitButton.click();

      await assertFormSubmitted(contactPage);
    });
  });
}

async function assertFormSubmitted(contactPage) {
  await expect(contactPage.submitFeedbackModal).toBeVisible();

  const modalHeader = contactPage.page.locator(".modal-header > h1");
  await expect(modalHeader).toContainText("Sending Feedback");

  await expect(contactPage.successFormSubmit).toBeVisible({ timeout: 15000 });

  await expect(contactPage.successFormSubmit).toContainText(
    "Thanks John, we appreciate your feedback."
  );
}

import { ContactPage } from "../../pages/ContactPage";
import { expect } from "@playwright/test";

export default async function fillContactForm(page) {
  const selectors = new ContactPage(page);

  selectors.forenameInput.fill("John");
  await expect(selectors.forenameInput).toHaveClass(/ng-valid/);

  selectors.emailInput.fill("john.example@planit.net.au");
  await expect(selectors.emailInput).toHaveClass(/ng-valid/);

  selectors.messageInput.fill("john.example@planit.net.au");
  await expect(selectors.messageInput).toHaveClass(/ng-valid/);
}

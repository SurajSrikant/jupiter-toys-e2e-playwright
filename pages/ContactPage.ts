import { Page, Locator } from "@playwright/test";

export class ContactPage {
  page: Page;
  contactTabBtn: Locator;
  requiredFields: Locator;
  submitButton: Locator;
  submitErrorAlert: Locator;
  inlineHelpText: Locator;
  forenameError: Locator;
  emailError: Locator;
  messageError: Locator;
  forenameInput: Locator;
  emailInput: Locator;
  messageInput: Locator;
  submitFeedbackModal: Locator;
  successFormSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactTabBtn = page.locator("#nav-contact");
    this.requiredFields = page.locator(".req");
    this.submitButton = page.locator(".btn-primary");
    this.submitErrorAlert = page.locator(".alert-error");
    this.inlineHelpText = page.locator(".help-inline");
    this.forenameError = page.locator("#forename-err");
    this.emailError = page.locator("#email-err");
    this.messageError = page.locator("#message-err");
    this.forenameInput = page.locator("#forename");
    this.emailInput = page.locator("#email");
    this.messageInput = page.locator("#message");
    this.submitFeedbackModal = page.locator(".modal-header");
    this.successFormSubmit = page.locator(".alert-success");
  }
}

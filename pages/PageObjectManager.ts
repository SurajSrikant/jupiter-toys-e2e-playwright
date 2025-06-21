import { Page } from "@playwright/test";
import { ContactPage } from "../pages/ContactPage";
import { Cart } from "./cartPage";

class PageObjectManager {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getContactPage() {
    return new ContactPage(this.page);
  }

  getCartPage() {
    return new Cart(this.page);
  }
}

export default PageObjectManager;

import { Page, Locator } from "@playwright/test";

export class Cart {
  page: Page;
  cartBtn: Locator;
  cartItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBtn = page.locator(".cart-count");
    this.cartItem = page.locator(".cart-item");
  }
}

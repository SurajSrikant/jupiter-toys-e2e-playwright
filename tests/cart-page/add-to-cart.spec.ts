import { test, expect, Page, Locator } from "@playwright/test";
import PageObjectManager from "../../pages/PageObjectManager";
import pageResponse from "../../helper-functions/util/navigator";
import { Cart } from "../../pages/cartPage";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  expectedSubtotal: number;
};

type CartItems = CartItem[];

const expectedItems: CartItems = [
  {
    name: "Stuffed Frog",
    price: 10.99,
    quantity: 2,
    expectedSubtotal: 21.98,
  },
  {
    name: "Fluffy Bunny",
    price: 9.99,
    quantity: 5,
    expectedSubtotal: 49.95,
  },
  {
    name: "Valentine Bear",
    price: 14.99,
    quantity: 3,
    expectedSubtotal: 44.97,
  },
];

test.describe("Cart page", () => {
  let cart: Cart;

  test.beforeEach(async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page);
    cart = pageObjectManager.getCartPage();
    await page.goto("/");
  });

  test("Validate cart", async ({ page }) => {
    const shopResponsePromise = pageResponse(page, "shop");

    const startShoppingBtn = page.locator(".btn-success");
    await expect(startShoppingBtn).toHaveText("Start Shopping »");
    await startShoppingBtn.click();

    const response = await shopResponsePromise;
    expect(response.status()).toBe(200);

    await addItemsInCart(page, "#product-2", 2); // frog
    await addItemsInCart(page, "#product-4", 5); // bunny
    await addItemsInCart(page, "#product-7", 3); // bear

    await expect(cart.cartBtn).toContainText("10");

    await cart.cartBtn.click();

    const cartItemRows = cart.cartItem;
    const rowCount = await cartItemRows.count();

    for (let index = 0; index < rowCount; index++) {
      const row = cartItemRows.nth(index);

      const firstCell = row.locator("td").first();
      const itemText = await firstCell.textContent();
      const itemName = itemText?.trim() || "";

      const expectedItem = expectedItems.find((item) =>
        itemName.includes(item.name)
      );

      if (expectedItem) {
        await validatePrice(row, expectedItem);
        await validateQuantity(row, expectedItem);
        await validateTotal(row, expectedItem);
      }
    }

    await validateCartTotal(page, expectedItems);
  });
});

async function addItemsInCart(
  page: Page,
  productSelector: string,
  times: number
) {
  const productElement = page.locator(productSelector);

  for (let i = 0; i < times; i++) {
    await productElement.locator(".btn-success").click();
  }
}

async function validatePrice(row: Locator, expectedItem: CartItem) {
  const priceCell = row.locator("td").nth(1);
  const priceText = await priceCell.textContent();
  const price = parseFloat(priceText?.replace("$", "") || "0");
  expect(price).toBe(expectedItem.price);
}

async function validateQuantity(row: Locator, expectedItem: CartItem) {
  const quantityCell = row.locator("td").nth(2);
  const quantityInput = quantityCell.locator('input[type="number"]');
  await expect(quantityInput).toHaveValue(expectedItem.quantity.toString());
}

async function validateTotal(row: Locator, expectedItem: CartItem) {
  const totalCell = row.locator("td").nth(3);
  const subtotalText = await totalCell.textContent();
  const subtotal = parseFloat(subtotalText?.replace("$", "") || "0");
  expect(subtotal).toBe(expectedItem.expectedSubtotal);
}

async function validateCartTotal(page: Page, expectedItems: CartItems) {
  const totalElement = page.locator(".total");
  const totalText = await totalElement.textContent();

  const totalMatch = totalText?.match(/Total:\s*([\d.]+)/);
  expect(totalMatch).not.toBeNull();

  if (totalMatch) {
    const displayedTotal = parseFloat(totalMatch[1]);
    const expectedTotal = expectedItems.reduce(
      (sum, item) => sum + item.expectedSubtotal,
      0
    );

    expect(displayedTotal).toBe(expectedTotal);
  }
}

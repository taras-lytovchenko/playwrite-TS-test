import {test} from "@playwright/test";
import {Application} from "../app";

test('should allow me to add product to shopping cart', async ({ page }) => {
    const app = new Application(page);
    await app.home.open();
    await app.productPage.open();
    await app.customOptions.chooseCustomOption();
//    await page.waitForTimeout(5000);
    await app.productPage.addToCart();
});

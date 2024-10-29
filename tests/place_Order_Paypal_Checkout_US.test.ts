import {test} from "@playwright/test";
import {Application} from "../app";

test('Place Order via PayPal-Checkout on Talisa US', async ({ page }) => {
    const app = new Application(page);
    await app.homePage.open();
    await app.productPage.open();
    await app.productPage.chooseCustomOption();
//    await page.waitForTimeout(5000);
    await app.productPage.addToCart();
    await app.cartPage.selectOneTimePurchase();
    await app.cartPage.goToCheckout();
    await app.checkoutPage.fillAddress();
    await app.checkoutPage.placeOrderByPayPal();
    await app.thankYouPage.checkElements();
});

import {AppComponent} from "../../appComponent";
import {env} from "../../../env";


export class Paypal extends AppComponent {

    static getAddressValues(): { [key: string]: string } {
        return {
            firstname: "John",
            lastname: "Doe",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001"
        };
    }

    // Place order via Paypal on cart page
    async authorizeToCartPaypal() {
        const [paypalPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.locator("//div[@class='cart-summary']//div[contains(@class, 'paypal-buttons-label-pay')]").click()
        ]);

        await paypalPage.waitForLoadState();
        console.log("New window title: " + await paypalPage.title());

        await this.loginToPaypal(paypalPage);
        await paypalPage.locator("//button[@data-testid='change-shipping']").click();
        await paypalPage.locator("//button[@data-testid='add-shipping-link']").click();
        await this.fillPayPalAddress(paypalPage);
        await paypalPage.locator("//button[@data-testid='add-shipping-save-btn']").click();
        await paypalPage.locator("//button[@id='payment-submit-btn']").click();
    }

    async fillPayPalAddress(paypalPage: any) {
        const checkoutValues = Paypal.getAddressValues();

        await paypalPage.fill("//input[@data-testid='addressFirstName']", checkoutValues.firstname);
        await paypalPage.fill("//input[@data-testid='addressLastName']", checkoutValues.lastname);
        await paypalPage.fill("//input[@data-testid='address-auto-suggest']", checkoutValues.street);
        await paypalPage.fill("//input[@data-testid='address-form-field-city']", checkoutValues.city);
        await paypalPage.selectOption("//select[@data-testid='address-form-field-state']", checkoutValues.state);
        await paypalPage.fill("//input[@data-testid='address-form-field-postalCode']", checkoutValues.zip);
    }

    // Place order via Paypal on checkout page
    async authorizeToCheckoutPaypal() {
        await this.page.waitForTimeout(3000);
        await this.page.locator("//div[@id='checkout-step-payment']//input[@id='paypal_express']").click();
        await this.page.waitForTimeout(3000);

        const [paypalPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.frameLocator("//div[@id='co-place-order-area']//iframe[@title='PayPal']")
                .locator("//div[@class='paypal-button-label-container']").click()
        ]);

        await paypalPage.waitForLoadState();
        console.log("New window title: " + await paypalPage.title());

        await this.loginToPaypal(paypalPage);
        await paypalPage.locator("//button[@id='payment-submit-btn']").click();
    }

    async finalizePayPalExpressOrder() {
        await this.page.waitForTimeout(8000);
        await this.page.locator("//button[@class='action checkout primary']").click();
    }

    private async loginToPaypal(page: any) {
        await page.locator("input#email").fill(env.EMAIL_PAYPAL);
        await page.locator("#btnNext").click();
        await page.locator("input#password").fill(env.PASSWORD_PAYPAL);
        await page.locator("#btnLogin").click();
    }
}
import {AppComponent} from "../../appComponent";
import {expect} from "@playwright/test";
import {env} from "../../../env";
import {UrlChecker} from "../utils/urlChecker";
import {Paypal} from "../checkout_page/PayPal";


export class CartInformation extends AppComponent {

    async selectOneTimePurchase() {

        await this.page.click("//div[@data-perks='#perks-default']//div[@class='description']");

        const oneTimePurchasePrice = await this.page.textContent("//div[@class='row you-pay']//div[@class='col checked']");
        const orderTotalPrice = await this.page.textContent("//tr[@class='grand totals']//span[@class='price']");

        const oneTimePurchasePriceWithoutSymbols = oneTimePurchasePrice.replace(/[^\d.]/g, '');
        const orderTotalPriceWithoutSymbols = orderTotalPrice.replace(/[^\d.]/g, '');

        expect(oneTimePurchasePriceWithoutSymbols).toBe(orderTotalPriceWithoutSymbols);
        console.log(`The prices are the same: ${oneTimePurchasePriceWithoutSymbols}$ = ${orderTotalPriceWithoutSymbols}$`);

    }

    async goToCheckout() {
        const currentDomain = this.page.url();
        if (currentDomain.includes(env.TALISA_US_URL)) {

            const checkoutUrl = "/onestepcheckout/";
            await this.page.click("//button[@data-role='proceed-to-checkout']");
            await UrlChecker.checkURL(this.page,checkoutUrl);
        }
    }

    async placeOrderByPaypalExpress(){
        const paymentPayPal = new Paypal(this.page);
        await paymentPayPal.authorizeToCartPaypal();
        await paymentPayPal.finalizePayPalExpressOrder();
        const expectedUrl = "/checkout/onepage/success/";
        await UrlChecker.checkURL(this.page,expectedUrl);
    }
}
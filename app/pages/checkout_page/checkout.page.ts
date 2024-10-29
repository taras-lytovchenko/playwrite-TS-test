import {AppComponent} from "../../appComponent";
import {Address} from "./address";
import {PaymentMethod} from "./paymentMethods";
import {UrlChecker} from "../utils/urlChecker";
import {Paypal} from "./PayPal";

export class CheckoutPage extends AppComponent {
    async fillAddress() {
        const address = new Address(this.page)
        await address.fillShippingAddress();
    }
    async fillCreditCard(){
        const creditCard = new PaymentMethod(this.page);
        await creditCard.fillBrainTreeData();
    }
    async getPlaceOrder() {
        const placeOrderButtonSelector = "div button[type='button'].action.primary.checkout span";
        await this.page.click(placeOrderButtonSelector);
        const expectedUrl = "/checkout/onepage/success/";
        await UrlChecker.checkURL(this.page,expectedUrl);
    }
    async placeOrderByPayPal(){
        const paymentPayPal = new Paypal(this.page);
        await paymentPayPal.authorizeToCheckoutPaypal();
        const expectedUrl = "/checkout/onepage/success/";
        await UrlChecker.checkURL(this.page,expectedUrl);
    }
}
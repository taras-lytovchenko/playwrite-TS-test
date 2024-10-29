import {AppComponent} from "./appComponent";
import {HomePage} from "./pages/home_page/home.page";

import {ProductPage} from "./pages/product_page/product.page";
import {CartInformation} from "./pages/cart_page/cart.page";
import {CheckoutPage} from "./pages/checkout_page/checkout.page";
import {ThankYouPage} from "./pages/thank_you_page/thank.you.page";


export class Application extends AppComponent {
    homePage = new HomePage(this.page);
    productPage = new ProductPage(this.page);
    cartPage = new CartInformation(this.page);
    checkoutPage = new CheckoutPage(this.page);
    thankYouPage = new ThankYouPage(this.page);

}
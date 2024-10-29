import {AppComponent} from "../../appComponent";

export class ProductPage extends AppComponent{
    async open(path="/serene-black-onyx-men-name-bracelet-prd-ka-cbr0053-ws-t1/"){
        await this.page.goto(path);
    }
    async addToCart() {
        const shoppingCartUrl = "/checkout/cart/";
        await this.page.click("//button[@id='product-addtocart-button']");
        await this.page.waitForURL(`**${shoppingCartUrl}`);
    }
}
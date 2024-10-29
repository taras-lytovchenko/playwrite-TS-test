import {AppComponent} from "../../appComponent";
import {CustomOptions} from "./сustom.options";
import {UrlChecker} from "../utils/urlChecker";

export class ProductPage extends AppComponent{
    async open(path="/serene-black-onyx-men-name-bracelet-prd-ka-cbr0053-ws-t1/"){
        await this.page.goto(path);
    }
    async addToCart() {
        const expectedCartUrl = "/checkout/cart/";
        await this.page.click("//button[@id='product-addtocart-button']");
        UrlChecker.checkURL(this.page,expectedCartUrl);
    }
    async chooseCustomOption(){
        const customOptions = new CustomOptions(this.page);
        await customOptions.chooseCustomOption();
    }
}
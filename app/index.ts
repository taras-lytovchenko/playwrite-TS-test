import {AppComponent} from "./appComponent";
import {HomePage} from "./pages/home_page/home.page";
import {UstomOptions} from "./pages/product_page/сustom.options";
import {ProductPage} from "./pages/product_page/product.page";

export class Application extends AppComponent {
    home = new HomePage(this.page);
    customOptions = new UstomOptions(this.page);
    productPage = new ProductPage(this.page);
}
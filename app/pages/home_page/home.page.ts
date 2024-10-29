import {AppComponent} from "../../appComponent";
import {env} from "../../../env";

export class HomePage extends AppComponent{
    async open(){
        await this.page.goto('/');
    }
}
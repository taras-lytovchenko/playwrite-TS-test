import {AppComponent} from "../../appComponent";
import {CustomerData} from "../utils/customerData";

export class Address extends AppComponent {

    static getCheckoutValues(): { [key: string]: string } {
        const customerEmail = CustomerData.generateEmail(process.env.EMAIL);
        return {
            email: customerEmail,
            firstname: "Seimur",
            lastname: "USLastname",
            street: "Washington 70",
            city: "New York",
            state: "43",
            zip: "10012",
            phone: "5417543010"
        };
    }

    async fillShippingAddress() {
        const checkoutObjects: { [key: string]: string } = {
            email: "//form[@data-role='email-with-possible-login']//input[@type='email']",
            firstname: "//div[@name='shippingAddress.firstname']//input[@name='firstname']",
            lastname: "//div[@name='shippingAddress.lastname']//input[@name='lastname']",
            street: "//div[@name='shippingAddress.street.0']//input[@name='street[0]']",
            city: "//div[@name='shippingAddress.city']//input[@name='city']",
            state: "//div[@name='shippingAddress.region_id']//select[@name='region_id']",
            zip: "//div[@name='shippingAddress.postcode']//input[@name='postcode']",
            phone: "//div[@name='shippingAddress.telephone']//input[@name='telephone']"
        };

        const checkoutValues = Address.getCheckoutValues();

        for (const [key, locator] of Object.entries(checkoutObjects)) {
            const inputFieldElement = this.page.locator(locator);
            const inputFieldElementValue = checkoutValues[key];

            if (key === "state") {
                await inputFieldElement.selectOption(inputFieldElementValue);
            } else {
                await inputFieldElement.fill(inputFieldElementValue);
            }
        }
    }


}
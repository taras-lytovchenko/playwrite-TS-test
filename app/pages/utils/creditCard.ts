import { AppComponent } from "../../appComponent";

export class CreditCard extends AppComponent {
    private static creditCardData: Map<string, string> = new Map();

    async checkTypeOfCreditCard(cardSelector: string): Promise<string> {
        const srcPath = await this.page.getAttribute(cardSelector, "src");
        if (!srcPath) {
            throw new Error("Failed to retrieve the 'src' attribute.");
        }

        const start = srcPath.lastIndexOf("/") + 1;
        const end = srcPath.lastIndexOf(".");

        if (start >= end) {
            throw new Error("Invalid 'src' attribute format.");
        }

        const cardType = srcPath.substring(start, end).toUpperCase();
        console.log("Credit Card Type: " + cardType);
        return cardType;
    }

    async getTypeOfCreditCard(): Promise<string> {
        const typeOfCreditCardSelector = "//img[@class='braintree-credit-card-selected']";
        return await this.checkTypeOfCreditCard(typeOfCreditCardSelector);
    }

    static putCreditCardData(key: string, value: string): void {
        this.creditCardData.set(key, value);
    }

    static getCreditCardData(key: string): string | undefined {
        return this.creditCardData.get(key);
    }
}
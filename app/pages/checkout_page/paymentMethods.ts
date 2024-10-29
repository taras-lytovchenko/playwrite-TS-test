import {AppComponent} from "../../appComponent";
import {CreditCard} from "../utils/creditCard";

export class PaymentMethod extends AppComponent {
    async fillBrainTreeData() {
        const paymentCardIframeMap: { [key: string]: string } = {
            cardNumber: "braintree-hosted-field-number",
            month: "braintree-hosted-field-expirationMonth",
            year: "braintree-hosted-field-expirationYear",
            cvv: "braintree-hosted-field-cvv"
        };

        const paymentCardSelectorsMap: { [key: string]: string } = {
            cardNumber: "//input[@class='number']",
            month: "//*[@class='expirationMonth']",
            year: "//input[@class='expirationYear']",
            cvv: "//input[@id='cvv']"
        };

        const paymentCards = [
            ["4111111111111111", "11", "2024", "111", "VI"],
            ["5555555555554444", "12", "2025", "222", "MC"]
        ];

        const selectedCard = PaymentMethod.getRandomCard(paymentCards);
        PaymentMethod.convertCardArrayToMap(selectedCard);

        for (const key in paymentCardIframeMap) {
            const frame = this.page.frame({ name: paymentCardIframeMap[key] });
            if (frame) {
                const selector = paymentCardSelectorsMap[key];
                const value = CreditCard.getCreditCardData(key);
                if (value) {
                    await frame.fill(selector, value);
                }
            }
        }

        const actualCardType = await new CreditCard(this.page).getTypeOfCreditCard();
        const expectedCardType = CreditCard.getCreditCardData("cardType");

        PaymentMethod.isCardTypeNone(actualCardType);
        PaymentMethod.compareStringValue(actualCardType, expectedCardType);

        console.log("Credit Card Type are the same: " + actualCardType + " = " + expectedCardType);
    }

    private static getRandomCard(cards: string[][]): string[] {
        return cards[Math.floor(Math.random() * cards.length)];
    }

    private static convertCardArrayToMap(card: string[]) {
        CreditCard.putCreditCardData("cardNumber", card[0]);
        CreditCard.putCreditCardData("month", card[1]);
        CreditCard.putCreditCardData("year", card[2]);
        CreditCard.putCreditCardData("cvv", card[3]);
        CreditCard.putCreditCardData("cardType", card[4]);
    }

    private static isCardTypeNone(cardType: string) {
        if (!cardType) {
            throw new Error("Card type is none.");
        }
    }

    private static compareStringValue(actual: string, expected: string) {
        if (actual !== expected) {
            throw new Error(`Expected ${expected} but got ${actual}`);
        }
    }

}

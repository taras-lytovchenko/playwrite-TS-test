import {Page} from "@playwright/test";

export class UrlChecker {
    static async checkURL(page: Page, urlPath: string) {
        let seconds = 30;

        while (seconds > 0) {
            const currentUrl = page.url();

            if (currentUrl.includes(urlPath)) {
                console.log("Pass: " + currentUrl);
                return;
            }

            await page.waitForTimeout(1000);
            seconds--;
            console.log("Not Pass: " + currentUrl);
        }
    }
}
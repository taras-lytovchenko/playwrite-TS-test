import {AppComponent} from "../../appComponent";

enum FieldType {
    DROP_DOWN_FIELD = 'DROP_DOWN_FIELD',
    INPUT_OPTION_FIELD = 'INPUT_OPTION_FIELD',
    NONE_FIELD = 'NONE_FIELD',
}

export class CustomOptions extends AppComponent {

    async chooseCustomOption() {
        const customOptionList = await this.getAllCustomOptions();
        await this.chooseAllCustomOptions(customOptionList);
    }

    private async getOptionSize(): Promise<number> {
        const UNDEFINED_OPTION_XPATH = "//div[@class='product-options-wrapper']//div[contains(@class, 'field')]";
        return this.page.locator(UNDEFINED_OPTION_XPATH).count();
    }

    private async getAllCustomOptions(): Promise<string[]> {
        const PARENT_CUSTOM_OPTION_BLOCK_XPATH = "//div[@class='fieldset']";
        const DROP_DOWN_XPATH = "//select[contains(@class, 'product-custom-option')]";
        const INPUT_OPTION_XPATH = "//input[contains(@class, 'product-custom-option')]";

        const options: string[] = [];
        const optionSize = await this.getOptionSize();

        for (let i = 1; i <= optionSize; i++) {
            const dropDownXPath = `${PARENT_CUSTOM_OPTION_BLOCK_XPATH}//div[${i}]${DROP_DOWN_XPATH}`;
            const inputOptionXPath = `${PARENT_CUSTOM_OPTION_BLOCK_XPATH}//div[${i}]${INPUT_OPTION_XPATH}`;

            if (await this.page.locator(dropDownXPath).count() > 0) {
                options.push(dropDownXPath);
                console.log('DropDownCustomOption added to List');
            } else if (await this.page.locator(inputOptionXPath).count() > 0) {
                options.push(inputOptionXPath);
                console.log('InputCustomOption added to List');
            }
        }
        return options;
    }

    private async chooseAllCustomOptions(optionXPaths: string[]) {
        for (const optionXPath of optionXPaths) {
            const fieldType = this.getFieldType(optionXPath);
            switch (fieldType) {
                case FieldType.DROP_DOWN_FIELD:
                    await this.chooseOptionFromDropDown(optionXPath);
                    break;
                case FieldType.INPUT_OPTION_FIELD:
                    if (await this.page.isVisible(optionXPath)) {
                        await this.page.fill(optionXPath, 'test');
                    } else {
                        console.log(`Element ${optionXPath} is not visible or not enabled.`);
                    }
                    break;
                default:
                    console.log('No action for None Field Type');
                    break;
            }
        }
    }

    private getFieldType(xpath: string): FieldType {
        if (xpath.includes('/select')) {
            return FieldType.DROP_DOWN_FIELD;
        } else if (xpath.includes('/input')) {
            return FieldType.INPUT_OPTION_FIELD;
        } else {
            return FieldType.NONE_FIELD;
        }
    }

    private async chooseOptionFromDropDown(dropDownOption: string) {
        await this.page.waitForSelector(dropDownOption);
        const options = await this.page.locator(`${dropDownOption}//option`).allTextContents();
        if (options.includes('Amethyst')) {
            await this.page.selectOption(dropDownOption, { label: 'Amethyst' });
        } else if (options.length > 1) {
            await this.page.selectOption(dropDownOption, { index: 1 });
        }
    }
}
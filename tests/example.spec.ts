import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';


class CustomOptions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private FieldType = {
    DROP_DOWN_FIELD: 'DROP_DOWN_FIELD',
    INPUT_OPTION_FIELD: 'INPUT_OPTION_FIELD',
    NONE_FIELD: 'NONE_FIELD',
  };

  static async choseCustomOption(page: Page) {
    const chooseCustomOptions = new CustomOptions(page);
    const customOptionList = await chooseCustomOptions.getAllCustomOption();
    await chooseCustomOptions.chooseAllCustomOptions(customOptionList);
  }

  async getOptionSize(): Promise<number> {
    const UNDEFINED_OPTION_XPATH = "//div[@class='product-options-wrapper']//div[@class='field' or @class='field required' or @class='field redirect required' or @class='field ven-choose-items']";
    return await this.page.locator(UNDEFINED_OPTION_XPATH).count();
  }

  async getAllCustomOption(): Promise<string[]> {
    const PARENT_CUSTOM_OPTION_BLOCK_XPATH = "//div[@class ='fieldset']";
    const DROP_DOWN_XPATH = "[@class='field required']//div[@class='control']/select[@class=' required product-custom-option admin__control-select' or @class='image-in-dropdown required product-custom-option admin__control-select add-more-custom-option']";
    const INPUT_OPTION_PATTERN = "//div[@class='control']/input[contains(@class, 'product-custom-option')]";

    const customOptionList: string[] = [];
    const optionSize = await this.getOptionSize();

    for (let i = 1; i <= optionSize; i++) {
      const dropDownRingSize = `${PARENT_CUSTOM_OPTION_BLOCK_XPATH}//div[${i}]${DROP_DOWN_XPATH}`;
      const inputOptionXPath = `${PARENT_CUSTOM_OPTION_BLOCK_XPATH}//div[${i}]${INPUT_OPTION_PATTERN}`;

      if (await this.page.locator(dropDownRingSize).count() > 0) {
        customOptionList.push(dropDownRingSize);
        console.log('DropDownCustomOption added to List');
      } else if (await this.page.locator(inputOptionXPath).count() > 0) {
        customOptionList.push(inputOptionXPath);
        console.log('InputCustomOption added to List');
      }
    }
    return customOptionList;
  }

  async chooseAllCustomOptions(allCustomOptionXpath: string[]) {
    for (const xUndefinedPath of allCustomOptionXpath) {
      const fieldType = this.getResultId(xUndefinedPath);
      switch (fieldType) {
        case this.FieldType.DROP_DOWN_FIELD:
          await this.chooseOptionFromDropDownMenu(xUndefinedPath);
          break;
        case this.FieldType.INPUT_OPTION_FIELD:
          await this.page.fill(xUndefinedPath, 'test');
          break;
        case this.FieldType.NONE_FIELD:
          break;
      }
    }
  }

  private getResultId(xUndefinedPath: string): string {
    if (xUndefinedPath.includes('/select')) {
      return this.FieldType.DROP_DOWN_FIELD;
    } else if (xUndefinedPath.includes('/input')) {
      return this.FieldType.INPUT_OPTION_FIELD;
    } else {
      return this.FieldType.NONE_FIELD;
    }
  }

  private async chooseOptionFromDropDownMenu(dropDownOption: string) {
    const dropdownBirthstone = `${dropDownOption}//option[contains(text(),'Amethyst')]`;
    const dropdownRingSize = `${dropDownOption}//option[2][contains(text(),'Size')]`;

    if (await this.page.locator(dropdownBirthstone).count() > 0) {
      await this.page.locator("xpath=//div[@class ='fieldset']//div[4][@class='field required']//div[@class='dd-select']").click();
      await this.page.locator("xpath=//div[@class ='fieldset']//div[4][@class='field required']//li[2]").click();
    } else if (await this.page.locator(dropdownRingSize).count() > 0) {
      await this.page.selectOption(dropDownOption, { index: 1 });
    }
  }
}

test.describe('Shopping Cart Tests', () => {
  test('should allow me to add product to shopping cart', async ({ page }) => {
    await page.goto('');
    await page.goto('/ties-of-the-heart-birthstone-ring-sterling-silver-prd-ka-cri0069-ws-t1/');
    await CustomOptions.choseCustomOption(page);
    // Implement button click and message check functionalities here
  });
});
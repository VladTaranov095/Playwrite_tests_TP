import { expect, type Locator, type Page} from '@playwright/test';

export class mainPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchInput: Locator;
    readonly elementOfSearching: Locator;


constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1 > button');
    this.searchInput = page.locator('#docsearch-input');
    this.elementOfSearching = page.locator('#docsearch-hits1-item-5 > a > div');
}

async goto() {
    await this.page.goto('https://playwright.dev');
  }
async findElement(word) {
    const orderSent = this.page.getByRole('button', {name: 'Search (Ctrl+K)'});
    await orderSent.waitFor();
    await this.page.keyboard.press('Control+K');
    await this.searchInput.fill(word);
    await this.page.keyboard.press('Enter');
}
async element() {
    let element = this.page.locator('//*[@id="docsearch-recentSearches-item-0"]/a/div/div[2]/span[1]');
    await expect(element).toHaveText('Mouse'); 
}
}




  

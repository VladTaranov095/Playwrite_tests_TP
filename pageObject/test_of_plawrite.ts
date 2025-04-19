import { expect, type Locator, type Page} from '@playwright/test';

export class PlaywrightTests {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchingElements: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#docsearch-input');
        this.searchingElements = page.getByRole('option');
    }
async goto() {
    await this.page.goto('https://playwright.dev');
}
async searchingWord_in_SearchBox(word) {
    const orderSent = this.page.getByRole('button', {name: 'Search (Ctrl+K)'});
    await orderSent.waitFor();
    await this.page.keyboard.press('Control+K');
    await this.searchInput.fill(word);
    await this.page.waitForTimeout(1000);
}
async checkingSearchingElements() {
    const optionElements = this.searchingElements;
    const count: number = await optionElements.count();
    for (let i: number = 0; i < count; i++) {
        const element: Locator = optionElements.nth(i);
        await expect(element).toHaveText(/Click/i);

}
}
async checkingElementsActivity() {
    const optionElements = this.searchingElements;
    const count: number = await optionElements.count();
    for (let i: number = 0; i < count; i++) {
        const element: Locator = optionElements.nth(i);
        await element.hover();
        await expect(element).toHaveAttribute('aria-selected', 'true');
        for (let j: number = 0; j < count; j++) {
            const previousElement: Locator = optionElements.nth(j);
            if (i !== j) {
                await expect(previousElement).toHaveAttribute('aria-selected', 'false');
              }        
        }
    }
}
async checkingElementsActivityByUsingArrow() {
    const optionElements = this.searchingElements;
    const count: number = await optionElements.count();
    for (let i: number = 0; i < count; i++) {
        let element: Locator = optionElements.nth(i);
        await expect(element).toHaveAttribute('aria-selected', 'true');
        await this.page.keyboard.press('ArrowDown');
        await expect(element).toHaveAttribute('aria-selected', 'false');
        element = optionElements.nth(i + 1);
        await expect(element).toHaveAttribute('aria-selected', 'true');
    }
}
}
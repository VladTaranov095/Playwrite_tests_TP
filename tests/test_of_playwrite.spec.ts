import { test, expect, Locator } from '@playwright/test';
import { describe } from 'node:test';


test('Opened the dialog of search by mouses click', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('button', {name: 'Search (Ctrl+K)'}).click();
})

test('Opened the dialog of search by keyboard shortcut', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await page.keyboard.press('Control+K');
})

test('Shut down the dialog window', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('button', {name: 'Search (Ctrl+K)'}).click();
    await page;
    await page.getByRole('searchbox', {name: 'search'}).click();
})
test('Shut down the dialog window by using keyboard', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await page.waitForTimeout(10_000);
    await page.keyboard.press('Control+K');
    const searchDialogLocator = page.locator('#docsearch-input');
    await searchDialogLocator.waitFor({ state: 'visible' });
    await page.waitForTimeout(5_000);
    await page.keyboard.press('Escape');
})

test('Search in the dialog window "Click"', async ({page}) => {
    await page.goto('https://playwright.dev/');
    const orderSent = page.getByRole('button', {name: 'Search (Ctrl+K)'});
    await orderSent.waitFor();
    await page.keyboard.press('Control+K');
    const searchDialogLocator = page.locator('#docsearch-input');
    await searchDialogLocator.waitFor({ state: 'visible' });
    await page.getByRole('searchbox').fill('Click');
    await page.waitForTimeout(5_000);
    const optionElements = page.getByRole('option');
    // const count = await optionElements.count();
    const count: number = await optionElements.count();
    for (let i: number = 0; i < count; i++) {
        const element: Locator = optionElements.nth(i);
        await expect(element).toHaveText(/Click/i);
    }
    // await page.getByRole('generic').filter({ hasText: 'Click' });
})
test('Checking first element for activity and previos for unctivity.', async ({page}) => {
    await page.goto('https://playwright.dev/');
    const orderSent = page.getByRole('button', {name: 'Search (Ctrl+K)'});
    await orderSent.waitFor();
    await page.keyboard.press('Control+K');
    const searchDialogLocator = page.locator('#docsearch-input');
    await searchDialogLocator.waitFor({ state: 'visible' });
    await page.getByRole('searchbox').fill('Click');
    await page.waitForTimeout(5_000);
    const optionElements = page.getByRole('option');
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
    

})
test('Checking that navigation can be carried out by using keyboard.', async ({page}) => {
    await page.goto('https://playwright.dev/');
    const orderSent = page.getByRole('button', {name: 'Search (Ctrl+K)'});
    await orderSent.waitFor();
    await page.keyboard.press('Control+K');
    const searchDialogLocator = page.locator('#docsearch-input');
    await searchDialogLocator.waitFor({ state: 'visible' });
    await page.getByRole('searchbox').fill('Click');
    await page.waitForTimeout(5_000);
    const optionElements = page.getByRole('option');
    const count: number = await optionElements.count();
    for (let i: number = 0; i < count; i++) {
        let element: Locator = optionElements.nth(i);
        await expect(element).toHaveAttribute('aria-selected', 'true');
        await page.keyboard.press('ArrowDown');
        await expect(element).toHaveAttribute('aria-selected', 'false');
        element = optionElements.nth(i + 1);
        await expect(element).toHaveAttribute('aria-selected', 'true');
    }
    

})

// await new Promise(resolve => {
//     setTimeout(() => {
//         resolve();
//     }, 10_000);
//});


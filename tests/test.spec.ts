import { test, expect} from '@playwright/test';
import { mainPage } from '../pageObject/mainPage';

test('', async ({ page }) => {
    const newMainPage = new mainPage(page);
    await newMainPage.goto();
    await newMainPage.findElement('Click');
    await page.waitForTimeout(5_000);
    newMainPage.element;
})
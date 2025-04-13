import { test, expect, Locator } from '@playwright/test';
import { PlaywrightTests } from '../pageObject/test_of_plawrite';

test('Search in the dialog window "Click"', async ({page}) => {
    const newPlaywrightTests = new PlaywrightTests(page);
    await newPlaywrightTests.goto();
    await newPlaywrightTests.searchingWord_in_SearchBox('Click');
    await newPlaywrightTests.checkingSearchingElements();
})

test('Checking first element for activity and previos for unctivity.', async ({page}) => {
    const newPlaywrightTests = new PlaywrightTests(page);
    await newPlaywrightTests.goto();
    await newPlaywrightTests.searchingWord_in_SearchBox('Click');
    await newPlaywrightTests.checkingElementsActivity();
})
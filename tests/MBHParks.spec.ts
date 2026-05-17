import { test, expect } from '@playwright/test';
import { MBHParksPage } from '../Pages/MBHParkspage';

test ('MBH Parks Tab', async ({ page }) => {

    await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');
        
    // Navigate to Profile Page
    await page.goto('https://tg10x.com/profile');

    const mbhParksPage = new MBHParksPage(page);

    await mbhParksPage.goToMBHParksTab();
    await mbhParksPage.assertTabActive();

    const parksToSelect = [
      'Alwal Park',    
      'Indira Park',   
      'KBR National Park', 
    ];

    await mbhParksPage.selectParks(parksToSelect);

    for (const park of parksToSelect) {
      await mbhParksPage.assertParkSelected(park);
    }

    await mbhParksPage.saveProfile();

    await mbhParksPage.assertAllChangesSaved();
    await mbhParksPage.saveProfile();
    await mbhParksPage.assertAllChangesSaved();

});
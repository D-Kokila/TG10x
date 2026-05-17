import { test } from '@playwright/test';

import { LoginPage } from '../pages/Loginpage';

test('Login Test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    // Username & Password directly written here

    await loginPage.login(
        'testuid25@gmail.com',
        'Test@123'
    );
    
    await page.waitForTimeout(3000);
});
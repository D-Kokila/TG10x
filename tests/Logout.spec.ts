import { test, expect } from '@playwright/test';
import { LogoutPage } from '../pages/LogoutPage';

test('Logout functionality', async ({ page }) => {
    
    await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');
        

    // logout
    const logoutPage = new LogoutPage(page);
    await logoutPage.logout();

});
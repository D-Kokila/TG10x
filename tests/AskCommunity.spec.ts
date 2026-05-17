// tests/AskCommunity.spec.ts

import { test } from '@playwright/test';
import { AskCommunityPage } from '../pages/AskCommunityPage';

test('Create Ask Community Post', async ({ page }) => {

    await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');

    const askCommunityPage = new AskCommunityPage(page);
// Navigate to Ask Community
    await askCommunityPage.navigateToAskCommunityPage();

    // Create Community Post
    await askCommunityPage.createCommunityPost();

    // Verify Community Post
    await askCommunityPage.verifyCommunityPost();
});
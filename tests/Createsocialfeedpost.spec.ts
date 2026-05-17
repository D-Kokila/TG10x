import { test } from '@playwright/test';
import { SocialFeedPage } from '../pages/Createsocialfeedpost';

test('Create Social Feed Post', async ({ page }) => {
    await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');


    const socialFeed = new SocialFeedPage(page);

    await socialFeed.navigateToSocialFeed();

    await socialFeed.createSocialFeedPost();
    console.log('Social feed post created successfully');
});
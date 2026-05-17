import { Page,  test } from '@playwright/test';
import { SocialMediaPage } from '../pages/Socialmediapage';

test.describe('Social Media Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');
  });

  test('Verify LinkedIn page', async ({ page }) => {
    const social = new SocialMediaPage(page);

    await social.verifyExternalPage(
      social.linkedinLink,
      'linkedin.com'
    );
  });

  test('Verify Instagram page', async ({ page }) => {
    const social = new SocialMediaPage(page);

    await social.verifyExternalPage(
      social.instagramLink,
      'instagram.com'
    );
  });

  test('Verify Facebook page', async ({ page }) => {
    const social = new SocialMediaPage(page);

    await social.verifyExternalPage(
      social.facebookLink,
      'facebook.com'
    );
  });

  test('Verify YouTube page', async ({ page }) => {
    const social = new SocialMediaPage(page);

    await social.verifyExternalPage(
      social.youtubeLink,
      'youtube.com'
    );
  });

});
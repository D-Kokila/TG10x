// tests/Jobs.spec.ts

import { test } from '@playwright/test';
import { JobsPage } from '../pages/JobsPage';

test('Create Job Post', async ({ page }) => {
  await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');
   
    const jobsPage = new JobsPage(page);
    // Navigate to Jobs
    await jobsPage.navigateToJobsPage();

    // Create Job Post
    await jobsPage.createJobPost();

    // Verify Job Post
    await jobsPage.verifyJobPosted();
});
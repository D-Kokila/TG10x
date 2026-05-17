import { test } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { StartupZonePage } from '../pages/StartupzonePage';

test('Post Job Opportunity', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('testuid25@gmail.com', 'Test@123');

  const postJobPage = new StartupZonePage(page);
  await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');

  await page.goto('https://tg10x.com/opportunities');

  await postJobPage.openPostOpportunity();

  await postJobPage.createJob();

  await postJobPage.createJob();

  await postJobPage.submitJob();
});

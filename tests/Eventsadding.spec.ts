// tests/Events.spec.ts

import { test } from '@playwright/test';
import { EventsPage } from '../pages/EventsaddingPage';

test('Create Event Post', async ({ page }) => {

    await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');

    const eventsPage = new EventsPage(page);

    // Navigate to Events
    await eventsPage.navigateToEventsPage();

    // Create Event
    await eventsPage.createEventPost();

    // Verify Event
    await eventsPage.verifyEventPosted();
});
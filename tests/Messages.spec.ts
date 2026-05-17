import { test } from '@playwright/test';
import { MessagesPage } from '../pages/MessagesPage';

test('Send message to Testid user', async ({ page }) => {

    await page.goto('https://tg10x.com/login');
    await page.fill('input[type="email"]', 'testuid25@gmail.com');
    await page.fill('input[type="password"]', 'Test@123');
    await page.click('button:has-text("Log In")');
    
    // Navigate to Messages
    const messagesPage = new MessagesPage(page);
    await messagesPage.navigateToMessages();

    // Select user
    await messagesPage.selectUser(
        'Testid'
    );

    // Send message
    await messagesPage.sendMessage(
        'I reviewed your company profile include login module'
    );
console.log('Message sent successfully');
});
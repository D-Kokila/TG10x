import { Page, Locator, expect } from '@playwright/test';

export class MessagesPage {

    readonly page: Page;
    readonly messagesTab: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.messagesTab =
            page.locator('span').filter({ hasText: 'Messages' }).first()

        this.messageInput =
            page.getByPlaceholder('Write a message...');

        this.sendButton =
           page.locator("//button[@aria-label='Send message']//*[name()='svg']")
    }

    async navigateToMessages() {

        await this.messagesTab.click();

        await expect(
            this.page.getByRole('heading', { name: 'Messages' })
        ).toBeVisible();
    }

    async selectUser(userName: string) {

        await this.page.getByText(userName, {
            exact: true
        }).click();
    }

    async sendMessage(message: string) {

        await this.messageInput.fill(message);

        await this.sendButton.click();
    }
    
}
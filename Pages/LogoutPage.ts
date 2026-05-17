import { Page, Locator, expect } from '@playwright/test';

export class LogoutPage {

    readonly page: Page;
    readonly logoutButton: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.logoutButton = page.getByRole('button', {
            name: 'Log out'
        });

        this.acceptCookiesButton =
            page.getByRole('button', { name: 'Accept' });
    }

    async logout() {

        // close cookie popup if visible
        if (await this.acceptCookiesButton.isVisible()) {
            await this.acceptCookiesButton.click();
        }

        await this.logoutButton.click();

        // verify logout
        await expect(this.page).toHaveURL('https://tg10x.com/');
    }
}
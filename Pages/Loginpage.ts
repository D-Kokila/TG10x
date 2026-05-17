import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.emailInput = page.locator('input[type="email"]');

        this.passwordInput = page.locator('input[type="password"]');

        this.loginButton = page.locator('button:has-text("Log In")');
    }

    async navigate() {

        await this.page.goto('https://tg10x.com/');
        await this.page.click('text=Join the Ecosystem');
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL('https://tg10x.com/login');
        await this.page.click('text=Login');
    }

    async login(email: string, password: string) {

        await this.emailInput.fill(email);

        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }
 
 
}
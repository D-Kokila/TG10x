import { Page, Locator, expect } from '@playwright/test';

export class SocialFeedPage {

    readonly page: Page;

    readonly socialFeedMenu: Locator;
    readonly postTextbox: Locator;
    readonly postButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.socialFeedMenu =
            page.getByRole('link', { name: 'Social Feed' });

        this.postTextbox =
            page.getByPlaceholder('What do you want to talk about?');

        this.postButton =
            page.getByRole('button', { name: 'Post' });
    }

    async navigateToSocialFeed() {

        await this.socialFeedMenu.click();

    }

    async createSocialFeedPost() {

        const message =
            `👋 Hi everyone! I'm Test User and I just joined BH10X as a Startup founder. Excited to connect with investors, mentors, and fellow entrepreneurs. Looking forward to building together! #introduction #startup`;

        await this.postTextbox.fill(message);

        await expect(this.postButton).toBeEnabled();

        await this.postButton.click();

        await this.page.waitForLoadState('networkidle');
    }
}
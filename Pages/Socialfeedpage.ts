import { Page, Locator, expect }
from '@playwright/test';

export class SocialFeedPage {

    readonly page: Page;

    readonly allTab: Locator;
    readonly trendingTab: Locator;
    readonly followingTab: Locator;

    constructor(page: Page) {

        this.page = page;

        this.allTab =
            page.getByRole('button',
            { name: 'All' });

        this.trendingTab =
            page.getByRole('button',
            { name: 'Trending' });

        this.followingTab =
            page.getByRole('button',
            { name: 'Following' });

    }

    async validateSocialFeedPage() {

        await expect(this.page).toHaveURL('https://tg10x.com/feed');
    }

    async clickAllTab() {

        await this.allTab.click();
        await this.page.waitForTimeout(5000);
    }

    async clickTrendingTab() {

        await this.trendingTab.click();
        await this.page.waitForTimeout(5000);
    }

    async clickFollowingTab() {

        await this.followingTab.click();
        await this.page.waitForTimeout(5000);
    }

    async scrollPage() {

        await this.page.mouse.wheel(0, 1500);
        await this.page.waitForLoadState('networkidle');

    }

    async socialFeedFlow() {

        await this.clickAllTab();

        await this.scrollPage();

        await this.clickTrendingTab();

        await this.scrollPage();

        await this.clickFollowingTab();

        await this.scrollPage();

    }
}
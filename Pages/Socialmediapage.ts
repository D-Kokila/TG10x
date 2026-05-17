import { expect, Locator, Page, BrowserContext } from '@playwright/test';

export class SocialMediaPage {
  readonly page: Page;
  readonly context: BrowserContext;

  readonly linkedinLink: Locator;
  readonly instagramLink: Locator;
  readonly facebookLink: Locator;
  readonly youtubeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();

    this.linkedinLink = page.getByRole('link', { name: 'LinkedIn' });
    this.instagramLink = page.getByRole('link', { name: 'Instagram' });
    this.facebookLink = page.getByRole('link', { name: 'Facebook' });
    this.youtubeLink = page.getByRole('link', { name: 'YouTube' });
  }

  async verifyExternalPage(link: Locator, expectedUrl: string) {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      link.click(),
    ]);

    await newPage.waitForLoadState();

    await expect(newPage).toHaveURL(new RegExp(expectedUrl));
  }
}
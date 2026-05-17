// pages/AskCommunityPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class AskCommunityPage {

    readonly page: Page;

    readonly askCommunityTab: Locator;
    readonly questionInput: Locator;
    readonly postButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // Ask Community sidebar tab
        this.askCommunityTab =
            page.getByRole('link', {
                name: 'Ask Community'
            }).first();

        // Community question textbox
        this.questionInput =
            page.getByPlaceholder(
                'Ask a question or request help from the ecosystem...'
            );

        // Post button
        this.postButton =
            page.getByRole('button', {
                name: 'Post'
            });
    }

    async navigateToAskCommunityPage() {

        await this.askCommunityTab.waitFor({
            state: 'visible'
        });

        await this.askCommunityTab.click();

    }
    async createCommunityPost() {

        await this.questionInput.fill(
            'I am thinking of building a product. What are your biggest frustrations with the current alternatives? Does anyone else deal with this?'
        );

        await this.postButton.click();
    }

    async verifyCommunityPost() {

        await expect(
            this.page.getByText(
                'I am thinking of building a product. What are your biggest frustrations with the current alternatives? Does anyone else deal with this?'
            )
        ).toBeVisible();
    }
}
// pages/EventsPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class EventsPage {

    readonly page: Page;

    readonly eventsTab: Locator;
    readonly eventPostInput: Locator;
    readonly postButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // FIXED EVENTS TAB LOCATOR
        this.eventsTab =
            page.getByRole('link', {
                name: 'Events'
            }).first();

        // Event textbox
        this.eventPostInput =
            page.getByPlaceholder(
                'Share an upcoming event, meetup, or workshop...'
            );

        // Post button
        this.postButton =
            page.getByRole('button', {
                name: 'Post'
            });
    }

    async navigateToEventsPage() {

        await this.eventsTab.waitFor({
            state: 'visible'
        });

        await this.eventsTab.click();

    }

    async createEventPost() {

        await this.eventPostInput.fill(
            'Workshop on "AI Automation" happening on June 1st, 2026'
        );

        await this.postButton.click();
    }

    async verifyEventPosted() {

        await expect(
            this.page.getByText(
                'Workshop on "AI Automation" happening on June 1st, 2026'
            )
        ).toBeVisible();
    }
}
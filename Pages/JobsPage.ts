import { Page, Locator, expect } from '@playwright/test';

export class JobsPage {

    readonly page: Page;

    readonly jobsTab: Locator;
    readonly jobPostInput: Locator;
    readonly postButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // Jobs sidebar tab
        this.jobsTab =
            page.getByRole('link', {
                name: 'Jobs'
            }).first();

        // Job post textbox
        this.jobPostInput =
            page.getByPlaceholder(
                'Post a job opening or hiring update...'
            );

        // Post button
        this.postButton =
            page.getByRole('button', {
                name: 'Post'
            });
    }

    async navigateToJobsPage() {

        await this.jobsTab.waitFor({
            state: 'visible'
        });

        await this.jobsTab.click();
    }

    async createJobPost() {

        await this.jobPostInput.fill(
            'Hiring for QA Automation Engineer DM me to know more about it'
        );

        await this.postButton.click();
    }

    async verifyJobPosted() {

        await expect(
            this.page.getByText(
                'Hiring for QA Automation Engineer DM me to know more about it'
            )
        ).toBeVisible();
    }
}
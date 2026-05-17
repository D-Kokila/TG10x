import { expect, Locator, Page } from '@playwright/test';

export class StartupZonePage {
  readonly page: Page;
  readonly typeDropdown: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly sectorDropdown: Locator;
  readonly subSectorDropdown: Locator;
  readonly locationInput: Locator;
  readonly compensationInput: Locator;
  readonly requirementsInput: Locator;
  readonly tagsInput: Locator;
  readonly applicationUrlInput: Locator;
  readonly postButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Post Job Form
    this.typeDropdown = page.locator('select').first();

    this.titleInput = page.locator('[name="title"]')

    this.descriptionInput = page.locator('textarea[name="description"]')

    this.sectorDropdown = page.getByRole('button', { name: /Select Sectors\.\.\./i }).first();

    this.subSectorDropdown = page.getByText('Select Sub-Sectors...').first();

    this.locationInput = page.locator('input[placeholder*="Bengaluru"]');

    this.compensationInput = page.locator('input[placeholder*="LPA"]');

    this.requirementsInput = page.locator('input[placeholder*="React"]');

    this.tagsInput = page.locator('input[placeholder*="remote"]');

    this.applicationUrlInput = page.getByRole('textbox', { name: 'https://... (official link where users can apply)' })

    this.postButton = page.getByRole('button', { name: 'Post Listing' })
  }
  async navigateToStartupZone() {
    await this.page.locator("a[class='_navItem_wod8s_122 _active_wod8s_142'] span[class='_navText_wod8s_157']").click();
    await this.page.getByText('Post Opportunity', { exact: true }).click();
  
}

async openPostOpportunity() {
  const postOpportunityButton = this.page.getByRole('button', {
    name: 'Post Opportunity',
    exact: true
  });

  await postOpportunityButton.waitFor({
    state: 'visible'
  });

  await postOpportunityButton.click();
}
  

  async selectOption(dropdown: Locator, option: string) {
    // Prefer native <select> when present
    try {
      const tag = await dropdown.evaluate((el) => el.tagName && el.tagName.toLowerCase());
      if (tag === 'select') {
        await dropdown.selectOption({ label: option });
        return;
      }
    } catch (e) {
      // ignore evaluation errors and fall through to custom handling
    }

    // Click to open custom dropdown and try multiple selection strategies
    await dropdown.click();

    // 1) Scoped option inside the dropdown element
    const scoped = dropdown.locator(`text="${option}"`).first();
    if (await scoped.count() > 0) {
      await expect(scoped).toBeVisible({ timeout: 5000 });
      await scoped.click();
      return;
    }

    // 2) Common popup containers (listbox/menu/custom dropdowns)
    const popup = this.page
      .locator('[role="listbox"], [role="menu"], [class*="menu"], [class*="dropdown"], [data-testid*="menu"], .rc-menu, .dropdown-menu')
      .filter({ hasText: option })
      .first();
    if (await popup.count() > 0) {
      const item = popup.locator(`text="${option}"`).first();
      await expect(item).toBeVisible({ timeout: 5000 });
      await item.click();
      return;
    }

    // 3) Fallback: page-level exact text
    const pageOption = this.page.getByText(option, { exact: true }).first();
    await expect(pageOption).toBeVisible({ timeout: 10000 });
    await pageOption.click();
  }
   async paste(locator: Locator, value: string) {
  await locator.fill(value);
}

async selectCustomOption(dropdown: Locator, option: string) {
  await this.selectOption(dropdown, option);
}
  async createJob() {
    await this.selectOption(this.typeDropdown, 'Job');

    await this.paste(this.titleInput, 'Senior Playwright Automation Engineer');

    await this.paste(
      this.descriptionInput,
      'Looking for Playwright Automation Engineer with TypeScript experience.'
    );

    await this.selectCustomOption(this.sectorDropdown, 'FinTech');

    await this.selectCustomOption(this.subSectorDropdown, 'InsurTech');

    await this.paste(this.locationInput, 'Hyderabad / Remote');

    await this.paste(this.compensationInput, '20 LPA');

    await this.paste(
      this.requirementsInput,
      'Playwright, TypeScript, Automation, 3+ years'
    );

    await this.paste(this.tagsInput, 'remote,full-time');

    await this.paste(
      this.applicationUrlInput,
      'https://example.com/apply'
    );
  }

  async submitJob() {
    await this.postButton.click();
  }
}

import { type Page, type Locator, expect } from '@playwright/test';

export class MBHParksPage {
  readonly page: Page;
  readonly sidebarProfileLink: Locator;
  readonly mbhParksTab: Locator;
  readonly parksContainer: Locator;
  readonly parkCards: Locator;       
  readonly parkCheckboxes: Locator;  
  readonly saveProfileButton: Locator;
  readonly allChangesSavedLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarProfileLink  = page.getByRole('link', { name: 'Profile' });
    this.mbhParksTab         = page.getByRole('tab',  { name: 'MBH Parks' });
    this.parksContainer  = page.locator('[class*="park"], [data-testid*="park"]').first();
    this.parkCards = page.locator(
      '[class*="park-card"], [class*="parkCard"], [data-testid*="park-item"], ' +
      '[class*="card"]:has(input[type="checkbox"]), ' +
      'ul li:has(input[type="checkbox"]), ' +
      '[role="listitem"]:has(input[type="checkbox"])'
    );

    // Checkboxes within park cards
    this.parkCheckboxes = page.locator(
      '[class*="park"] input[type="checkbox"], ' +
      '[data-testid*="park"] input[type="checkbox"]'
    );

    // Footer
    this.saveProfileButton     = page.getByRole('button', { name: /save profile/i });
    this.allChangesSavedLabel  = page.locator('text=All changes saved');
  }

  async goToMBHParksTab() {
    await this.sidebarProfileLink.click();
    await this.mbhParksTab.click();
    await this.waitForParksToLoad();
  }

  async waitForParksToLoad() {
    // Wait for skeleton/shimmer elements to disappear
    await this.page.waitForFunction(() => {
      const skeletons = document.querySelectorAll(
        '[class*="skeleton"], [class*="shimmer"], [class*="placeholder"], [class*="loading"]'
      );
      return skeletons.length === 0;
    }, { timeout: 15_000 });

    // Alternatively wait for at least one real park item to appear
    await this.page.waitForSelector(
      'input[type="checkbox"], [role="checkbox"], [class*="park"]',
      { timeout: 10_000 }
    );
  }

  async selectParks(parkNames: string[]) {
    await this.waitForParksToLoad();

    for (const parkName of parkNames) {
      // Find the element that contains the park name text
      const parkItem = this.page
        .locator('li, [role="listitem"], [class*="card"], [class*="item"], label')
        .filter({ hasText: new RegExp(parkName, 'i') })
        .first();

      await parkItem.waitFor({ state: 'visible', timeout: 8_000 });

      // Try checkbox inside the card first
      const checkbox = parkItem.locator('input[type="checkbox"], [role="checkbox"]').first();
      const hasCheckbox = await checkbox.count() > 0;

      if (hasCheckbox) {
        const isChecked =
          (await checkbox.isChecked().catch(() => false)) ||
          (await checkbox.getAttribute('aria-checked')) === 'true';

        if (!isChecked) {
          await checkbox.click();
        }
      } else {
        // Fallback: the whole card/label is clickable
        const isSelected =
          (await parkItem.getAttribute('aria-selected')) === 'true' ||
          (await parkItem.getAttribute('data-selected')) === 'true' ||
          (await parkItem.getAttribute('class') || '').includes('selected') ||
          (await parkItem.getAttribute('class') || '').includes('active');

        if (!isSelected) {
          await parkItem.click();
        }
      }

      console.log(`✅ Park selected: ${parkName}`);
    }
  }

  async selectParksByIndex(indexes: number[]) {
    await this.waitForParksToLoad();

    const allCheckboxes = this.page.locator('input[type="checkbox"]');
    const count = await allCheckboxes.count();
    console.log(`Total park checkboxes found: ${count}`);

    for (const idx of indexes) {
      if (idx >= count) {
        throw new Error(`Park index ${idx} out of range. Only ${count} parks found.`);
      }
      const checkbox = allCheckboxes.nth(idx);
      const isChecked = await checkbox.isChecked().catch(() => false);
      if (!isChecked) {
        await checkbox.click();
      }
      console.log(`✅ Park at index ${idx} selected`);
    }
  }

  /** Clicks Save Profile if enabled, otherwise verifies auto-save state. */
  async saveProfile() {
    if (await this.saveProfileButton.isDisabled()) {
      await expect(this.allChangesSavedLabel).toBeVisible({ timeout: 10_000 });
      return;
    }

    await expect(this.saveProfileButton).toBeEnabled({ timeout: 10_000 });
    await this.saveProfileButton.click();
    await expect(this.allChangesSavedLabel).toBeVisible({ timeout: 10_000 });
  }

  // ── Assertions ───────────────────────────────────────────────────────────────

  /** Asserts the MBH Parks tab is active */
  async assertTabActive() {
    await expect(this.mbhParksTab).toHaveAttribute('aria-selected', 'true');
  }

  /** Asserts "All changes saved" confirmation is visible after save */
  async assertAllChangesSaved() {
    await expect(this.allChangesSavedLabel).toBeVisible({ timeout: 10_000 });
  }

  /**
   * Asserts a specific park is checked/selected by name.
   * @param parkName - park label text (case-insensitive)
   */
  async assertParkSelected(parkName: string) {
    const parkItem = this.page
      .locator('li, [role="listitem"], [class*="card"], [class*="item"], label')
      .filter({ hasText: new RegExp(parkName, 'i') })
      .first();

    const checkbox = parkItem.locator('input[type="checkbox"], [role="checkbox"]').first();
    const hasCheckbox = await checkbox.count() > 0;

    if (hasCheckbox) {
      await expect(checkbox).toBeChecked();
    } else {
      const cls = await parkItem.getAttribute('class') ?? '';
      expect(cls).toMatch(/selected|active/i);
    }
  }
}
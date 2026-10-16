import { test, expect } from '@playwright/test';

test('secure page opens without logging in again', async ({ page }) => {
  await page.goto('/secure');
  await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
});
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.LOGIN_USER!, process.env.LOGIN_PASS!);
  await expect(page).toHaveURL(/\/secure/);
  await page.context().storageState({ path: authFile });
});
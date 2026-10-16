import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const USER = process.env.LOGIN_USER!;
const PASS = process.env.LOGIN_PASS!;

test.describe('Login page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('page loads with all fields', async () => {
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('valid login goes to secure area', async ({ page }) => {
    await loginPage.login(USER, PASS);
    await expect(page).toHaveURL(/\/secure/);
    await loginPage.expectMessage('You logged into a secure area!');
  });

  test('wrong password shows error', async ({ page }) => {
    await loginPage.login(USER, 'wrongpass');
    await expect(page).toHaveURL(/\/login/);
    await loginPage.expectMessage('Your password is invalid!');
  });

  test('wrong username shows error', async () => {
    await loginPage.login('nobody', PASS);
    await loginPage.expectMessage('Your username is invalid!');
  });

  test('empty fields show error', async () => {
    await loginPage.login('', '');
    await loginPage.expectMessage('Your username is invalid!');
  });

  test('password field is masked', async () => {
    await expect(loginPage.password).toHaveAttribute('type', 'password');
  });

  test('logout works', async ({ page }) => {
    await loginPage.login(USER, PASS);
    await page.getByRole('link', { name: 'Logout' }).click();
    await loginPage.expectMessage('You logged out of the secure area!');
  });
});
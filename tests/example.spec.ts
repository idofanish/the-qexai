import { test, expect } from '@playwright/test';

test('homepage has The QexAI.com title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle("Home:The QexAI.com")
});

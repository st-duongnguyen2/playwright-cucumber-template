import { test, expect } from '@playwright/test';

const interviewURL = '/apply/E884L';

const candidateData = [
  { lastname: '01' },
  { lastname: '02' },
  { lastname: '03' },
  { lastname: '04' },
  { lastname: '05' },
  { lastname: '06' },
  { lastname: '07' },
  { lastname: '08' },
  { lastname: '09' },
  { lastname: '10' },
  { lastname: '11' },
];

candidateData.forEach(({ lastname }) => {
  test(`testing with candidate ${lastname}`, async ({ page }) => {
    await page.goto(interviewURL);

    // Register
    await test.step('Register candidate', async () => {
      await page.locator('input[name="firstName"]').fill('candidate');
      await page.locator('input[name="lastName"]').fill(lastname);
      await page.locator('span.MuiIconButton-label input').check();
      await page.locator('button[type="submit"]').click();
    });

    // Interview
    await test.step('Candidate interview', async () => {
      await page.waitForURL('/');
      await page.locator('span.MuiButton-label').click();
      await page.waitForURL('/device/checking');
      await page.locator('span.MuiButton-label').click();
      await page.waitForURL('/interview/section/*/question/*/intro');
      await page.locator('span.MuiButton-label').click();
      await page.waitForURL('/interview/section/*/question/*/answer');
      await page.locator('textarea').fill('This is my text answer.');
      expect(page.locator('span.MuiButton-label')).toBeEnabled();
      await page.locator('span.MuiButton-label').click();
      expect(page.locator('#alert-dialog-title')).toBeVisible();
      await page.getByRole('button', { name: 'YES' }).click();
      await page.waitForURL('/interview/completed');
    });
  });
});

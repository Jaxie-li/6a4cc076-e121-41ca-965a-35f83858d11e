import { test, expect } from '@playwright/test';

test.describe('Current Application State', () => {
  test('check what is currently running', async ({ page }) => {
    await page.goto('/');
    
    // Take a screenshot to see what's currently displayed
    await page.screenshot({ path: 'current-app-state.png', fullPage: true });
    
    // Log the page title
    const title = await page.title();
    console.log('Current page title:', title);
    
    // Log visible text content
    const textContent = await page.textContent('body');
    console.log('Page content:', textContent);
    
    // Check if it's the default React app
    const hasReactLogo = await page.locator('.App-logo').count();
    console.log('Has React logo:', hasReactLogo > 0);
    
    // Check if DrawingBoard components exist
    const hasCanvas = await page.locator('canvas').count();
    console.log('Has canvas:', hasCanvas > 0);
    
    const hasBrushSelector = await page.locator('.ant-radio-group').count();
    console.log('Has brush selector:', hasBrushSelector > 0);
    
    const hasColorPicker = await page.getByText('Color').count();
    console.log('Has color picker:', hasColorPicker > 0);
  });
});
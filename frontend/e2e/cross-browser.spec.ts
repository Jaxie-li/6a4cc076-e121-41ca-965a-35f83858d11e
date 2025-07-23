import { test, expect } from '@playwright/test';

test.describe('Cross-Browser Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render correctly across all browsers', async ({ page, browserName }) => {
    await expect(page).toHaveTitle(/Drawing Board/i);
    await expect(page.locator('canvas')).toBeVisible();
    
    console.log(`Testing on browser: ${browserName}`);
    
    await expect(page.locator('.app-header')).toBeVisible();
    await expect(page.locator('.app-sider')).toBeVisible();
    await expect(page.locator('.app-content')).toBeVisible();
  });

  test('should handle canvas drawing in all browsers', async ({ page, browserName }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    await page.mouse.move(box.x + 100, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();
    
    await page.waitForTimeout(100);
    
    const screenshot = await canvas.screenshot();
    expect(screenshot).toBeTruthy();
  });

  test('should handle color picker in all browsers', async ({ page, browserName }) => {
    const hexInput = page.locator('input[placeholder*="HEX"]');
    await hexInput.fill('#FF5733');
    await hexInput.press('Enter');
    
    await expect(hexInput).toHaveValue('#FF5733');
    
    const presetColors = page.locator('.preset-color');
    await presetColors.first().click();
    await page.waitForTimeout(100);
  });

  test('should handle sliders correctly in all browsers', async ({ page, browserName }) => {
    const brushSizeSlider = page.locator('.ant-slider').first();
    const opacitySlider = page.locator('.ant-slider').nth(1);
    
    await expect(brushSizeSlider).toBeVisible();
    await expect(opacitySlider).toBeVisible();
    
    const brushSizeHandle = brushSizeSlider.locator('.ant-slider-handle');
    const opacityHandle = opacitySlider.locator('.ant-slider-handle');
    
    await brushSizeHandle.dragTo(brushSizeSlider, {
      targetPosition: { x: 100, y: 0 }
    });
    
    await opacityHandle.dragTo(opacitySlider, {
      targetPosition: { x: 50, y: 0 }
    });
  });

  test('should handle export functionality in all browsers', async ({ page, browserName }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.mouse.down();
    await page.mouse.move(box.x + 150, box.y + 150);
    await page.mouse.up();
    
    const pngButton = page.getByText('Export as PNG');
    const jpegButton = page.getByText('Export as JPEG');
    
    await expect(pngButton).toBeVisible();
    await expect(jpegButton).toBeVisible();
    
    if (browserName !== 'webkit') {
      const downloadPromise = page.waitForEvent('download');
      await pngButton.click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/\.png$/);
    }
  });

  test('should handle touch events on mobile browsers', async ({ page, browserName, isMobile }) => {
    if (isMobile) {
      const canvas = page.locator('canvas');
      const box = await canvas.boundingBox();
      if (!box) throw new Error('Canvas not found');
      
      await page.touchscreen.tap(box.x + 100, box.y + 100);
      
      const touches = [
        { x: box.x + 100, y: box.y + 100 },
        { x: box.x + 150, y: box.y + 150 },
        { x: box.x + 200, y: box.y + 200 }
      ];
      
      for (const touch of touches) {
        await page.touchscreen.tap(touch.x, touch.y);
        await page.waitForTimeout(50);
      }
    }
  });

  test('should maintain layout integrity across viewports', async ({ page, browserName }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop HD' },
      { width: 1366, height: 768, name: 'Laptop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);
      
      await expect(page.locator('canvas')).toBeVisible();
      
      const screenshot = await page.screenshot({
        fullPage: true
      });
      
      expect(screenshot).toBeTruthy();
    }
  });

  test('should handle keyboard shortcuts consistently', async ({ page, browserName }) => {
    await page.keyboard.press('Control+Z');
    await page.waitForTimeout(100);
    
    await page.keyboard.press('Control+Y');
    await page.waitForTimeout(100);
    
    await page.keyboard.press('Control+S');
    await page.waitForTimeout(100);
  });
});
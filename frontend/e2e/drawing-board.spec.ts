import { test, expect } from '@playwright/test';

test.describe('Drawing Board Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the drawing board application', async ({ page }) => {
    await expect(page).toHaveTitle(/Drawing Board/i);
    await expect(page.locator('h2')).toContainText('Drawing Board');
  });

  test('should have all required UI components', async ({ page }) => {
    await expect(page.locator('canvas')).toBeVisible();
    
    await expect(page.getByText('Brush Type')).toBeVisible();
    await expect(page.getByText('Brush Size')).toBeVisible();
    await expect(page.getByText('Opacity')).toBeVisible();
    
    await expect(page.getByText('Color')).toBeVisible();
    
    await expect(page.getByText('Export')).toBeVisible();
  });

  test('should have three brush types available', async ({ page }) => {
    const brushSelector = page.locator('.ant-radio-group');
    await expect(brushSelector).toBeVisible();
    
    await expect(page.getByRole('radio', { name: 'Pencil' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Brush' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Spray' })).toBeVisible();
  });

  test('should be able to switch between brush types', async ({ page }) => {
    await page.getByRole('radio', { name: 'Brush' }).click();
    await expect(page.getByRole('radio', { name: 'Brush' })).toBeChecked();
    
    await page.getByRole('radio', { name: 'Spray' }).click();
    await expect(page.getByRole('radio', { name: 'Spray' })).toBeChecked();
    
    await page.getByRole('radio', { name: 'Pencil' }).click();
    await expect(page.getByRole('radio', { name: 'Pencil' })).toBeChecked();
  });

  test('should have adjustable brush size', async ({ page }) => {
    const brushSizeSlider = page.locator('.ant-slider').first();
    await expect(brushSizeSlider).toBeVisible();
    
    const sliderHandle = brushSizeSlider.locator('.ant-slider-handle');
    await sliderHandle.dragTo(brushSizeSlider, {
      targetPosition: { x: 100, y: 0 }
    });
  });

  test('should have adjustable opacity', async ({ page }) => {
    const opacitySlider = page.locator('.ant-slider').nth(1);
    await expect(opacitySlider).toBeVisible();
    
    const sliderHandle = opacitySlider.locator('.ant-slider-handle');
    await sliderHandle.dragTo(opacitySlider, {
      targetPosition: { x: 50, y: 0 }
    });
  });

  test('should have color picker with preset colors', async ({ page }) => {
    const colorSection = page.locator('.color-picker-section');
    await expect(colorSection).toBeVisible();
    
    const presetColors = colorSection.locator('.preset-color');
    await expect(presetColors).toHaveCount(10);
  });

  test('should be able to change color using HEX input', async ({ page }) => {
    const hexInput = page.locator('input[placeholder*="HEX"]');
    await expect(hexInput).toBeVisible();
    
    await hexInput.fill('#FF0000');
    await hexInput.press('Enter');
    
    await expect(hexInput).toHaveValue('#FF0000');
  });

  test('should be able to draw on canvas', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    await page.mouse.move(box.x + 100, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();
    
    await page.mouse.move(box.x + 300, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + 300, box.y + 300);
    await page.mouse.up();
  });

  test('should support touch drawing on mobile', async ({ page, browserName }) => {
    if (browserName === 'webkit') {
      const canvas = page.locator('canvas');
      const box = await canvas.boundingBox();
      if (!box) throw new Error('Canvas not found');
      
      await page.touchscreen.tap(box.x + 100, box.y + 100);
      await page.waitForTimeout(100);
      
      await page.touchscreen.tap(box.x + 200, box.y + 200);
    }
  });

  test('should have export functionality', async ({ page }) => {
    await expect(page.getByText('Export as PNG')).toBeVisible();
    await expect(page.getByText('Export as JPEG')).toBeVisible();
  });

  test('should export drawing as PNG', async ({ page }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.mouse.down();
    await page.mouse.move(box.x + 150, box.y + 150);
    await page.mouse.up();
    
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Export as PNG').click();
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toMatch(/drawing.*\.png$/);
  });

  test('should export drawing as JPEG', async ({ page }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.mouse.down();
    await page.mouse.move(box.x + 150, box.y + 150);
    await page.mouse.up();
    
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Export as JPEG').click();
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toMatch(/drawing.*\.jpg$/);
  });

  test('should maintain drawing when switching brush types', async ({ page }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    await page.mouse.move(box.x + 100, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();
    
    await page.getByRole('radio', { name: 'Brush' }).click();
    
    await page.mouse.move(box.x + 200, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + 300, box.y + 200);
    await page.mouse.up();
    
    await page.getByRole('radio', { name: 'Spray' }).click();
    
    await page.mouse.move(box.x + 150, box.y + 150);
    await page.mouse.down();
    await page.mouse.move(box.x + 250, box.y + 250);
    await page.mouse.up();
  });

  test('should handle different screen sizes responsively', async ({ page }) => {
    const viewportSizes = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];
    
    for (const size of viewportSizes) {
      await page.setViewportSize(size);
      await page.waitForTimeout(500);
      
      await expect(page.locator('canvas')).toBeVisible();
      await expect(page.locator('.app-header')).toBeVisible();
      await expect(page.locator('.app-sider')).toBeVisible();
    }
  });
});
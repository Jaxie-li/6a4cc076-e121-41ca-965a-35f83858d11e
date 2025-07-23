import { test, expect } from '@playwright/test';

test.describe('Drawing Board Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle rapid drawing without lag', async ({ page }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    const startTime = Date.now();
    
    for (let i = 0; i < 10; i++) {
      await page.mouse.move(box.x + 50 + i * 30, box.y + 50);
      await page.mouse.down();
      
      for (let j = 0; j < 20; j++) {
        await page.mouse.move(box.x + 50 + i * 30, box.y + 50 + j * 10);
      }
      
      await page.mouse.up();
    }
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(5000);
  });

  test('should handle large canvas without performance issues', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    const points = 50;
    for (let i = 0; i < points; i++) {
      const x = Math.random() * box.width;
      const y = Math.random() * box.height;
      
      await page.mouse.move(box.x + x, box.y + y);
      await page.mouse.down();
      await page.mouse.move(box.x + x + 50, box.y + y + 50);
      await page.mouse.up();
    }
  });

  test('should handle continuous drawing smoothly', async ({ page }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    await page.mouse.move(box.x + 100, box.y + 100);
    await page.mouse.down();
    
    const steps = 100;
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const x = 250 + Math.cos(angle) * 100;
      const y = 250 + Math.sin(angle) * 100;
      
      await page.mouse.move(box.x + x, box.y + y);
      await page.waitForTimeout(10);
    }
    
    await page.mouse.up();
  });

  test('should maintain performance with different brush sizes', async ({ page }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    const brushSizes = [1, 10, 30, 50];
    
    for (const size of brushSizes) {
      const brushSizeSlider = page.locator('.ant-slider').first();
      const sliderBox = await brushSizeSlider.boundingBox();
      if (!sliderBox) continue;
      
      const targetX = sliderBox.x + (size / 50) * sliderBox.width;
      await page.mouse.click(targetX, sliderBox.y + sliderBox.height / 2);
      
      await page.mouse.move(box.x + 100, box.y + 100);
      await page.mouse.down();
      await page.mouse.move(box.x + 300, box.y + 300);
      await page.mouse.up();
      
      await page.waitForTimeout(100);
    }
  });

  test('should handle memory efficiently during long sessions', async ({ page }) => {
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas not found');
    
    const metrics = await page.evaluate(() => {
      if ('memory' in performance) {
        return {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize
        };
      }
      return null;
    });
    
    for (let session = 0; session < 5; session++) {
      for (let i = 0; i < 20; i++) {
        await page.mouse.move(
          box.x + Math.random() * box.width,
          box.y + Math.random() * box.height
        );
        await page.mouse.down();
        await page.mouse.move(
          box.x + Math.random() * box.width,
          box.y + Math.random() * box.height
        );
        await page.mouse.up();
      }
      
      await page.waitForTimeout(500);
    }
    
    if (metrics) {
      const finalMetrics = await page.evaluate(() => {
        if ('memory' in performance) {
          return {
            usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
            totalJSHeapSize: (performance as any).memory.totalJSHeapSize
          };
        }
        return null;
      });
      
      if (finalMetrics) {
        const memoryIncrease = finalMetrics.usedJSHeapSize - metrics.usedJSHeapSize;
        const percentIncrease = (memoryIncrease / metrics.usedJSHeapSize) * 100;
        
        expect(percentIncrease).toBeLessThan(200);
      }
    }
  });
});
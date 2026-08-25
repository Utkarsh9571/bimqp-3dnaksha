const puppeteer = require('puppeteer');

(async () => {
  console.log('🔍 Verifying Toggle Position and 3D Canvas Interactivity...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to showcase section
    await page.evaluate(async () => {
      const showcase = document.getElementById('showcase');
      if (showcase) {
        showcase.scrollIntoView({ behavior: 'instant' });
        window.scrollBy({ top: 1200, behavior: 'instant' });
      }
    });
    await new Promise(r => setTimeout(r, 1500));

    const check = await page.evaluate(() => {
      const btn = document.querySelector('button[title*="Toggle BIM Wireframe"]');
      const canvas = document.querySelector('#showcase canvas');
      if (!btn || !canvas) return { found: false };

      const btnRect = btn.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      return {
        found: true,
        buttonText: btn.innerText.trim(),
        buttonTop: Math.round(btnRect.top),
        canvasHeight: Math.round(canvasRect.height),
        canvasBottom: Math.round(canvasRect.bottom),
        isPositionedAtBottom: btnRect.top > (canvasRect.top + canvasRect.height * 0.75)
      };
    });

    console.log('Toggle position check:', check);

    // Test clicking the toggle button
    console.log('Testing toggle button click...');
    await page.click('button[title*="Toggle BIM Wireframe"]');
    await new Promise(r => setTimeout(r, 500));

    const textAfterClick = await page.evaluate(() => {
      const btn = document.querySelector('button[title*="Toggle BIM Wireframe"]');
      return btn ? btn.innerText.trim() : '';
    });
    console.log('Button text after toggle:', textAfterClick);

    // Capture a verification screenshot of the BIM viewer with bottom toggle
    await page.screenshot({ path: 'scratch/bim_viewer_bottom_toggle.png' });
    console.log('✅ Screenshot saved to scratch/bim_viewer_bottom_toggle.png');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();

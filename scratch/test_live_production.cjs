const puppeteer = require('puppeteer');

(async () => {
  console.log('🌐 Connecting to LIVE production site https://3dnaksha.com/ ...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    const consoleLogs = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else {
        consoleLogs.push(msg.text());
      }
    });
    page.on('pageerror', err => consoleErrors.push(err.toString()));

    await page.setViewport({ width: 1280, height: 900 });
    await page.goto('https://3dnaksha.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    console.log('\n--- LIVE SITE REPORT: https://3dnaksha.com/ ---');
    console.log('  Total console errors caught:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('  ❌ Live Console Errors:', consoleErrors);
    } else {
      console.log('  ✅ Zero console errors on initial load!');
    }

    // Scroll to BIM Viewer on live site
    console.log('\n--- Scrolling to BIM Showcase on Live Site ---');
    const liveMetrics = await page.evaluate(async () => {
      const showcase = document.getElementById('showcase');
      if (!showcase) return { showcaseFound: false };

      showcase.scrollIntoView({ behavior: 'instant' });
      await new Promise(r => setTimeout(r, 1000));

      // Scroll into the 3D viewer portion
      window.scrollBy({ top: 1200, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 1500));

      const canvas = document.querySelector('#showcase canvas');
      return {
        showcaseFound: true,
        canvasFound: !!canvas,
        pointerEvents: canvas ? window.getComputedStyle(canvas).pointerEvents : null,
        touchAction: canvas ? window.getComputedStyle(canvas).touchAction : null
      };
    });

    console.log('  - Showcase container found on live:', liveMetrics.showcaseFound);
    console.log('  - 3D Canvas found on live:', liveMetrics.canvasFound);
    console.log('  - Canvas pointerEvents:', liveMetrics.pointerEvents);
    console.log('  - Canvas touchAction:', liveMetrics.touchAction);

    // Test dragging on the live canvas
    const canvasElement = await page.$('#showcase canvas');
    if (canvasElement) {
      const box = await canvasElement.boundingBox();
      if (box) {
        console.log(`  - Canvas bounding box on live: x=${box.x}, y=${box.y}, w=${box.width}, h=${box.height}`);
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2 + 50, { steps: 10 });
        await page.mouse.up();
        await new Promise(r => setTimeout(r, 500));
        console.log('  - Drag gesture simulated on live canvas.');
      }
    }

    // Check errors after drag
    const webglErrors = consoleErrors.filter(e => e.includes('glTexStorage2D') || e.includes('immutable'));
    console.log('  - "glTexStorage2D: Texture is immutable" errors on live:', webglErrors.length > 0 ? `❌ ${webglErrors}` : '✅ NONE');

  } catch (err) {
    console.error('❌ Live test error:', err);
  } finally {
    await browser.close();
  }
})();

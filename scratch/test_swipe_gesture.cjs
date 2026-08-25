const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Running Real Touch Swipe Simulation on BIM Canvas...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set mobile viewport with touch enabled
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });

    console.log('📱 Loading http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 20000 });

    // Scroll down until the BIM canvas is centered in the viewport
    await page.evaluate(() => {
      const showcase = document.getElementById('showcase');
      if (showcase) {
        showcase.scrollIntoView({ behavior: 'instant' });
      }
    });

    // Wait for the canvas to render
    await page.waitForSelector('#showcase canvas', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1200));

    // Get canvas bounding box in viewport coordinates
    const canvasBox = await page.evaluate(() => {
      const canvas = document.querySelector('#showcase canvas');
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        initialScrollY: window.scrollY
      };
    });

    console.log('📍 BIM Canvas located at center point:', { x: canvasBox.x, y: canvasBox.y });
    console.log('📜 Initial window.scrollY before swipe:', canvasBox.initialScrollY);

    const startX = canvasBox.x;
    const startY = Math.min(canvasBox.y + 150, 700);
    const endY = startY - 350; // 350px upward swipe to scroll page down

    console.log(`👆 Simulating single-finger touch swipe from (${startX}, ${startY}) to (${startX}, ${endY})...`);

    // Perform real touch swipe on canvas using Puppeteer Touchscreen API
    await page.touchscreen.touchStart(startX, startY);
    for (let step = 1; step <= 10; step++) {
      const currentY = startY + ((endY - startY) * (step / 10));
      await page.touchscreen.touchMove(startX, currentY);
      await new Promise(r => setTimeout(r, 20));
    }
    await page.touchscreen.touchEnd();

    // Allow time for inertia/scroll update
    await new Promise(r => setTimeout(r, 800));

    // Check scroll position after swipe
    const afterSwipe = await page.evaluate(() => {
      return {
        finalScrollY: window.scrollY,
        innerHeight: window.innerHeight
      };
    });

    const scrollDelta = afterSwipe.finalScrollY - canvasBox.initialScrollY;
    console.log('📜 Final window.scrollY after swipe:', afterSwipe.finalScrollY);
    console.log('📊 Vertical scroll displacement (delta):', scrollDelta, 'px');

    if (scrollDelta > 0) {
      console.log(`\n✅ TEST PASSED: Single-finger vertical swipe on BIM canvas successfully scrolled the page by +${scrollDelta}px without getting trapped!`);
    } else {
      console.error(`\n❌ TEST FAILED: ScrollY did not increase (delta: ${scrollDelta}px).`);
    }

  } catch (err) {
    console.error('❌ Error during swipe test:', err);
  } finally {
    await browser.close();
  }
})();

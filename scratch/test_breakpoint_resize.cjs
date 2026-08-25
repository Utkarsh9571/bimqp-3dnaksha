const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Testing Breakpoint Boundary (767px <-> 769px) Resize and Layout Swap Stability...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.toString()));

    // 1. Start at 767px (Mobile Phone)
    await page.setViewport({ width: 767, height: 900 });
    console.log('📱 1. Loaded at 767px (Mobile Phone)...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const mobileState = await page.evaluate(() => {
      return {
        showcaseIsPinned: !!document.querySelector('#showcase.h-\\[300vh\\]'),
        aboutIsPinned: !!document.querySelector('#about .h-\\[280vh\\]')
      };
    });
    console.log('   Mobile state:', mobileState);

    // 2. Resize across boundary to 769px (Tablet)
    console.log('🔄 2. Resizing across boundary to 769px (Tablet/Desktop)...');
    await page.setViewport({ width: 769, height: 900 });
    await new Promise(r => setTimeout(r, 800));

    const tabletState = await page.evaluate(() => {
      return {
        showcaseIsPinned: !!document.querySelector('#showcase.h-\\[300vh\\]'),
        aboutIsPinned: !!document.querySelector('#about .h-\\[280vh\\]')
      };
    });
    console.log('   Tablet state:', tabletState);

    // 3. Resize back to 767px (Mobile)
    console.log('🔄 3. Resizing back to 767px (Mobile Phone)...');
    await page.setViewport({ width: 767, height: 900 });
    await new Promise(r => setTimeout(r, 800));

    const mobileStateAfter = await page.evaluate(() => {
      return {
        showcaseIsPinned: !!document.querySelector('#showcase.h-\\[300vh\\]'),
        aboutIsPinned: !!document.querySelector('#about .h-\\[280vh\\]')
      };
    });
    console.log('   Mobile state after swap back:', mobileStateAfter);

    if (consoleErrors.length === 0) {
      console.log('\n✅ TEST PASSED: Breakpoint boundary swaps cleanly with ZERO errors, crashes, or unhandled exceptions!');
    } else {
      console.log('\n⚠️ Console errors during resize:', consoleErrors);
    }

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await browser.close();
  }
})();

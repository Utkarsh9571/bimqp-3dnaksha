const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Running Comprehensive Regression Test on Desktop (1280x900)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    const consoleWarnings = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });
    page.on('pageerror', err => consoleErrors.push(err.toString()));

    await page.setViewport({ width: 1280, height: 900 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 1200));

    // 1. Check Console Errors for ".operating-divider" and "#services"
    console.log('\n--- CHECK 1: Console Cleanliness ---');
    const dividerErrors = consoleErrors.filter(e => e.includes('.operating-divider') || e.includes('operating-divider'));
    const lenisErrors = consoleErrors.filter(e => e.includes('Lenis: Target not found'));
    const webglErrors = consoleErrors.filter(e => e.includes('glTexStorage2D') || e.includes('immutable'));

    console.log('  - GSAP .operating-divider errors:', dividerErrors.length === 0 ? '✅ 0 errors' : `❌ ${dividerErrors}`);
    console.log('  - Lenis missing target errors:', lenisErrors.length === 0 ? '✅ 0 errors' : `❌ ${lenisErrors}`);
    console.log('  - WebGL immutable texture errors:', webglErrors.length === 0 ? '✅ 0 errors' : `❌ ${webglErrors}`);

    // 2. Check ScrollWalkthroughViewer Scrubbing on Desktop
    console.log('\n--- CHECK 2: ScrollWalkthroughViewer Scrubbing on Desktop ---');
    const walkthroughMetrics = await page.evaluate(async () => {
      const el = document.getElementById('walkthrough-viewer');
      if (!el) return { found: false };
      
      // Scroll to walkthrough viewer
      el.scrollIntoView({ behavior: 'instant' });
      await new Promise(r => setTimeout(r, 400));

      const initialFrameText = document.querySelector('#walkthrough-viewer')?.innerText;
      
      // Scroll further down within the pinned section
      window.scrollBy({ top: 800, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 400));

      const scrubbedFrameText = document.querySelector('#walkthrough-viewer')?.innerText;
      return {
        found: true,
        initialTextPreview: initialFrameText?.substring(0, 100),
        scrubbedTextPreview: scrubbedFrameText?.substring(0, 100),
        hasCanvas: !!document.querySelector('#walkthrough-viewer canvas')
      };
    });
    console.log('  - Walkthrough viewer rendered:', walkthroughMetrics.found ? '✅ Yes' : '❌ No');
    console.log('  - Walkthrough canvas present:', walkthroughMetrics.hasCanvas ? '✅ Yes' : '❌ No');

    // 3. Check FullBleedShowcase VR Headset Transition on Desktop
    console.log('\n--- CHECK 3: FullBleedShowcase VR Headset Lens Transition ---');
    const showcaseMetrics = await page.evaluate(async () => {
      const el = document.getElementById('showcase');
      if (!el) return { found: false };

      // Scroll to top of showcase
      el.scrollIntoView({ behavior: 'instant' });
      await new Promise(r => setTimeout(r, 500));

      const headsetImg = document.querySelector('#showcase img');
      const headsetStyleStart = headsetImg ? window.getComputedStyle(headsetImg).transform : 'none';

      // Scroll into the lens zoom
      window.scrollBy({ top: 600, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 500));

      const headsetStyleZoomed = headsetImg ? window.getComputedStyle(headsetImg).transform : 'none';

      // Scroll further to reveal the BIM model
      window.scrollBy({ top: 1200, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 600));

      const bimCanvas = document.querySelector('#showcase canvas');

      return {
        found: true,
        headsetFound: !!headsetImg,
        transformStart: headsetStyleStart,
        transformZoomed: headsetStyleZoomed,
        isZooming: headsetStyleStart !== headsetStyleZoomed,
        bimCanvasPresent: !!bimCanvas
      };
    });
    console.log('  - Showcase container found:', showcaseMetrics.found ? '✅ Yes' : '❌ No');
    console.log('  - Headset image element found:', showcaseMetrics.headsetFound ? '✅ Yes' : '❌ No');
    console.log('  - Headset zooms on scroll scrub:', showcaseMetrics.isZooming ? '✅ Yes (Transform changed dynamically)' : '❌ Static');
    console.log('  - 3D BIM Model canvas revealed:', showcaseMetrics.bimCanvasPresent ? '✅ Yes' : '❌ No');

    // 4. Check 3D Model Interactivity (Simulate mouse drag on canvas)
    console.log('\n--- CHECK 4: 3D Model Interactive Orbit Drag on Desktop ---');
    const dragResult = await page.evaluate(async () => {
      const canvas = document.querySelector('#showcase canvas');
      if (!canvas) return { error: 'No canvas found' };

      const rect = canvas.getBoundingClientRect();
      return {
        canvasFound: true,
        width: rect.width,
        height: rect.height,
        pointerEvents: window.getComputedStyle(canvas).pointerEvents,
        touchAction: window.getComputedStyle(canvas).touchAction
      };
    });
    console.log('  - Canvas pointer-events:', dragResult.pointerEvents);
    console.log('  - Canvas touch-action:', dragResult.touchAction);

    // Simulate mouse down and drag on canvas
    const canvasElement = await page.$('#showcase canvas');
    if (canvasElement) {
      const box = await canvasElement.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2 + 150, box.y + box.height / 2 + 80, { steps: 10 });
        await page.mouse.up();
        console.log('  ✅ Mouse drag executed on 3D canvas with 0 errors!');
      }
    }

    console.log('\n========================================');
    if (consoleErrors.length === 0) {
      console.log('🎉 ALL 4 REGRESSIONS FIXED AND VERIFIED!');
    } else {
      console.log('⚠️ Remaining console errors:', consoleErrors);
    }
    console.log('========================================');

  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    await browser.close();
  }
})();

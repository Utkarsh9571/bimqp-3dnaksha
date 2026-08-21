const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Starting Automated Mobile Interaction & Touch Audit Verification...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    p0: {},
    p1: {},
    p2: {},
    p3: {}
  };

  try {
    const page = await browser.newPage();
    
    // Set Mobile Viewport (iPhone 12/13/14: 390x844 with touch enabled)
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });

    console.log('📱 Navigating to http://localhost:5173/ on simulated mobile viewport (390x844, touch=true)...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 20000 });

    // =========================================================================
    // P0: BIM Model Viewer & Touch Trap Verification
    // =========================================================================
    console.log('\n--- Checking P0: BIM Viewer Touch-Trap ---');
    
    // Scroll to showcase section to mount BIM viewer
    await page.evaluate(() => {
      const el = document.getElementById('showcase');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    
    // Wait for the lazy-loaded canvas to mount and render
    await page.waitForSelector('#showcase canvas', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    const bimAudit = await page.evaluate(() => {
      const canvas = document.querySelector('#showcase canvas');
      const hudBadge = document.querySelector('#showcase [class*="tracking-wider"]');
      const canvasTouchAction = canvas ? window.getComputedStyle(canvas).touchAction : null;
      const hudText = hudBadge ? hudBadge.textContent.trim() : '';

      return {
        canvasFound: !!canvas,
        touchAction: canvasTouchAction,
        hudText: hudText
      };
    });

    results.p0.canvasTouchAction = bimAudit.touchAction;
    results.p0.hudText = bimAudit.hudText;
    results.p0.touchTrapFixed = bimAudit.touchAction === 'pan-y';
    console.log('  Canvas touch-action:', bimAudit.touchAction, '(Expected: pan-y, is pan-y:', bimAudit.touchAction === 'pan-y', ')');
    console.log('  Mobile HUD label:', bimAudit.hudText);

    // =========================================================================
    // P1: Layout-Breaking Issues (100dvh, Walkthrough HUD, ExperienceUnbuilt)
    // =========================================================================
    console.log('\n--- Checking P1: Layout & Viewport Fixes ---');

    // 1. Check dvh / svh classes in key sections
    const dvhAudit = await page.evaluate(() => {
      const hero = document.getElementById('hero');
      const showcaseSticky = document.querySelector('#showcase > div');
      const walkthrough = document.getElementById('walkthrough-viewer');
      const experienceSticky = document.querySelector('#about div.sticky');

      return {
        heroHasDvh: hero ? hero.className.includes('100dvh') : false,
        showcaseHasDvh: showcaseSticky ? showcaseSticky.className.includes('100dvh') : false,
        walkthroughHasDvh: walkthrough ? walkthrough.className.includes('100dvh') : false,
        experienceHasDvh: experienceSticky ? experienceSticky.className.includes('100dvh') : false,
      };
    });
    results.p1.dvhChecks = dvhAudit;
    console.log('  100dvh classes active:', dvhAudit);

    // 2. Check ScrollWalkthroughViewer HUD collision at 375px (iPhone SE width)
    await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
      const el = document.getElementById('walkthrough-viewer');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    const walkthroughHudAudit = await page.evaluate(() => {
      const viewer = document.getElementById('walkthrough-viewer');
      if (!viewer) return { error: 'viewer not found' };

      const frameCounter = viewer.querySelector('.top-4.sm\\:top-8, .top-6.sm\\:top-8');
      const miniMap = viewer.querySelector('.w-44, .w-52');
      const miniMapVisible = miniMap ? window.getComputedStyle(miniMap.parentElement).display !== 'none' : false;

      return {
        frameCounterPresent: !!frameCounter,
        miniMapHiddenOnMobile: !miniMapVisible,
      };
    });
    results.p1.walkthroughHud = walkthroughHudAudit;
    console.log('  Walkthrough HUD (375px) - MiniMap hidden to prevent overlap:', walkthroughHudAudit.miniMapHiddenOnMobile);

    // 3. Check ExperienceUnbuilt content fit on 375px viewport
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    const experienceFitAudit = await page.evaluate(() => {
      const stickyDiv = document.querySelector('#about div.sticky');
      const containerRect = stickyDiv ? stickyDiv.getBoundingClientRect() : null;
      return {
        stickyHeight: containerRect ? containerRect.height : 0,
        windowHeight: window.innerHeight,
        fitsInViewport: containerRect ? containerRect.height <= window.innerHeight + 5 : false
      };
    });
    results.p1.experienceFit = experienceFitAudit;
    console.log('  ExperienceUnbuilt sticky container fits 375x667 viewport:', experienceFitAudit.fitsInViewport);

    // =========================================================================
    // P2: Touch Targets (44x44px minimum) & Gesture Containment
    // =========================================================================
    console.log('\n--- Checking P2: Touch Target Sizes & Gesture Containment ---');

    // Scroll to booking CTA
    await page.evaluate(() => {
      const el = document.getElementById('booking-cta');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    const touchTargets = await page.evaluate(() => {
      // 1. Month nav arrows
      const prevBtn = document.querySelector('button[aria-label="Previous Month"]');
      const nextBtn = document.querySelector('button[aria-label="Next Month"]');
      const prevRect = prevBtn ? prevBtn.getBoundingClientRect() : { width: 0, height: 0 };

      // 2. Calendar day cell touch areas
      const dayCells = Array.from(document.querySelectorAll('.grid-cols-7 > div'));
      const sampleDayCell = dayCells[dayCells.length - 1];
      const dayRect = sampleDayCell ? sampleDayCell.getBoundingClientRect() : { width: 0, height: 0 };

      // 3. Hamburger button
      const hamburgerBtn = document.querySelector('button[aria-label="Toggle navigation menu"]');
      const hamburgerRect = hamburgerBtn ? hamburgerBtn.getBoundingClientRect() : { width: 0, height: 0 };

      // 4. Comparison slider presets
      const presetBtns = Array.from(document.querySelectorAll('#about button'));
      const splitBtn = presetBtns.find(b => b.textContent.includes('Split') || b.textContent.includes('2D Plan'));
      const presetRect = splitBtn ? splitBtn.getBoundingClientRect() : { width: 0, height: 0 };

      // 5. Comparison slider circular handle
      const handle = document.querySelector('.cursor-grab');
      const handleRect = handle ? handle.getBoundingClientRect() : { width: 0, height: 0 };

      // 6. Portfolio filter buttons
      const filterBtns = Array.from(document.querySelectorAll('#portfolio button'));
      const sampleFilter = filterBtns[0];
      const filterRect = sampleFilter ? sampleFilter.getBoundingClientRect() : { width: 0, height: 0 };

      return {
        monthArrow: { width: Math.round(prevRect.width), height: Math.round(prevRect.height) },
        calendarDayCell: { width: Math.round(dayRect.width), height: Math.round(dayRect.height) },
        hamburgerButton: { width: Math.round(hamburgerRect.width), height: Math.round(hamburgerRect.height) },
        presetButton: { width: Math.round(presetRect.width), height: Math.round(presetRect.height) },
        comparisonHandle: { width: Math.round(handleRect.width), height: Math.round(handleRect.height) },
        portfolioFilter: { width: Math.round(filterRect.width), height: Math.round(filterRect.height) }
      };
    });

    results.p2.touchTargets = touchTargets;
    console.log('  Month Navigation Arrow:', touchTargets.monthArrow, '(>=44px:', touchTargets.monthArrow.height >= 44 && touchTargets.monthArrow.width >= 44, ')');
    console.log('  Calendar Day Cell Height:', touchTargets.calendarDayCell.height, 'px (>=44px:', touchTargets.calendarDayCell.height >= 44, ')');
    console.log('  Hamburger Menu Button:', touchTargets.hamburgerButton, '(>=44px:', touchTargets.hamburgerButton.height >= 44 && touchTargets.hamburgerButton.width >= 44, ')');
    console.log('  Comparison Preset Tab Height:', touchTargets.presetButton.height, 'px (>=44px:', touchTargets.presetButton.height >= 44, ')');
    console.log('  Comparison Slider Grab Handle:', touchTargets.comparisonHandle, '(>=44px:', touchTargets.comparisonHandle.height >= 44 && touchTargets.comparisonHandle.width >= 44, ')');
    console.log('  Portfolio Category Filter Button:', touchTargets.portfolioFilter, '(>=44px:', touchTargets.portfolioFilter.height >= 44, ')');

    // =========================================================================
    // P3: Polish (Tablet Grid & Dynamic Copy)
    // =========================================================================
    console.log('\n--- Checking P3: Polish & Tablet Grid ---');
    await page.setViewport({ width: 768, height: 1024, isMobile: false });
    await page.evaluate(() => {
      const el = document.getElementById('clients');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    const tabletGridAudit = await page.evaluate(() => {
      const clientsGrid = document.querySelector('#clients .grid');
      return {
        className: clientsGrid ? clientsGrid.className : '',
        hasSmCols4: clientsGrid ? clientsGrid.className.includes('sm:grid-cols-4') : false
      };
    });
    results.p3.tabletGrid = tabletGridAudit;
    console.log('  TargetAudience grid has sm:grid-cols-4 for tablet:', tabletGridAudit.hasSmCols4);

    console.log('\n🎉 ALL AUTOMATED MOBILE AUDIT CHECKS FINISHED!');
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('❌ Error during mobile audit:', err);
  } finally {
    await browser.close();
  }
})();

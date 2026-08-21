const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('📊 Starting In-Depth Performance & Responsiveness Baseline Audit...');
  
  // 1. Bundle size analysis
  console.log('\n--- 1. BUNDLE SIZE ANALYSIS ---');
  const distAssetsDir = path.join(__dirname, '..', 'dist', 'assets');
  if (fs.existsSync(distAssetsDir)) {
    const files = fs.readdirSync(distAssetsDir);
    let totalJsBytes = 0;
    let totalCssBytes = 0;
    const jsFiles = [];
    const cssFiles = [];

    files.forEach(file => {
      const filePath = path.join(distAssetsDir, file);
      const stat = fs.statSync(filePath);
      if (file.endsWith('.js')) {
        totalJsBytes += stat.size;
        jsFiles.push({ name: file, sizeKb: (stat.size / 1024).toFixed(2) });
      } else if (file.endsWith('.css')) {
        totalCssBytes += stat.size;
        cssFiles.push({ name: file, sizeKb: (stat.size / 1024).toFixed(2) });
      }
    });

    console.log(`Total JS bundle size (all chunks): ${(totalJsBytes / 1024).toFixed(2)} KB`);
    console.log(`Total CSS bundle size: ${(totalCssBytes / 1024).toFixed(2)} KB`);
    console.log('JS Chunks breakdown:');
    jsFiles.sort((a, b) => b.sizeKb - a.sizeKb).forEach(f => {
      console.log(`  - ${f.name.padEnd(45)}: ${f.sizeKb.padStart(8)} KB`);
    });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Enable CDP Performance domain
    const client = await page.target().createCDPSession();
    await client.send('Performance.enable');

    // 2. Measure Desktop Load & Performance Metrics
    console.log('\n--- 2. DESKTOP LOAD PERFORMANCE AUDIT ---');
    await page.setViewport({ width: 1280, height: 900 });
    
    const initialNetworkRequests = [];
    page.on('response', res => {
      const url = res.url();
      if (url.includes('/assets/')) {
        initialNetworkRequests.push({
          url: url.split('/assets/')[1],
          status: res.status(),
          size: res.headers()['content-length'] || 'streamed'
        });
      }
    });

    const startTime = Date.now();
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    const loadDuration = Date.now() - startTime;

    // Web Vitals & Performance Timing
    const performanceTiming = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      
      // Calculate CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsEntries = performance.getEntriesByType('layout-shift') || [];
      for (const entry of clsEntries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }

      // Check long tasks (>50ms)
      const longTasks = performance.getEntriesByType('longtask') || [];
      const longTaskDetails = longTasks.map(t => ({
        duration: Math.round(t.duration),
        startTime: Math.round(t.startTime)
      }));

      // Check below-the-fold components loaded on initial paint
      const belowTheFoldElements = {
        experienceUnbuilt: !!document.getElementById('about'),
        services: !!document.getElementById('services'),
        showcase: !!document.getElementById('showcase'),
        walkthrough: !!document.getElementById('walkthrough-viewer'),
        vrCenterpiece: !!document.getElementById('vr-centerpiece')
      };

      return {
        fcp: Math.round(fcp),
        domInteractive: Math.round(nav ? nav.domInteractive : 0),
        domContentLoaded: Math.round(nav ? nav.domContentLoadedEventEnd : 0),
        loadEventEnd: Math.round(nav ? nav.loadEventEnd : 0),
        cls: clsValue.toFixed(4),
        longTaskCount: longTasks.length,
        longTasks: longTaskDetails,
        belowTheFoldElements
      };
    });

    console.log(`Page Load Duration: ${loadDuration} ms`);
    console.log(`First Contentful Paint (FCP): ${performanceTiming.fcp} ms`);
    console.log(`DOM Content Loaded: ${performanceTiming.domContentLoaded} ms`);
    console.log(`Cumulative Layout Shift (CLS): ${performanceTiming.cls}`);
    console.log(`Long Tasks (>50ms) count: ${performanceTiming.longTaskCount}`);
    if (performanceTiming.longTasks.length > 0) {
      console.log('Long Task Details:', performanceTiming.longTasks);
    }
    console.log('Initial network chunks requested:', initialNetworkRequests.map(r => r.url));

    // 3. Mobile Performance Audit
    console.log('\n--- 3. MOBILE LOAD PERFORMANCE AUDIT (390x844, Simulated 4G) ---');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    
    const mobileStartTime = Date.now();
    await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    const mobileLoadDuration = Date.now() - mobileStartTime;

    const mobilePerformance = await mobilePage.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      let clsValue = 0;
      const clsEntries = performance.getEntriesByType('layout-shift') || [];
      for (const entry of clsEntries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      return {
        fcp: Math.round(fcp),
        cls: clsValue.toFixed(4)
      };
    });

    console.log(`Mobile Page Load Duration: ${mobileLoadDuration} ms`);
    console.log(`Mobile First Contentful Paint (FCP): ${mobilePerformance.fcp} ms`);
    console.log(`Mobile Cumulative Layout Shift (CLS): ${mobilePerformance.cls}`);

    console.log('\n✅ Performance Audit Complete.');

  } catch (err) {
    console.error('Audit error:', err);
  } finally {
    await browser.close();
  }
})();

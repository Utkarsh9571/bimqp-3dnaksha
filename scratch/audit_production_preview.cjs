const puppeteer = require('puppeteer');

(async () => {
  console.log('⚡ Auditing Production Bundle on http://localhost:4173/ ...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const startTime = Date.now();
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });
    const loadTime = Date.now() - startTime;

    const metrics = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      const nav = performance.getEntriesByType('navigation')[0];
      
      let cls = 0;
      const clsEntries = performance.getEntriesByType('layout-shift') || [];
      for (const e of clsEntries) {
        if (!e.hadRecentInput) cls += e.value;
      }

      const longTasks = performance.getEntriesByType('longtask') || [];

      return {
        fcp: Math.round(fcp),
        domContentLoaded: Math.round(nav ? nav.domContentLoadedEventEnd : 0),
        domInteractive: Math.round(nav ? nav.domInteractive : 0),
        cls: cls.toFixed(4),
        longTaskCount: longTasks.length,
        longTasks: longTasks.map(t => Math.round(t.duration))
      };
    });

    console.log(`Production Desktop Load Duration: ${loadTime} ms`);
    console.log(`Production Desktop FCP: ${metrics.fcp} ms`);
    console.log(`Production Desktop DOM Content Loaded: ${metrics.domContentLoaded} ms`);
    console.log(`Production Desktop CLS: ${metrics.cls}`);
    console.log(`Production Desktop Long Tasks (>50ms): ${metrics.longTaskCount}`, metrics.longTasks);

    // Mobile check
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    const mobileStart = Date.now();
    await mobilePage.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });
    const mobileLoadTime = Date.now() - mobileStart;

    const mobileMetrics = await mobilePage.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      let cls = 0;
      const clsEntries = performance.getEntriesByType('layout-shift') || [];
      for (const e of clsEntries) {
        if (!e.hadRecentInput) cls += e.value;
      }
      return {
        fcp: Math.round(fcp),
        cls: cls.toFixed(4)
      };
    });

    console.log(`Production Mobile Load Duration: ${mobileLoadTime} ms`);
    console.log(`Production Mobile FCP: ${mobileMetrics.fcp} ms`);
    console.log(`Production Mobile CLS: ${mobileMetrics.cls}`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();

const puppeteer = require('puppeteer');

(async () => {
  console.log('🔍 Connecting to https://3dnaksha.com/ to capture exact console crash...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const errors = [];
    const failedRequests = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push({ type: 'console.error', text: msg.text(), location: msg.location() });
      }
    });

    page.on('pageerror', err => {
      errors.push({ type: 'pageerror', message: err.message, stack: err.stack });
    });

    page.on('requestfailed', req => {
      failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
    });

    await page.goto('https://3dnaksha.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    console.log('\n=== REAL ERRORS ON LIVE PRODUCTION (https://3dnaksha.com/) ===');
    console.log('Total Errors Caught:', errors.length);
    errors.forEach((e, i) => {
      console.log(`\n[Error #${i + 1}] (${e.type}):`);
      console.log('Message:', e.message || e.text);
      if (e.stack) console.log('Stack Trace:\n', e.stack);
      if (e.location) console.log('Location:', JSON.stringify(e.location));
    });

    console.log('\n=== FAILED ASSET REQUESTS ON LIVE ===');
    console.log('Total Failed Requests:', failedRequests.length);
    failedRequests.forEach((f, i) => {
      console.log(`[Failed #${i + 1}] ${f.url} -> ${f.failure}`);
    });

    // Check DOM tree
    const renderedSections = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('section, main > *')).map(el => ({
        tagName: el.tagName,
        id: el.id,
        className: el.className,
        textSnippet: el.innerText.substring(0, 80).replace(/\n/g, ' ')
      }));
    });

    console.log('\n=== DOM ELEMENTS RENDERED ON LIVE ===');
    console.log(JSON.stringify(renderedSections, null, 2));

  } catch (err) {
    console.error('Script error:', err);
  } finally {
    await browser.close();
  }
})();

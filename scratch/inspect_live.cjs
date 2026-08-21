const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://3dnaksha.com/', { waitUntil: 'networkidle2' });

  const info = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src);
    const sectionIds = Array.from(document.querySelectorAll('section[id], div[id]')).map(el => el.id);
    return {
      scripts,
      sectionIds: sectionIds.filter(Boolean),
      title: document.title,
      bodyTextSnippet: document.body.innerText.substring(0, 300)
    };
  });

  console.log('Live Page Info:', JSON.stringify(info, null, 2));
  await browser.close();
})();

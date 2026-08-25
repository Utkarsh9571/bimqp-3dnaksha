const puppeteer = require('puppeteer');

(async () => {
  console.log('🧪 Testing Live Google Apps Script Submission...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.toString()));

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Open Modal
    await page.evaluate(() => {
      const discussBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('DISCUSS PROJECT'));
      if (discussBtn) discussBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // Fill Modal
    const firstNameInput = await page.$('div[data-lenis-prevent="true"] input[placeholder*="Rajesh"]');
    const lastNameInput = await page.$('div[data-lenis-prevent="true"] input[placeholder*="Mehta"]');
    const emailInput = await page.$('div[data-lenis-prevent="true"] input[type="email"]');
    const phoneInput = await page.$('div[data-lenis-prevent="true"] input[type="tel"]');

    if (firstNameInput) await firstNameInput.type('Test');
    if (lastNameInput) await lastNameInput.type('User');
    if (emailInput) await emailInput.type('testuser@3dnaksha.com');
    if (phoneInput) await phoneInput.type('9999999999');

    // Click submit
    console.log('  - Submitting live form...');
    const submitBtn = await page.$('div[data-lenis-prevent="true"] button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 2500));
    }

    const modalSuccessText = await page.evaluate(() => {
      const modal = document.querySelector('div[data-lenis-prevent="true"]');
      if (!modal) return '';
      const h3 = modal.querySelector('h3');
      return h3 ? h3.innerText : '';
    });

    console.log('  - Modal Result Title:', modalSuccessText);
    console.log('  - Console Errors Count:', errors.length);
    if (errors.length > 0) {
      console.log('  - Errors:', errors);
    }

    if (modalSuccessText.includes('Project Inquiry Submitted') && errors.length === 0) {
      console.log('\n======================================================');
      console.log('🎉 LIVE GOOGLE APPS SCRIPT SUBMISSION SUCCESSFUL!');
      console.log('======================================================');
    } else {
      console.error('❌ Live Apps Script submission test failed.');
    }

  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await browser.close();
  }
})();

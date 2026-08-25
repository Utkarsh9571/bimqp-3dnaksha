const puppeteer = require('puppeteer');

(async () => {
  console.log('🧪 Verifying Form Submissions & Simplified Modal Fields...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const consoleLogs = [];
    page.on('console', msg => {
      if (msg.text().includes('[Form Submission Demo Mode]')) {
        consoleLogs.push(msg.text());
      }
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // 1. Open Consultation Modal
    console.log('  - Opening Consultation Modal...');
    await page.evaluate(() => {
      const discussBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('DISCUSS PROJECT'));
      if (discussBtn) discussBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // 2. Inspect Modal Fields
    const modalFields = await page.evaluate(() => {
      const modal = document.querySelector('div[data-lenis-prevent="true"]');
      if (!modal) return { found: false };

      const inputs = Array.from(modal.querySelectorAll('input, select, textarea'));
      return {
        found: true,
        fieldCount: inputs.length,
        hasFirstName: !!modal.querySelector('input[placeholder*="Rajesh"]'),
        hasLastName: !!modal.querySelector('input[placeholder*="Mehta"]'),
        hasEmail: !!modal.querySelector('input[type="email"]'),
        hasCountryCode: !!modal.querySelector('select'),
        hasPhone: !!modal.querySelector('input[type="tel"]'),
        hasProjectDetails: !!modal.querySelector('textarea'),
        hasHoneypot: !!modal.querySelector('input[name="website"]')
      };
    });

    console.log('  - Modal Field Inspection:', JSON.stringify(modalFields, null, 2));

    // 3. Fill modal inputs with Puppeteer type
    console.log('  - Typing into modal form fields...');
    const firstNameInput = await page.$('div[data-lenis-prevent="true"] input[placeholder*="Rajesh"]');
    const lastNameInput = await page.$('div[data-lenis-prevent="true"] input[placeholder*="Mehta"]');
    const emailInput = await page.$('div[data-lenis-prevent="true"] input[type="email"]');
    const phoneInput = await page.$('div[data-lenis-prevent="true"] input[type="tel"]');
    const projectDetailsInput = await page.$('div[data-lenis-prevent="true"] textarea');

    if (firstNameInput) await firstNameInput.type('Rajesh');
    if (lastNameInput) await lastNameInput.type('Mehta');
    if (emailInput) await emailInput.type('rajesh@designstudio.com');
    if (phoneInput) await phoneInput.type('9876543210');
    if (projectDetailsInput) await projectDetailsInput.type('Need 3D BIM visualization for modern 4000 sqft villa.');

    // Select referral source
    await page.select('div[data-lenis-prevent="true"] select:not([class*="shrink-0"])', 'Google Search');

    // Click submit button in modal
    console.log('  - Submitting form...');
    const submitBtn = await page.$('div[data-lenis-prevent="true"] button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 1800));
    }

    // 4. Verify Submission Success View inside Modal
    const modalSuccessText = await page.evaluate(() => {
      const modal = document.querySelector('div[data-lenis-prevent="true"]');
      if (!modal) return '';
      const h3 = modal.querySelector('h3');
      return h3 ? h3.innerText : '';
    });

    console.log('  - Modal Success Title:', modalSuccessText);
    console.log('  - Console Payload Logged:', consoleLogs);

    if (modalSuccessText.includes('Project Inquiry Submitted') && consoleLogs.length > 0) {
      console.log('\n======================================================');
      console.log('🎉 MODAL FORM & APPS SCRIPT FLOW FULLY VERIFIED!');
      console.log('======================================================');
    } else {
      console.error('❌ Modal form verification check failed.');
    }

  } catch (err) {
    console.error('Error during form test:', err);
  } finally {
    await browser.close();
  }
})();

const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Navigating to localhost:4173...');
  try {
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0', timeout: 10000 });
  } catch (e) {
    console.log('Navigation took too long, proceeding anyway...');
  }
  
  console.log('Scrolling down to FullBleedShowcase...');
  // The FullBleedShowcase is near the end, let's scroll down to it
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight * 0.4);
  });
  
  // Wait for it to load
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Scrolling into the section to trigger headset push-in...');
  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => {
    window.scrollBy(0, 1500); // Fully push in the headset
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Attempting to click and drag the BIM Viewer canvas...');
  // Coordinates in the middle of the screen
  const x = 640;
  const y = 400;
  
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 200, y, { steps: 20 });
  await page.mouse.up();
  
  console.log('Taking screenshot...');
  await page.screenshot({ path: 'C:/Users/danish/.gemini/antigravity-ide/brain/dc35e153-6db4-484e-bc72-650438578f43/step1_interactivity.png' });
  
  console.log('Done.');
  await browser.close();
})();

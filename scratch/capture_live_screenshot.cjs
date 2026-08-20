const { spawn } = require('child_process');
const fs = require('fs');

async function captureScreenshot() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outputPath = 'C:\\Users\\danish\\.gemini\\antigravity-ide\\brain\\dc35e153-6db4-484e-bc72-650438578f43\\live_site_screenshot.png';

  console.log('Capturing screenshot of https://3dnaksha.com/ via Chrome headless...');
  const proc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--window-size=1440,900',
    `--screenshot=${outputPath}`,
    'https://3dnaksha.com/'
  ]);

  proc.on('close', (code) => {
    console.log(`Chrome screenshot process exited with code ${code}`);
    if (fs.existsSync(outputPath)) {
      console.log(`Screenshot saved successfully: ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
    } else {
      console.log('Screenshot file not found.');
    }
  });
}

captureScreenshot();

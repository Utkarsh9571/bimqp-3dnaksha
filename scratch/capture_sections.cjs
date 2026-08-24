const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\danish\\.gemini\\antigravity-ide\\brain\\e5c61172-ccc5-4493-822b-fd5431c4da27';

function capture(url, outputFile, windowSize = '1440,900') {
  return new Promise((resolve, reject) => {
    const proc = spawn(chromePath, [
      '--headless=new',
      '--no-sandbox',
      `--window-size=${windowSize}`,
      `--screenshot=${outputFile}`,
      url
    ]);

    proc.on('close', (code) => {
      if (code === 0 && fs.existsSync(outputFile)) {
        console.log(`Saved ${path.basename(outputFile)} (${fs.statSync(outputFile).size} bytes)`);
        resolve(outputFile);
      } else {
        reject(new Error(`Failed to capture screenshot, code: ${code}`));
      }
    });
  });
}

async function run() {
  const heroFile = path.join(artifactDir, 'new_logo_palette_hero.png');

  try {
    await capture('http://localhost:5174/', heroFile, '1440,900');
    console.log('Successfully captured new logo palette homepage!');
  } catch (err) {
    console.error('Capture error:', err);
  }
}

run();

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function findChromePath() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Chrome not found');
}

async function getPageSessionUrl(port) {
  for (let i = 0; i < 30; i++) {
    try {
      const data = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => resolve(JSON.parse(body)));
        }).on('error', reject);
      });
      const page = data.find(item => item.type === 'page');
      if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch (e) {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  throw new Error('Could not find page session');
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function runProfile() {
  const chromePath = await findChromePath();
  const port = 9222;
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--window-size=390,844',
    '--user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"',
    '--disable-background-networking',
    '--disable-default-apps',
    '--mute-audio',
    'http://localhost:4173/'
  ]);

  try {
    const wsUrl = await getPageSessionUrl(port);
    const client = new CDPClient(wsUrl);
    await client.connect();

    console.log('Connected to Chrome Page Target.');

    // 1. Set 4x CPU Throttling (Simulates Mid-Range Mobile CPU)
    console.log('Applying 4x CPU Throttling via CDP...');
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    // Wait for page to finish loading and hydrate
    await new Promise(r => setTimeout(r, 2500));

    // 2. Scroll to load below-the-fold components
    console.log('Scrolling down page to trigger suspense components...');
    await client.send('Runtime.evaluate', {
      awaitPromise: true,
      expression: `
        new Promise((resolve) => {
          let scrollY = 0;
          const scrollInterval = setInterval(() => {
            scrollY += 400;
            window.scrollTo(0, scrollY);
            const slider = document.querySelector('.cursor-ew-resize');
            if (slider || scrollY > 6000) {
              clearInterval(scrollInterval);
              if (slider) {
                slider.scrollIntoView({ behavior: 'instant', block: 'center' });
                resolve({ found: true, y: scrollY });
              } else {
                resolve({ found: false, y: scrollY });
              }
            }
          }, 150);
        })
      `
    });

    await new Promise(r => setTimeout(r, 1500));

    // 3. Run continuous drag gesture & measure frame times
    console.log('Executing 100-step drag gesture with frame-rate profiling under 4x CPU throttling...');
    const result = await client.send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise((resolve) => {
          const slider = document.querySelector('.cursor-ew-resize');
          if (!slider) {
            resolve({ error: 'Slider element not found in DOM after scrolling' });
            return;
          }

          const rect = slider.getBoundingClientRect();
          const startX = rect.left + rect.width * 0.2;
          const endX = rect.left + rect.width * 0.8;
          const centerY = rect.top + rect.height / 2;

          const frameTimes = [];
          let lastTime = performance.now();
          let isRunning = true;

          // Monitor RAF frame delivery during drag
          function recordFrame(now) {
            const delta = now - lastTime;
            lastTime = now;
            frameTimes.push(delta);
            if (isRunning) {
              requestAnimationFrame(recordFrame);
            }
          }
          requestAnimationFrame(recordFrame);

          // Dispatch drag sequence
          const steps = 100;
          const totalDuration = 2000; // 2 seconds continuous drag
          const stepInterval = totalDuration / steps;
          let currentStep = 0;

          // MouseDown / PointerDown
          slider.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            clientX: startX,
            clientY: centerY
          }));

          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            // Oscillate back and forth across 2 cycles
            const clientX = startX + (endX - startX) * (0.5 + 0.45 * Math.sin(progress * Math.PI * 4));

            window.dispatchEvent(new MouseEvent('mousemove', {
              bubbles: true,
              clientX: clientX,
              clientY: centerY
            }));

            if (currentStep >= steps) {
              clearInterval(interval);
              window.dispatchEvent(new MouseEvent('mouseup', {
                bubbles: true,
                clientX: clientX,
                clientY: centerY
              }));

              setTimeout(() => {
                isRunning = false;
                // Exclude first frame initialization
                const validFrames = frameTimes.slice(1);
                const totalFrames = validFrames.length;
                const totalTime = validFrames.reduce((a, b) => a + b, 0);
                const avgFps = totalFrames / (totalTime / 1000);
                const sorted = [...validFrames].sort((a, b) => a - b);
                const p50 = sorted[Math.floor(sorted.length * 0.5)];
                const p95 = sorted[Math.floor(sorted.length * 0.95)];
                const p99 = sorted[Math.floor(sorted.length * 0.99)];
                const maxFrameTime = sorted[sorted.length - 1];
                const droppedFrames16ms = validFrames.filter(t => t > 20).length;
                const droppedFrames33ms = validFrames.filter(t => t > 35).length;

                resolve({
                  totalFrames,
                  totalTimeMs: totalTime.toFixed(1),
                  avgFps: avgFps.toFixed(1),
                  p50Ms: p50.toFixed(2),
                  p95Ms: p95.toFixed(2),
                  p99Ms: p99.toFixed(2),
                  maxFrameTimeMs: maxFrameTime.toFixed(2),
                  droppedFrames16ms,
                  droppedFrames33ms
                });
              }, 200);
            }
          }, stepInterval);
        })
      `
    });

    console.log('\n======================================================');
    console.log('   RUNTIME DRAG GESTURE PROFILING (4x CPU THROTTLED)');
    console.log('======================================================');
    console.log(JSON.stringify(result.result?.value || result, null, 2));

    client.close();
  } finally {
    chrome.kill();
  }
}

runProfile().catch(console.error);

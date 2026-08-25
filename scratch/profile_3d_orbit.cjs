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

    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to #cinematic-showcase
    console.log('Scrolling to #cinematic-showcase and awaiting WebGL canvas mount...');
    const diag = await client.send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise((resolve) => {
          let scrollY = 0;
          const iv = setInterval(() => {
            scrollY += 350;
            window.scrollTo(0, scrollY);
            window.dispatchEvent(new Event('scroll'));

            const section = document.querySelector('#cinematic-showcase');
            if (section) {
              section.scrollIntoView({ behavior: 'instant', block: 'center' });
              const canvas = section.querySelector('canvas');
              if (canvas) {
                clearInterval(iv);
                resolve({ found: true, y: scrollY });
                return;
              }
            }

            if (scrollY > 16000) {
              clearInterval(iv);
              resolve({ found: false, y: scrollY });
            }
          }, 120);
        })
      `
    });

    console.log('Scroll & Mount result:', diag.result?.value);

    // Wait 2.5 seconds for Three.js geometry & shaders to compile
    await new Promise(r => setTimeout(r, 2500));

    // Measure drag orbit on canvas
    const result = await client.send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise((resolve) => {
          const canvas = document.querySelector('#cinematic-showcase canvas');
          if (!canvas) {
            resolve({ error: 'Canvas not found after scroll sequence' });
            return;
          }

          const rect = canvas.getBoundingClientRect();
          const startX = rect.left + rect.width * 0.3;
          const endX = rect.left + rect.width * 0.7;
          const centerY = rect.top + rect.height * 0.5;

          const frameTimes = [];
          let lastTime = performance.now();
          let isRunning = true;

          function recordFrame(now) {
            const delta = now - lastTime;
            lastTime = now;
            frameTimes.push(delta);
            if (isRunning) {
              requestAnimationFrame(recordFrame);
            }
          }
          requestAnimationFrame(recordFrame);

          const steps = 120;
          const totalDuration = 2400;
          const stepInterval = totalDuration / steps;
          let currentStep = 0;

          // PointerDown to start orbit
          canvas.dispatchEvent(new PointerEvent('pointerdown', {
            bubbles: true,
            clientX: startX,
            clientY: centerY,
            pointerId: 1,
            isPrimary: true
          }));

          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const clientX = startX + (endX - startX) * (0.5 + 0.45 * Math.sin(progress * Math.PI * 4));
            const clientY = centerY + 30 * Math.cos(progress * Math.PI * 2);

            canvas.dispatchEvent(new PointerEvent('pointermove', {
              bubbles: true,
              clientX: clientX,
              clientY: clientY,
              pointerId: 1,
              isPrimary: true
            }));

            if (currentStep >= steps) {
              clearInterval(interval);
              canvas.dispatchEvent(new PointerEvent('pointerup', {
                bubbles: true,
                clientX: clientX,
                clientY: clientY,
                pointerId: 1,
                isPrimary: true
              }));

              setTimeout(() => {
                isRunning = false;
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
              }, 300);
            }
          }, stepInterval);
        })
      `
    });

    console.log('\n======================================================');
    console.log('   LIVE 3D MODEL ORBIT PROFILING (4x CPU THROTTLED)');
    console.log('======================================================');
    console.log(JSON.stringify(result.result?.value || result, null, 2));

    client.close();
  } finally {
    chrome.kill();
  }
}

runProfile().catch(console.error);

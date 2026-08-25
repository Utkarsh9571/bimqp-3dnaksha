import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 4173;

const ROUTES = [
  {
    path: '/',
    filePath: path.join(DIST_DIR, 'index.html'),
    canonical: 'https://3dnaksha.com/',
    expectedTitleKeyword: '3D Naksha',
    expectedTextKeyword: 'EXPERIENCE',
    requiresImages: true
  },
  {
    path: '/services/home-design',
    filePath: path.join(DIST_DIR, 'services/home-design/index.html'),
    canonical: 'https://3dnaksha.com/services/home-design',
    expectedTitleKeyword: 'Home Design',
    expectedTextKeyword: 'RESIDENTIAL ARCHITECTURE',
    requiresImages: true
  },
  {
    path: '/services/interior-design',
    filePath: path.join(DIST_DIR, 'services/interior-design/index.html'),
    canonical: 'https://3dnaksha.com/services/interior-design',
    expectedTitleKeyword: 'Interior Design',
    expectedTextKeyword: 'INTERIOR SPACE',
    requiresImages: true
  },
  {
    path: '/services/bim-modelling',
    filePath: path.join(DIST_DIR, 'services/bim-modelling/index.html'),
    canonical: 'https://3dnaksha.com/services/bim-modelling',
    expectedTitleKeyword: 'BIM Modelling',
    expectedTextKeyword: 'PARAMETRIC 3D BIM',
    requiresImages: true
  },
  {
    path: '/services/immersive-vr',
    filePath: path.join(DIST_DIR, 'services/immersive-vr/index.html'),
    canonical: 'https://3dnaksha.com/services/immersive-vr',
    expectedTitleKeyword: 'Immersive VR',
    expectedTextKeyword: 'STEP INSIDE',
    requiresImages: true
  },
  {
    path: '/services/construction-project-management',
    filePath: path.join(DIST_DIR, 'services/construction-project-management/index.html'),
    canonical: 'https://3dnaksha.com/services/construction-project-management',
    expectedTitleKeyword: 'Construction Project Management',
    expectedTextKeyword: 'VISUAL CONSTRUCTION',
    requiresImages: true
  }
];

// Content types helper for local static server
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg': case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.woff2': return 'font/woff2';
    default: return 'application/octet-stream';
  }
}

// Start static HTTP server serving dist/ with robust asset resolution
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = new URL(req.url, `http://localhost:${PORT}`).pathname;
      let targetFile;

      if (reqPath.includes('/assets/')) {
        const assetSubPath = reqPath.substring(reqPath.indexOf('/assets/'));
        targetFile = path.join(DIST_DIR, assetSubPath);
      } else {
        targetFile = path.join(DIST_DIR, reqPath);
      }

      if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
        res.writeHead(200, { 'Content-Type': getContentType(targetFile) });
        fs.createReadStream(targetFile).pipe(res);
      } else {
        const fallback = path.join(DIST_DIR, 'index.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(fallback).pipe(res);
      }
    });

    server.listen(PORT, () => {
      console.log(`[PRERENDER] Local static server running on port ${PORT}`);
      resolve(server);
    });
  });
}

// Fix relative asset URLs in generated HTML so they resolve correctly at any route depth
function normalizeAssetPaths(html) {
  return html
    .replace(/src="\.\/assets\//g, 'src="/assets/')
    .replace(/href="\.\/assets\//g, 'href="/assets/')
    .replace(/href="\.\/favicon\.jpeg"/g, 'href="/favicon.jpeg"');
}

async function runPrerender() {
  console.log('[PRERENDER] Beginning static pre-rendering (SSG)...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('[PRERENDER ERROR] dist/ directory does not exist. Run vite build first.');
    process.exit(1);
  }

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const route of ROUTES) {
      console.log(`[PRERENDER] Pre-rendering route: ${route.path}`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      // Navigate to route
      await page.goto(`http://localhost:${PORT}${route.path}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait until React lazy components AND Footer mount AND document canonical link matches target route canonical
      await page.waitForFunction(
        (targetCanonical) => {
          const canonicalEl = document.querySelector('link[rel="canonical"]');
          const h1El = document.querySelector('h1');
          const footerEl = document.querySelector('footer');

          const isCanonicalReady = canonicalEl !== null && canonicalEl.getAttribute('href') === targetCanonical;
          const isDomLoaded = h1El !== null && footerEl !== null;

          if (targetCanonical === 'https://3dnaksha.com/') {
            const aboutSectionEl = document.getElementById('about');
            const servicesSectionEl = document.getElementById('services');
            const clientsSectionEl = document.getElementById('clients');
            const missionSectionEl = document.getElementById('mission');
            const faqSectionEl = document.getElementById('faq');

            return (
              isCanonicalReady &&
              isDomLoaded &&
              aboutSectionEl !== null &&
              servicesSectionEl !== null &&
              clientsSectionEl !== null &&
              missionSectionEl !== null &&
              faqSectionEl !== null
            );
          }
          return isCanonicalReady && isDomLoaded;
        },
        { timeout: 25000 },
        route.canonical
      );

      // Fast scroll to trigger lazy component imports and mount all section IDs
      await page.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 150));
        window.scrollTo(0, 0);
      });

      // Additional settling window for reactive transitions and lazy DOM mounting
      await new Promise((r) => setTimeout(r, 600));

      // Extract generated HTML from browser
      let rawHtml = await page.content();
      let renderedHtml = normalizeAssetPaths(rawHtml);

      // Ensure directory exists for output file
      const outputDir = path.dirname(route.filePath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write snapshot to HTML file
      fs.writeFileSync(route.filePath, renderedHtml, 'utf-8');
      console.log(`[PRERENDER SUCCESS] Generated: ${path.relative(DIST_DIR, route.filePath)}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  // =========================================================================
  // PROGRAMMATIC VALIDATION PHASE (HEAD METADATA & JSON-LD STRUCTURED DATA)
  // =========================================================================
  console.log('\n==================================================');
  console.log('[VALIDATION] Beginning Programmatic Route HTML & JSON-LD Validation...');
  console.log('==================================================\n');

  let validationFailed = false;

  for (const route of ROUTES) {
    console.log(`[VALIDATION] Inspecting file: ${path.relative(DIST_DIR, route.filePath)}`);
    const fileHtml = fs.readFileSync(route.filePath, 'utf-8');

    const failures = [];

    // 1. Title Check
    const titleMatch = fileHtml.match(/<title[^>]*>(.*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1] || !titleMatch[1].toLowerCase().includes(route.expectedTitleKeyword.toLowerCase())) {
      failures.push(`Title missing or keyword '${route.expectedTitleKeyword}' not found. Title: "${titleMatch ? titleMatch[1] : 'NONE'}"`);
    }

    // 2. Meta Description Check
    const descMatch = fileHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i) ||
                      fileHtml.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["']/i);
    if (!descMatch || !descMatch[1] || descMatch[1].trim().length < 15) {
      failures.push(`Meta description missing or too short.`);
    }

    // 3. Canonical Tag Check
    const canonicalMatches = fileHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/gi) ||
                             fileHtml.match(/<link[^>]*href=["'](.*?)["'][^>]*rel=["']canonical["']/gi);
    if (!canonicalMatches || canonicalMatches.length !== 1) {
      failures.push(`Expected exactly 1 canonical tag, found ${canonicalMatches ? canonicalMatches.length : 0}`);
    } else {
      const hrefMatch = canonicalMatches[0].match(/href=["'](.*?)["']/i);
      if (!hrefMatch || hrefMatch[1] !== route.canonical) {
        failures.push(`Canonical URL mismatch. Expected: ${route.canonical}, Found: ${hrefMatch ? hrefMatch[1] : 'NONE'}`);
      }
    }

    // 4. H1 Tag Check
    const h1Matches = fileHtml.match(/<h1[^>]*>(.*?)<\/h1>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      failures.push(`No <h1> element found in raw HTML.`);
    }

    // 5. Meaningful Visible Text Check
    if (!fileHtml.toLowerCase().includes(route.expectedTextKeyword.toLowerCase())) {
      failures.push(`Route text keyword '${route.expectedTextKeyword}' not found in raw HTML body.`);
    }

    // 6. Crawlable Internal Links Check (<a href="/services/...">)
    const hrefServiceLinks = fileHtml.match(/<a[^>]*href=["']\/services\/[a-z0-9-]+["']/gi);
    if (!hrefServiceLinks || hrefServiceLinks.length === 0) {
      failures.push(`No crawlable HTML <a href="/services/..."> internal links found in raw HTML.`);
    }

    // 7. Content Images Check (where expected)
    if (route.requiresImages) {
      const imgMatches = fileHtml.match(/<img[^>]*src=["'](.*?)["']/gi);
      if (!imgMatches || imgMatches.length === 0) {
        failures.push(`Expected <img> elements, but 0 found in raw HTML.`);
      }
    }

    // 8. Zero Loading / Fallback / Empty Container States
    if (fileHtml.includes('SectionFallback') || fileHtml.includes('animate-spin') || fileHtml.includes('<div id="root"></div>')) {
      failures.push(`Raw HTML contains unhydrated loading fallback or empty root container!`);
    }

    // 9. Service Route Content Isolation (No accidental homepage body leaks)
    if (route.path !== '/' && fileHtml.includes('EXPERIENCE TOMORROW TODAY')) {
      failures.push(`Service detail route contains root homepage H1 content! Route content leak detected.`);
    }

    // 10. JSON-LD Structured Data Validation
    const jsonLdScripts = fileHtml.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    if (!jsonLdScripts || jsonLdScripts.length === 0) {
      failures.push(`No <script type="application/ld+json"> tag found in raw HTML.`);
    } else if (jsonLdScripts.length > 1) {
      failures.push(`Expected exactly 1 JSON-LD script block per page, found ${jsonLdScripts.length}.`);
    } else {
      try {
        const jsonMatch = jsonLdScripts[0].match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        const schemaObj = JSON.parse(jsonMatch[1]);

        if (schemaObj['@context'] !== 'https://schema.org') {
          failures.push(`JSON-LD @context is not 'https://schema.org'.`);
        }

        const graph = schemaObj['@graph'];
        if (!Array.isArray(graph)) {
          failures.push(`JSON-LD does not contain a valid @graph array.`);
        } else {
          // Verify Organization Entity
          const orgEntity = graph.find((node) => node['@id'] === 'https://3dnaksha.com/#organization');
          if (!orgEntity || orgEntity['@type'] !== 'Organization' || orgEntity.name !== '3D Naksha') {
            failures.push(`JSON-LD @graph missing valid Organization entity with @id 'https://3dnaksha.com/#organization'.`);
          }

          // Verify WebSite Entity
          const siteEntity = graph.find((node) => node['@id'] === 'https://3dnaksha.com/#website');
          if (!siteEntity || siteEntity['@type'] !== 'WebSite') {
            failures.push(`JSON-LD @graph missing valid WebSite entity.`);
          }

          // Verify Service Page specific entities
          if (route.path !== '/') {
            const expectedServiceId = `${route.canonical}#service`;
            const serviceEntity = graph.find((node) => node['@id'] === expectedServiceId);
            if (!serviceEntity || serviceEntity['@type'] !== 'Service' || serviceEntity.url !== route.canonical) {
              failures.push(`JSON-LD @graph missing valid Service entity for ${route.canonical}`);
            } else if (serviceEntity.provider['@id'] !== 'https://3dnaksha.com/#organization') {
              failures.push(`Service provider does not reference stable Organization @id.`);
            }

            const expectedBreadcrumbId = `${route.canonical}#breadcrumb`;
            const breadcrumbEntity = graph.find((node) => node['@id'] === expectedBreadcrumbId);
            if (!breadcrumbEntity || breadcrumbEntity['@type'] !== 'BreadcrumbList') {
              failures.push(`JSON-LD @graph missing valid BreadcrumbList entity for ${route.canonical}`);
            }
          }

          // Verify FAQPage entity when present
          const faqEntity = graph.find((node) => node['@type'] === 'FAQPage');
          if (faqEntity) {
            if (!Array.isArray(faqEntity.mainEntity) || faqEntity.mainEntity.length === 0) {
              failures.push(`FAQPage entity exists but contains 0 question items.`);
            }
          }
        }
      } catch (e) {
        failures.push(`Failed to parse JSON-LD script content as valid JSON: ${e.message}`);
      }
    }

    if (failures.length > 0) {
      validationFailed = true;
      console.error(`❌ [VALIDATION FAILED] Route ${route.path}:`);
      failures.forEach((err) => console.error(`   - ${err}`));
    } else {
      console.log(`✅ [VALIDATION PASSED] Route ${route.path} verified clean!`);
    }
  }

  // =========================================================================
  // INTERNAL CRAWL GRAPH & LINK INTEGRITY VALIDATION PHASE
  // =========================================================================
  console.log('\n==================================================');
  console.log('[CRAWL GRAPH] Analyzing Internal Link Graph & Href Integrity...');
  console.log('==================================================\n');

  const knownRoutes = new Set(ROUTES.map((r) => r.path));
  const homepageHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  // Dynamically collect all valid id="..." attributes on the homepage
  const homepageIds = new Set(
    Array.from(homepageHtml.matchAll(/id=["']([a-zA-Z0-9_-]+)["']/g)).map((m) => m[1])
  );

  let totalInternalLinksCount = 0;
  const uniqueInternalUrls = new Set();
  const crawlGraph = {};
  const brokenLinks = [];

  for (const route of ROUTES) {
    const fileHtml = fs.readFileSync(route.filePath, 'utf-8');
    crawlGraph[route.path] = new Set();

    // Extract all <a href="..."> links
    const hrefMatches = Array.from(fileHtml.matchAll(/<a[^>]*href=["']([^"']+)["']/gi)).map((m) => m[1]);

    for (let href of hrefMatches) {
      // Ignore mailto, tel, javascript, external links
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
      if (href.startsWith('http://') || href.startsWith('https://')) {
        if (!href.startsWith('https://3dnaksha.com') && !href.startsWith(`http://localhost:${PORT}`)) continue;
        // Strip origin
        href = href.replace(/^https:\/\/3dnaksha\.com/, '').replace(new RegExp(`^http:\/\/localhost:${PORT}`), '');
      }

      totalInternalLinksCount++;
      uniqueInternalUrls.add(href);

      // Distinguish section hash links from page routes
      if (href.startsWith('#') || href.startsWith('/#')) {
        const hashTarget = href.replace(/^[\/#]+/, '');
        if (hashTarget && !homepageIds.has(hashTarget)) {
          brokenLinks.push({ source: route.path, href, reason: `DOM id '${hashTarget}' not found on homepage` });
        }
      } else {
        // Page route
        const cleanRoute = href.split('#')[0] || '/';
        if (!knownRoutes.has(cleanRoute)) {
          brokenLinks.push({ source: route.path, href, reason: `Route '${cleanRoute}' does not exist` });
        } else {
          crawlGraph[route.path].add(cleanRoute);
        }
      }
    }
  }

  // Print Internal Crawl Graph Summary
  console.log('INTERNAL CRAWL GRAPH\n');
  for (const [sourceRoute, targetRoutes] of Object.entries(crawlGraph)) {
    console.log(`${sourceRoute}`);
    const targets = Array.from(targetRoutes);
    targets.forEach((tr, i) => {
      const isLast = i === targets.length - 1;
      console.log(`${isLast ? '└── ' : '├── '}${tr}`);
    });
    console.log('');
  }

  console.log(`Total Internal Links Processed: ${totalInternalLinksCount}`);
  console.log(`Total Unique Internal Href Targets: ${uniqueInternalUrls.size}`);
  console.log(`Broken Internal Links / Hash Targets: ${brokenLinks.length}\n`);

  if (brokenLinks.length > 0) {
    validationFailed = true;
    console.error('❌ [CRAWL GRAPH ERROR] Broken internal links detected:');
    brokenLinks.forEach((b) => console.error(`   - ${b.source} -> ${b.href} (${b.reason})`));
  }

  if (validationFailed) {
    console.error('\n❌ [PRERENDER ERROR] Programmatic validation failed for one or more checks.');
    process.exit(1);
  }

  console.log('==================================================');
  console.log('🎉 [PRERENDER SUCCESS] All 6 routes pre-rendered, validated & crawl graph verified with 100% compliance!');
  console.log('==================================================\n');
}

runPrerender().catch((err) => {
  console.error('[PRERENDER FATAL ERROR]', err);
  process.exit(1);
});

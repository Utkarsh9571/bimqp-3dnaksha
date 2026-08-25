const fs = require('fs');

const live = JSON.parse(fs.readFileSync('scratch/lh_live_mobile.json'));
const prod = JSON.parse(fs.readFileSync('scratch/lh_prod_mobile_optimized.json'));

console.log('=== LCP BREAKDOWN: LIVE SITE vs. OPTIMIZED PROD BUILD ===\n');

function extractLcpDetails(data, label) {
  console.log(`--- ${label} ---`);
  const audits = data.audits;
  console.log('LCP Display Value:', audits['largest-contentful-paint']?.displayValue);
  console.log('LCP Score:', audits['largest-contentful-paint']?.score);
  
  const elementAudit = audits['largest-contentful-paint-element'];
  console.log('LCP Element items:', JSON.stringify(elementAudit?.details?.items, null, 2));

  const lcpBreakdown = audits['lcp-breakdown-insight'];
  if (lcpBreakdown) {
    console.log('LCP Subparts:');
    const table = lcpBreakdown.details?.items?.find(i => i.type === 'table');
    if (table) {
      console.log(JSON.stringify(table.items, null, 2));
    }
  }

  const renderBlocking = audits['render-blocking-resources'];
  console.log('Render Blocking Resources count:', renderBlocking?.details?.items?.length || 0);
  if (renderBlocking?.details?.items?.length) {
    console.log('Render Blocking Items:', renderBlocking.details.items.map(i => ({ url: i.url, wastedMs: i.wastedMs })));
  }

  const networkRequests = audits['network-requests']?.details?.items || [];
  console.log('Total Network Requests:', networkRequests.length);
  
  // Print top 5 longest duration requests
  const sorted = [...networkRequests].sort((a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime));
  console.log('Top 5 longest network requests:');
  sorted.slice(0, 5).forEach(r => {
    console.log(`  - ${r.url.substring(0, 70)}: ${Math.round(r.endTime - r.startTime)}ms, transferSize: ${r.transferSize}B`);
  });
  console.log('\n');
}

extractLcpDetails(live, 'LIVE SITE (3dnaksha.com Mobile)');
extractLcpDetails(prod, 'OPTIMIZED PROD BUILD (Localhost:4173 Mobile)');

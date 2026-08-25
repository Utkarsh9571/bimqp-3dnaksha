const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(srcDir);

// Mapping rules
const replacements = [
  // SVG attribute exact matches
  { from: 'stroke="#38BDF8"', to: 'stroke="var(--accent-blue-light)"' },
  { from: 'stroke="#9A6A38"', to: 'stroke="var(--accent-bronze)"' },
  { from: 'stroke="#0284C7"', to: 'stroke="var(--accent-blue)"' },
  { from: 'stroke="#10B981"', to: 'stroke="var(--accent-emerald-light)"' },
  { from: 'fill="#08090B"', to: 'fill="var(--text-primary)"' },

  // Tailwind class replacements for Hex values
  { from: '#9A6A38', to: 'accent-bronze' },
  { from: '#7A5328', to: 'accent-bronze-hover' },
  { from: '#D4A373', to: 'accent-bronze-light' },
  { from: '#B45309', to: 'accent-bronze-dark' },
  { from: '#E5A93B', to: 'accent-amber-gold' },
  { from: '#D97706', to: 'accent-amber' },
  { from: '#F59E0B', to: 'accent-amber-light' },
  { from: '#F4D06F', to: 'accent-amber-bright' },
  { from: '#0284C7', to: 'accent-blue' },
  { from: '#38BDF8', to: 'accent-blue-light' },
  { from: '#059669', to: 'accent-emerald' },
  { from: '#10B981', to: 'accent-emerald-light' },
  { from: '#0A0A0A', to: 'brand-primary' },
  { from: '#1F2937', to: 'brand-secondary' },
  { from: '#4B5563', to: 'brand-muted' },
  { from: '#6B7280', to: 'brand-dim' },
  { from: '#F8F7F5', to: 'brand-canvas' },
  { from: '#F0EFEA', to: 'brand-subtle' }
];

let totalChanges = 0;

files.forEach((filePath) => {
  if (filePath.endsWith('index.css')) return; // Skip index.css itself

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (filePath.endsWith('content.ts')) {
    // Specific replacements for data/content.ts accentColors
    content = content.replace(/'#D4A373'/g, "'var(--accent-bronze-light)'");
    content = content.replace(/'#38BDF8'/g, "'var(--accent-blue-light)'");
    content = content.replace(/'#E5A93B'/g, "'var(--accent-amber-gold)'");
    content = content.replace(/'#10B981'/g, "'var(--accent-emerald-light)'");
  } else {
    // Tailwind class replacements: e.g. text-[#9A6A38] -> text-accent-bronze
    // bg-[#D4A373]/15 -> bg-accent-bronze-light/15
    // from-[#9A6A38] -> from-accent-bronze
    // border-[#0284C7] -> border-accent-blue
    replacements.forEach(({ from, to }) => {
      if (from.startsWith('stroke=') || from.startsWith('fill=')) {
        content = content.split(from).join(to);
      } else {
        const patterns = ['text-', 'bg-', 'border-', 'from-', 'via-', 'to-', 'selection:bg-', 'selection:text-'];
        patterns.forEach((prefix) => {
          const target = `${prefix}[${from}]`;
          const replacement = `${prefix}${to}`;
          content = content.split(target).join(replacement);
        });
      }
    });
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(srcDir, filePath)}`);
    totalChanges++;
  }
});

console.log(`Completed token consolidation in ${totalChanges} files.`);

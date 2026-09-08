# 3D Naksha — Architectural Visualization & Immersive VR

> **Step Inside Before You Build.**  
> Official web platform for **3D Naksha** (Part of the BIMQP Ecosystem). High-performance architectural visualization, 3D BIM modeling (AutoCAD, Revit, Navisworks), and interactive spatial walkthroughs.

---

## 🏛️ Overview

3D Naksha bridges the gap between 2D architectural blueprints and physical construction. Built as a **100% Single-Page Web Application (SPA)** with **SSG Pre-rendering**, the platform allows property buyers, architects, real estate developers, and civil engineers to interact with unbuilt spaces through real-time 3D WebGL models, scroll-scrubbed interior walkthroughs, VR headset simulation, and integrated 5-card service showcases.

---

## ✨ Key Interactive Systems & Recent Architectural Upgrades

### 1. Unified Single-Page Application & SSG Pre-Rendering
- **100% SPA Architecture:** All content lives dynamically on `/` with zero page reloads.
- **Scroll-Tied Navbar & Active Link Underline:** Navbar active underline automatically tracks user scroll position across all sections (`#hero`, `#about`, `#services`, `#target-audience`, `#process`, `#faq`, `#contact`) without jumping or reverting to default.
- **SSG Pre-Rendering Pipeline (`scripts/prerender.js`):** Pre-renders static HTML for lightning-fast initial load times and 100% SEO / social open-graph crawler compliance.

### 2. Pinned Top Hero VR Lens & 3D BIM Model Showcase (`FullBleedShowcase.tsx`)
- **Scroll-Driven VR Headset Opening:** Pinned hero section where scrolling expands the VR headset lens, bringing the user through the optics into a live interactive 3D BIM model.
- **Interactive 3D Orbit Controls:** Full desktop 360° orbit, zoom, and panning interaction with touch-optimizations for mobile.
- **Layered Hero Overlay Content:** Architectural headline, value propositions, and CTA action buttons float over the VR lens canvas.

### 3. Integrated 5-Card Services & Compact Detailed Showcase (`Services.tsx`)
- **Dynamic Connected Selector:** 5 interactive service cards (BIM 3D Modeling, 3D Architectural Renders, VR Walkthroughs, Architectural Floor Plans, 3D Animation).
- **Streamlined Compact Detailed Showcase:** Selecting any card smoothly loads its problem-solution overview, key deliverables, core advantages, and 4-step delivery workflow in a compact split-grid container without excessive page height.

### 4. High-Impact CTA Button Design System (`index.css`)
- **Vibrant Amber/Gold Color Palette:** Metallic gradient background (`linear-gradient(135deg, #B8860B 0%, #D97706 40%, #F59E0B 75%, #D97706 100%)`).
- **Guaranteed Crisp White Text (`#FFFFFF !important`):** High contrast typography across all buttons in the website (Navbar, Hero, About, Services, Target Audience, Process, FAQ, Consultation Modal, and Footer Newsletter Subscribe).
- **Glass Light-Sweep Sheen Effect:** Interactive `.btn-cta-premium::before` shimmer animation that sweeps across the button on hover.

### 5. Immersive VR Centerpiece (`60 FPS Drag-to-Pan`)
- **Direct-DOM & RAF Pipeline:** Touch and mouse drag updates bypass React state reconciliation for a smooth 60 FPS runtime.
- **Inertial Momentum Decay:** Natural coasting and damping on release.
- **Spatially-Locked Hotspots:** Interactive architectural pins track relative coordinates across the panorama.

### 6. Apple-Style Scroll Walkthrough Viewer
- **Canvas Image Sequence:** Scrub through 81 high-definition architectural frames tied to page scroll.
- **Dynamic Mini-Map Radar:** Rotating illuminated FOV radar cone synchronized with the current camera perspective.

---

## 🛠️ Technology Stack

- **Core Framework:** React 19, TypeScript
- **Bundler & Tooling:** Vite 8, Rolldown
- **3D Graphics & WebGL:** Three.js, OrbitControls, GLTFLoader
- **Styling:** Tailwind CSS v4, Custom Design System (`index.css`)
- **Animation & Scrolling:** GSAP 3, ScrollTrigger, Lenis Smooth Scroll
- **Icons:** Lucide React
- **Static Site Generation:** Node.js Express static crawler & pre-render pipeline (`scripts/prerender.js`)

---

## ⚡ Performance & Pre-Rendering Status

The project achieves high Core Web Vitals scores and 100% SSG crawl compliance:

- **Performance Score:** **98 / 100** (Desktop)
- **Cumulative Layout Shift (CLS):** **0.000**
- **Crawl Graph & Route Validation:** **100% Pass** (6 pre-rendered routes verified)

---

## 📁 Project Structure

```
3dnaksha/
├── public/                     # Static public assets, 3D models & favicon
├── scripts/
│   └── prerender.js            # Node.js SSG pre-render and crawl validator
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Top nav with active section indicator underline
│   │   │   └── Footer.tsx      # Footer, sitemap, contact info & subscribe CTA
│   │   ├── modals/
│   │   │   ├── ConsultationModal.tsx  # Project inquiry modal form
│   │   │   └── LightboxModal.tsx      # Fullscreen project gallery modal
│   │   ├── sections/
│   │   │   ├── FullBleedShowcase.tsx  # Top Hero VR lens transition & 3D BIM model
│   │   │   ├── AboutSection.tsx       # Company vision & VR demonstration
│   │   │   ├── Services.tsx           # 5-card selector & compact detailed showcase
│   │   │   ├── TargetAudience.tsx     # AEC stakeholder persona cards
│   │   │   ├── Process.tsx            # 5-step collaborative workflow
│   │   │   ├── FAQSection.tsx         # Frequently asked questions accordion
│   │   │   └── CallToAction.tsx       # Direct inquiry & booking form widget
│   │   └── ui/
│   │       ├── BIMModelViewer3D.tsx   # Three.js 3D WebGL model viewer
│   │       ├── ComparisonSlider.tsx   # Depth-parallax comparison slider
│   │       ├── VRLensEffect.tsx       # Barrel distortion & chromatic aberration
│   │       ├── ScrollProgressBar.tsx  # Top scroll progress indicator
│   │       └── Badge.tsx              # Architectural metadata tags
│   ├── hooks/
│   │   ├── useInView.ts               # IntersectionObserver viewport hook
│   │   └── useScrollProgress.ts       # Smooth scroll progress tracking
│   ├── lib/
│   │   └── animations.ts              # GSAP, ScrollTrigger, & Lenis configuration
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces & types
│   ├── App.tsx                        # Root SPA application layout
│   ├── main.tsx                       # React DOM entry point
│   └── index.css                      # Tailwind CSS v4 & CTA button design tokens
├── index.html                         # HTML template & pre-connect font links
├── vite.config.ts                     # Vite build configuration & chunk splitting
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies & build scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher

### Installation
```bash
# Navigate to workspace
cd 3dnaksha

# Install dependencies
npm install
```

### Development Server
```bash
# Start Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & SSG Pre-Render
```bash
# Type-check, compile Vite bundle, and run SSG pre-render
npm run build
```
Compiled static assets and pre-rendered HTML files are generated in the `dist/` directory.

### Preview Production Build
```bash
# Preview production build locally
npm run preview
```

---

## 🌐 Deployment to cPanel / Static Web Hosting

To deploy 3D Naksha to your production server:

1. Run the build script:
   ```bash
   npm run build
   ```
2. Open the `dist/` directory.
3. Select all contents inside `dist/` (`index.html`, `assets/`, `public/` files) and zip them into an archive.
4. Upload and extract into your web host document root (`public_html/`).

---

## 📄 License & Ownership

© 2026 **3D Naksha** (Part of the **BIMQP Ecosystem**). All rights reserved.

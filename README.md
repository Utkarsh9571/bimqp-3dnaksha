# 3D Naksha — Architectural Visualization & Immersive VR

> **Step Inside Before You Build.**  
> Official web platform for **3D Naksha** (Part of the BIMQP Ecosystem). High-performance architectural visualization, 3D BIM modeling (AutoCAD, Revit, Navisworks), and interactive spatial walkthroughs.

---

## 🏛️ Overview

3D Naksha bridges the gap between 2D architectural blueprints and physical construction. The web application allows prospective property buyers, architects, real estate developers, and civil engineers to interact with unbuilt spaces through real-time 3D WebGL models, scroll-scrubbed interior walkthroughs, and VR-ready spatial simulations.

---

## ✨ Key Interactive Systems

### 1. Interactive 3D BIM Model Viewer (`Three.js`)
- **360° Orbit & Zoom:** Click-and-drag / touch-drag to orbit around the structure; wheel / pinch to zoom with clamped camera distances.
- **Parametric Architecture & GLTF/GLB Support:** Renders multi-floor structural steel grids, concrete podiums, glass curtain walls (`MeshPhysicalMaterial` with transmission), and timber louvers. Accepts custom Revit/Navisworks exported `.glb` models via `modelUrl`.
- **Scroll-Tied Camera Path:** Cinematic camera elevation and rotation synchronized with GSAP ScrollTrigger. Automatically pauses when manual orbit interaction is detected.
- **Structural Layers Toggle:** Switch instantly between **"BIM Wireframe / Structural Layers"** and **"Solid BIM Model"**.
- **Live Telemetry HUD:** Real-time feedback displaying camera azimuth, elevation angles, camera distance in meters, and WebGL status.

### 2. Immersive VR Centerpiece (`60 FPS Drag-to-Pan`)
- **Direct-DOM & RAF Pipeline:** Touch and mouse drag updates bypass React state reconciliation to deliver a silky-smooth **57.4 FPS** runtime on throttled mobile CPUs.
- **Inertial Momentum Decay:** Natural coasting and damping on release.
- **Spatially-Locked Hotspots:** Interactive architectural pins track relative coordinates across the wide panorama.

### 3. VR Lens Optical Distortion Shader (`VRLensEffect`)
- **Curved Barrel Optics:** Subtle radial vignette and lens curvature simulating a physical VR headset display.
- **Peripheral Chromatic Aberration:** Red/cyan channel separation at image boundaries.
- **Off-Thread Lens Glint:** Optimized CSS/IntersectionObserver light beam effect that consumes 0ms of CPU script time.

### 4. Interactive Hero Wireframe Assembly
- **Scroll-Driven SVG Blueprint:** Architectural wireframe lines assemble themselves via `strokeDashoffset` animations as the user scrolls.
- **Luminous Vertex Nodes:** 16 coordinate anchor points with subtle pulsing halos.
- **Floor Depth Fog:** Radial floor gradient creating atmospheric depth.

### 5. Apple-Style Scroll Walkthrough Viewer
- **Canvas Image Sequence:** Scrub through 81 high-definition architectural frames tied to page scroll.
- **Dynamic Mini-Map Radar:** Rotating illuminated FOV radar cone synchronized with the current camera perspective.

### 6. Interactive Before/After Evolution Slider
- **Comparison Slider:** Compare raw structural concrete vs. finished architectural spaces.
- **Depth-Map Parallax:** RAF-throttled hover parallax on desktop with automatic bypass on touch devices.

---

## 🛠️ Technology Stack

- **Core Framework:** React 19, TypeScript
- **Bundler & Tooling:** Vite 8, Rolldown
- **3D Graphics & WebGL:** Three.js, OrbitControls, GLTFLoader
- **Styling:** Tailwind CSS v4, Vanilla CSS Design System
- **Animation & Scrolling:** GSAP 3, ScrollTrigger, Lenis Smooth Scroll
- **Icons:** Lucide React

---

## ⚡ Performance & Code Splitting

The project is built around strict Core Web Vitals budgets for desktop and mobile:

| Metric | Desktop | Mobile (Throttled 4G / 4x CPU) |
| :--- | :--- | :--- |
| **Performance Score** | **98 / 100** | **82–85 / 100** |
| **Total Blocking Time (TBT)** | **0 ms** | **130–200 ms** |
| **Cumulative Layout Shift (CLS)** | **0.000** | **0.000** |
| **First Contentful Paint (FCP)** | **0.8–0.9 s** | **3.0 s** |
| **Initial Bundle Size** | **78.3 kB** (gzip: 23.0 kB) | **78.3 kB** (gzip: 23.0 kB) |

### Code Splitting Architecture
- `vendor-react`: Core React & React-DOM runtime.
- `vendor-gsap`: GSAP & ScrollTrigger engine.
- `vendor-three`: Three.js & WebGL loaders (isolated into a ~156 kB gzip chunk that **only loads on-demand** when the user scrolls near the 3D showcase).
- `vendor-icons`: Lucide icon bundle.
- **Below-the-Fold Sections:** Lazy-loaded with `React.lazy()` and `<Suspense>`.
- **Viewport-Aware Render Loops:** All WebGL and RAF animation loops automatically suspend when scrolled out of view.

---

## 📁 Project Structure

```
3dnaksha/
├── public/                     # Static public assets & favicon
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Fixed top navigation & consultation trigger
│   │   │   └── Footer.tsx      # Footer, sitemap & BIMQP ecosystem badges
│   │   ├── modals/
│   │   │   ├── ConsultationModal.tsx  # Interactive booking & inquiry modal
│   │   │   └── LightboxModal.tsx      # Fullscreen project gallery modal
│   │   ├── sections/
│   │   │   ├── Hero.tsx               # Above-the-fold hero & CTA
│   │   │   ├── OperatingRegions.tsx   # Regional hubs (NCR, Mumbai, Bangalore, etc.)
│   │   │   ├── ExperienceUnbuilt.tsx   # 3-Stage evolution & comparison slider
│   │   │   ├── FeatureCardsGrid.tsx   # Core AEC visual deliverables
│   │   │   ├── LifecycleJourney.tsx   # Project phases from Concept to Handover
│   │   │   ├── ScrollWalkthroughViewer.tsx # 81-frame canvas scrub + mini-map
│   │   │   ├── Services.tsx           # 5 flagship service offerings
│   │   │   ├── FullBleedShowcase.tsx  # Pinned 3D BIM Model Viewer section
│   │   │   ├── ImmersiveVR.tsx        # 360° Drag-to-pan VR exploration
│   │   │   ├── TargetAudience.tsx     # AEC stakeholder persona cards
│   │   │   ├── Process.tsx            # 5-step collaborative workflow
│   │   │   ├── PortfolioGallery.tsx   # Filterable visualization showcase
│   │   │   ├── FAQSection.tsx         # Frequently asked questions accordion
│   │   │   └── CallToAction.tsx       # Closing high-conversion banner
│   │   └── ui/
│   │       ├── BIMModelViewer3D.tsx   # Three.js 3D WebGL model viewer
│   │       ├── ComparisonSlider.tsx   # Depth-parallax comparison slider
│   │       ├── VRLensEffect.tsx       # Barrel distortion & chromatic aberration
│   │       ├── WireframeBuildingInterior.tsx # SVG blueprint stroke assembly
│   │       ├── ScrollProgressBar.tsx  # Top scroll progress indicator
│   │       ├── SectionHeading.tsx     # Standardized architectural headings
│   │       └── Badge.tsx              # Architectural metadata tags
│   ├── hooks/
│   │   ├── useInView.ts               # IntersectionObserver viewport hook
│   │   └── useScrollProgress.ts       # Smooth scroll progress tracking
│   ├── lib/
│   │   └── animations.ts              # GSAP, ScrollTrigger, & Lenis configuration
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces & types
│   ├── App.tsx                        # Root application & lazy suspense boundaries
│   ├── main.tsx                       # React DOM entry point
│   └── index.css                      # Tailwind CSS v4 & custom design tokens
├── index.html                         # HTML template & pre-connect font links
├── vite.config.ts                     # Vite build configuration & chunk splitting
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher

### Installation
```bash
# Clone or navigate to repository
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

### Production Build
```bash
# Type-check and compile optimized production bundle
npm run build
```
Compiled output is generated in the `dist/` directory.

### Preview Production Build Locally
```bash
# Preview the production build
npm run preview
```

---

## 🌐 Deployment to cPanel / Static Web Hosting

To deploy 3D Naksha to your production domain ([3dnaksha.com](https://3dnaksha.com/)):

1. Run the production build command:
   ```bash
   npm run build
   ```
2. Open the newly generated [`dist/`](file:///c:/Users/danish/Desktop/3dnaksha/dist) folder.
3. Select all files and folders inside `dist/` (`index.html`, `assets/`, `favicon`, etc.) and compress them into a `.zip` archive.
4. Log into your **cPanel** dashboard.
5. Open **File Manager** and navigate to `public_html/` (or the document root for your domain).
6. Upload the `.zip` archive and **Extract** all files into `public_html/`.
7. Ensure `index.html` is located directly in `public_html/index.html`.

> [!TIP]
> `vite.config.ts` is configured with `base: './'`, ensuring that all asset URLs resolve correctly whether hosted at the root domain or within a subfolder.

---

## 📐 3D BIM Model Asset Guidelines

When exporting custom architectural models from **AutoCAD**, **Autodesk Revit**, **Navisworks**, or **Blender** for inclusion in the 3D Viewer:

- **Format:** Binary glTF (`.glb`).
- **Target Polygon Count:** 50,000 – 150,000 triangles for smooth 60 FPS mobile performance.
- **Target File Size:** Under **5 MB** (use Draco geometry compression or `gltf-transform`).
- **Textures:** Power-of-two resolutions (e.g. 1024x1024 or 2048x2048) in WebP / PNG format.
- **Usage:** Place your `.glb` file in `public/models/` and pass the path to `FullBleedShowcase`:
  ```tsx
  <FullBleedShowcase modelUrl="/models/my_building.glb" />
  ```

---

## 📄 License & Ownership

© 2026 **3D Naksha** (Part of the **BIMQP Ecosystem**). All rights reserved.

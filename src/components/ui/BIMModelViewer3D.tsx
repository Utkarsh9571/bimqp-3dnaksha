import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { prefersReducedMotion } from '../../lib/animations';
import { Box, Layers, RotateCcw, AlertTriangle } from 'lucide-react';

interface BIMModelViewer3DProps {
  className?: string;
  onCameraChange?: (azimuth: number, elevation: number, distance: number) => void;
}

/**
 * BIMModelViewer3D
 * 
 * High-performance 3D Architectural / BIM Model Viewer powered by Three.js.
 * - Interactive OrbitControls (rotate, pan, pinch/wheel zoom)
 * - Real-time shader materials for architectural glass, steel beams, and concrete slabs
 * - Full WebGL detection with graceful fallback
 * - Viewport-aware: only executes animation loop when visible in viewport (0ms background CPU)
 */
export const BIMModelViewer3D: React.FC<BIMModelViewer3DProps> = ({
  className = '',
  onCameraChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isWebGlSupported, setIsWebGlSupported] = useState<boolean>(true);
  const [isWireframeMode, setIsWireframeMode] = useState<boolean>(false);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const wireframeGroupRef = useRef<THREE.Group | null>(null);
  const solidGroupRef = useRef<THREE.Group | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isInitializedRef = useRef<boolean>(false);
  const userInteractionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isReduced = prefersReducedMotion();

  // 1. Viewport Visibility Tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { rootMargin: '200px', threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);


  // 2. Build Procedural Architectural BIM Model
  const buildProceduralBIMModel = useCallback((scene: THREE.Scene) => {
    const modelGroup = new THREE.Group();
    const solidGroup = new THREE.Group();
    const wireGroup = new THREE.Group();

    // Architectural Material Palette
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      roughness: 0.85,
      metalness: 0.1
    });

    const steelColumnMaterial = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.4,
      metalness: 0.8
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5,
      thickness: 0.5
    });

    const woodLouversMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4A373,
      roughness: 0.6,
      metalness: 0.05
    });

    const accentGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xE5A93B,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x332200
    });

    const blueprintLineMaterial = new THREE.LineBasicMaterial({
      color: 0x0284C7,
      transparent: true,
      opacity: 0.75
    });

    // A. Foundation Podium Slab
    const podiumGeo = new THREE.BoxGeometry(16, 0.6, 12);
    const podiumMesh = new THREE.Mesh(podiumGeo, concreteMaterial);
    podiumMesh.position.y = -0.3;
    podiumMesh.receiveShadow = true;
    solidGroup.add(podiumMesh);

    const podiumEdges = new THREE.EdgesGeometry(podiumGeo);
    const podiumWire = new THREE.LineSegments(podiumEdges, blueprintLineMaterial);
    podiumWire.position.copy(podiumMesh.position);
    wireGroup.add(podiumWire);

    // B. Ground Blueprint Grid Base
    const gridHelper = new THREE.GridHelper(24, 24, 0x0284C7, 0x334155);
    gridHelper.position.y = -0.6;
    (gridHelper.material as THREE.Material).opacity = 0.4;
    (gridHelper.material as THREE.Material).transparent = true;
    modelGroup.add(gridHelper);

    // C. 3-Storey Architectural Tower
    const floorCount = 3;
    const floorHeight = 2.4;
    const towerWidth = 10;
    const towerDepth = 8;

    for (let f = 0; f < floorCount; f++) {
      const floorY = f * floorHeight;

      const slabGeo = new THREE.BoxGeometry(towerWidth + 0.4, 0.25, towerDepth + 0.4);
      const slabMesh = new THREE.Mesh(slabGeo, concreteMaterial);
      slabMesh.position.set(0, floorY, 0);
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      solidGroup.add(slabMesh);

      const slabEdges = new THREE.EdgesGeometry(slabGeo);
      const slabWire = new THREE.LineSegments(slabEdges, blueprintLineMaterial);
      slabWire.position.copy(slabMesh.position);
      wireGroup.add(slabWire);

      const glassGeo = new THREE.BoxGeometry(towerWidth, floorHeight - 0.25, towerDepth);
      const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
      glassMesh.position.set(0, floorY + (floorHeight - 0.25) / 2, 0);
      solidGroup.add(glassMesh);

      const colRadius = 0.12;
      const colPositions = [
        [-towerWidth / 2 + 0.3, -towerDepth / 2 + 0.3],
        [towerWidth / 2 - 0.3, -towerDepth / 2 + 0.3],
        [-towerWidth / 2 + 0.3, towerDepth / 2 - 0.3],
        [towerWidth / 2 - 0.3, towerDepth / 2 - 0.3],
        [0, -towerDepth / 2 + 0.3],
        [0, towerDepth / 2 - 0.3],
        [-towerWidth / 2 + 0.3, 0],
        [towerWidth / 2 - 0.3, 0]
      ];

      colPositions.forEach(([cx, cz]) => {
        const colGeo = new THREE.CylinderGeometry(colRadius, colRadius, floorHeight, 12);
        const colMesh = new THREE.Mesh(colGeo, steelColumnMaterial);
        colMesh.position.set(cx, floorY + floorHeight / 2, cz);
        colMesh.castShadow = true;
        solidGroup.add(colMesh);

        const colEdges = new THREE.EdgesGeometry(colGeo);
        const colWire = new THREE.LineSegments(colEdges, blueprintLineMaterial);
        colWire.position.copy(colMesh.position);
        wireGroup.add(colWire);
      });

      if (f > 0) {
        for (let l = 0; l < 8; l++) {
          const louverGeo = new THREE.BoxGeometry(0.1, floorHeight * 0.8, 0.4);
          const louverMesh = new THREE.Mesh(louverGeo, woodLouversMaterial);
          louverMesh.position.set(-towerWidth / 2 - 0.1, floorY + floorHeight / 2, -towerDepth / 2 + 1 + l * 0.8);
          louverMesh.rotation.y = 0.3;
          solidGroup.add(louverMesh);
        }
      }
    }

    // D. Cantilevered Roof Canopy
    const roofY = floorCount * floorHeight;
    const canopyGeo = new THREE.BoxGeometry(towerWidth + 2.5, 0.3, towerDepth + 2);
    const canopyMesh = new THREE.Mesh(canopyGeo, concreteMaterial);
    canopyMesh.position.set(0.6, roofY, 0.2);
    canopyMesh.castShadow = true;
    solidGroup.add(canopyMesh);

    const canopyEdges = new THREE.EdgesGeometry(canopyGeo);
    const canopyWire = new THREE.LineSegments(canopyEdges, accentGoldMaterial);
    canopyWire.position.copy(canopyMesh.position);
    wireGroup.add(canopyWire);

    for (let i = 0; i < 6; i++) {
      const beamGeo = new THREE.BoxGeometry(0.15, 0.35, towerDepth + 1.6);
      const beamMesh = new THREE.Mesh(beamGeo, steelColumnMaterial);
      beamMesh.position.set(-3 + i * 1.2, roofY + 0.3, 0.2);
      solidGroup.add(beamMesh);
    }

    // E. Luminous Vertex Points
    const vertexPointsGeo = new THREE.BufferGeometry();
    const vertexCoords: number[] = [];
    for (let f = 0; f <= floorCount; f++) {
      const y = f * floorHeight;
      vertexCoords.push(
        -towerWidth / 2, y, -towerDepth / 2,
        towerWidth / 2, y, -towerDepth / 2,
        towerWidth / 2, y, towerDepth / 2,
        -towerWidth / 2, y, towerDepth / 2,
        0, y, 0
      );
    }
    vertexPointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertexCoords, 3));
    const vertexPointMaterial = new THREE.PointsMaterial({
      color: 0x38BDF8,
      size: 0.35,
      transparent: true,
      opacity: 0.9
    });
    const vertexPoints = new THREE.Points(vertexPointsGeo, vertexPointMaterial);
    wireGroup.add(vertexPoints);

    modelGroup.visible = true;

    modelGroup.add(solidGroup);
    modelGroup.add(wireGroup);
    scene.add(modelGroup);

    modelGroupRef.current = modelGroup;
    solidGroupRef.current = solidGroup;
    wireframeGroupRef.current = wireGroup;
  }, []);

  // 3. Initialize Three.js Scene
  useEffect(() => {
    if (!isInViewport && !isInitializedRef.current) return;
    if (isInitializedRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL Support
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setIsWebGlSupported(false);
        setIsLoading(false);
        return;
      }
    } catch {
      setIsWebGlSupported(false);
      setIsLoading(false);
      return;
    }

    isInitializedRef.current = true;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(16, 10, 18);
    camera.lookAt(0, 3.5, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 0.6;
    controls.minDistance = 6;
    controls.maxDistance = 45;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.target.set(0, 3.5, 0);

    // Two-finger touch gesture for mobile: 1 finger scrolls the page, 2 fingers orbit & zoom
    controls.touches = {
      TWO: THREE.TOUCH.DOLLY_ROTATE
    };
    // Ensure 1-finger touch is not assigned to any action
    delete (controls.touches as Record<string, unknown>).ONE;
    
    // Explicitly override OrbitControls' internal touchAction='none' so single-finger vertical swipes scroll
    canvas.style.touchAction = 'pan-y';
    controlsRef.current = controls;

    const handleControlStart = () => {
      setIsUserInteracting(true);
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
    };

    const handleControlEnd = () => {
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
      userInteractionTimeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 4000);
    };

    controls.addEventListener('start', handleControlStart);
    controls.addEventListener('end', handleControlEnd);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFF7ED, 2.4);
    sunLight.position.set(20, 30, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x38BDF8, 0.8);
    fillLight.position.set(-15, 10, -10);
    scene.add(fillLight);

    buildProceduralBIMModel(scene);
    setIsLoading(false);
    setLoadProgress(100);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', handleControlStart);
      controls.removeEventListener('end', handleControlEnd);
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, [isInViewport, buildProceduralBIMModel]);

  // 4. Viewport-Aware Animation Render Loop
  useEffect(() => {
    if (!isInViewport || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    let lastTime = performance.now();

    const animate = (now: number) => {
      rafIdRef.current = requestAnimationFrame(animate);
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (controls) controls.update();

      if (onCameraChange && camera && controls) {
        const spherical = new THREE.Spherical().setFromVector3(
          camera.position.clone().sub(controls.target)
        );
        onCameraChange(
          Math.round(THREE.MathUtils.radToDeg(spherical.theta)),
          Math.round(THREE.MathUtils.radToDeg(spherical.phi)),
          parseFloat(spherical.radius.toFixed(1))
        );
      }

      if (!isUserInteracting && !isReduced && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += delta * 0.1;
      }

      renderer.render(scene, camera);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isInViewport, isUserInteracting, isReduced, onCameraChange]);



  const toggleWireframe = () => {
    setIsWireframeMode(!isWireframeMode);
    if (solidGroupRef.current) {
      solidGroupRef.current.visible = isWireframeMode;
    }
  };

  const resetCameraView = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(16, 10, 18);
    controlsRef.current.target.set(0, 3.5, 0);
    controlsRef.current.update();
    setIsUserInteracting(false);
  };

  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    setIsTouchDevice(Boolean('ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-pan-y cursor-grab active:cursor-grabbing"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#08090B]/90 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#38BDF8]/20 border-t-[#38BDF8] animate-spin mb-4" />
          <div className="font-mono-tech text-xs text-white tracking-widest uppercase mb-2">
            LOADING 3D BIM MODEL // {loadProgress}%
          </div>
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#38BDF8] via-[#D4A373] to-[#E5A93B] transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 font-mono-tech mt-3">
            AutoCAD • Revit • Navisworks 3D Geometry
          </p>
        </div>
      )}

      {/* WebGL Unsupported Graceful Fallback */}
      {!isWebGlSupported && (
        <div className="absolute inset-0 bg-[#08090B] z-40 flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle className="w-10 h-10 text-[#E5A93B] mb-3" />
          <h4 className="text-white font-display font-bold text-lg mb-1">
            3D WebGL Acceleration Unavailable
          </h4>
          <p className="text-xs text-gray-400 max-w-md mb-4">
            Your browser or device does not have hardware-accelerated WebGL enabled. Viewing high-resolution architectural render fallback.
          </p>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
            alt="Architectural Visualization Fallback"
            className="rounded-md max-w-lg max-h-64 object-cover border border-white/20"
          />
        </div>
      )}

      {/* Top Center: View Mode Toggles & Camera Reset */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#08090B]/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-2xl">
        <button
          onClick={toggleWireframe}
          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono-tech font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            isWireframeMode
              ? 'bg-[#38BDF8] text-[#08090B] shadow-xs'
              : 'text-white/80 hover:text-white'
          }`}
          title="Toggle BIM Wireframe / Structural Layers"
        >
          <Layers className="w-3 h-3" />
          <span>{isWireframeMode ? 'BIM Wireframe' : 'Solid BIM Model'}</span>
        </button>

        <span className="w-[1px] h-3.5 bg-white/20" />

        <button
          onClick={resetCameraView}
          className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Reset Camera View"
          aria-label="Reset Camera View"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Bottom Center: Interactive Orbit Drag Hint (Touch vs Mouse Aware) */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4 text-center max-w-full">
        <div
          className={`rounded-full bg-[#08090B]/85 backdrop-blur-md border border-white/20 px-4 py-1.5 shadow-2xl inline-flex items-center justify-center gap-2 font-mono-tech text-[10px] sm:text-xs text-white/90 transition-opacity duration-300 ${
            isUserInteracting ? 'opacity-30' : 'opacity-90'
          }`}
        >
          <Box className="w-3 h-3 text-[#38BDF8] shrink-0 animate-pulse" />
          <span className="tracking-wider uppercase">
            {isTouchDevice
              ? '2 FINGERS TO ORBIT & ZOOM • 1 FINGER TO SCROLL'
              : 'CLICK & DRAG TO ORBIT 3D MODEL • SCROLL WHEEL TO ZOOM'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BIMModelViewer3D;

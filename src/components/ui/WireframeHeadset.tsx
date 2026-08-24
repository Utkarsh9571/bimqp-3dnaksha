import React from 'react';

export const WireframeHeadset: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    viewBox="0 0 100 60" 
    className={`w-full h-full overflow-visible ${className}`}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="0.5" 
    vectorEffect="non-scaling-stroke"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Headset Body Blueprint Lines */}
    <path 
      d="M10,25 C10,15 20,10 50,10 C80,10 90,15 90,25 L92,35 C94,45 80,50 50,50 C20,50 6,45 8,35 Z" 
      stroke="rgba(56, 189, 248, 0.6)" 
      strokeDasharray="1, 1"
    />
    <path 
      d="M15,25 C15,18 25,14 50,14 C75,14 85,18 85,25 L86,35 C88,42 75,46 50,46 C25,46 12,42 14,35 Z" 
      stroke="var(--accent-blue-light)" 
    />
    
    {/* Left Lens */}
    <circle cx="35" cy="30" r="10" stroke="var(--accent-blue-light)" strokeWidth="0.75" />
    <circle cx="35" cy="30" r="6" stroke="rgba(56, 189, 248, 0.4)" strokeDasharray="0.5, 1" />
    
    {/* Right Lens */}
    <circle cx="65" cy="30" r="10" stroke="var(--accent-blue-light)" strokeWidth="0.75" />
    <circle cx="65" cy="30" r="6" stroke="rgba(56, 189, 248, 0.4)" strokeDasharray="0.5, 1" />
    
    {/* Center Bridge */}
    <path d="M45,28 Q50,25 55,28" stroke="var(--accent-blue-light)" />
    <path d="M45,32 Q50,35 55,32" stroke="var(--accent-blue-light)" />

    {/* Headstrap / Technical Nodes */}
    <circle cx="10" cy="25" r="1.5" fill="var(--text-primary)" stroke="var(--accent-blue-light)" />
    <circle cx="90" cy="25" r="1.5" fill="var(--text-primary)" stroke="var(--accent-blue-light)" />
    
    {/* Alignment Crosshairs (Lens Centers) */}
    <path d="M35,28 L35,32 M33,30 L37,30" stroke="var(--accent-emerald-light)" strokeWidth="0.3" />
    <path d="M65,28 L65,32 M63,30 L67,30" stroke="var(--accent-emerald-light)" strokeWidth="0.3" />
  </svg>
);

export default WireframeHeadset;

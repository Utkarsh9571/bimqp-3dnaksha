import React, { useRef, useEffect } from 'react';
import {
  Glasses as _Glasses,
  Home as _Home,
  Palette as _Palette,
  Layers as _Layers,
  Building2 as _Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { gsap, prefersReducedMotion } from '../../lib/animations';

interface AboutSectionProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance animation for cards and workflow nodes
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Fade-up stagger for value pillars & audience cards
      gsap.from('.about-stagger-card', {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /*
  const disciplines = [
    {
      num: '01',
      title: 'Immersive VR Services',
      subtitle: 'The Core of Our Innovation',
      desc: 'High-accuracy, walk-through digital environments that let you experience spatial scale, depth, and aesthetics in real-time before construction.',
      icon: _Glasses,
      badge: 'Flagship Immersive'
    },
    {
      num: '02',
      title: 'Home Design',
      subtitle: 'Next-Gen Architectural Planning',
      desc: 'Next-generation architectural planning that optimizes spatial flow, structural integrity, and natural lighting for modern residences.',
      icon: _Home,
      badge: 'Architectural'
    },
    {
      num: '03',
      title: 'Interior Design',
      subtitle: 'Interactive Virtual Interiors',
      desc: 'Curated, interactive virtual interiors where finishes, materials, textures, and lighting can be previewed and perfected dynamically.',
      icon: _Palette,
      badge: 'Spatial Ambiance'
    },
    {
      num: '04',
      title: 'BIM Modelling',
      subtitle: 'High-Precision 3D BIM Engineering',
      desc: 'High-precision Building Information Modelling that allows engineers and developers to detect structural clashes and streamline procurement.',
      icon: _Layers,
      badge: '3D Coordination'
    },
    {
      num: '05',
      title: 'Construction Project Management',
      subtitle: 'Data-Driven Field Alignment',
      desc: 'Data-driven oversight aligning on-site execution perfectly with the approved virtual model, eliminating costly re-work and field delays.',
      icon: _Building2,
      badge: 'Field Precision'
    }
  ];
  */

  const valuePillars = [
    {
      num: '01',
      title: 'Zero Visual Guesswork',
      desc: "You don't have to look at a grid of lines and guess what your bedroom or commercial lounge will feel like. You already know.",
      icon: ShieldCheck,
      benefit: '100% Spatial Confidence'
    },
    {
      num: '02',
      title: 'Cost & Time Efficiency',
      desc: 'Catching a layout flaw or changing a tile color inside a VR headset costs nothing. Changing it on a live construction site costs thousands.',
      icon: Zap,
      benefit: 'Prevent On-Site Rework'
    },
    {
      num: '03',
      title: 'Seamless Collaboration',
      desc: 'We serve as the ultimate single source of truth, aligning clients, architects, and on-site contractors under a unified vision.',
      icon: Users,
      benefit: 'Single Source of Truth'
    }
  ];

  return (
    <section id="about" ref={containerRef} className="bg-brand-canvas relative py-20 sm:py-28 border-t border-gray-200 overflow-hidden">
      {/* Ambient Blueprint Background Effects */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-accent-bronze/10 via-accent-amber-gold/5 to-accent-blue/8 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 sm:space-y-32">

        {/* =========================================================
            01 // ABOUT 3D NAKSHA (Headline & Global BIMQP Backing)
           ========================================================= */}
        <div className="space-y-8">
          <SectionHeading
            number="01"
            badgeText=""
            badgeVariant="amber"
            title="About"
            highlightText="Us"
            //subtitle="India’s premier destination for advanced Building Information Modeling (BIM), intelligent construction management, and immersive VR spatial reviews."
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* LEFT CARD: Main About 3D Naksha Content Card */}
            <div className="lg:col-span-7 architectural-panel p-6 sm:p-8 rounded-xl border border-gray-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between space-y-6">
              <div className="space-y-6 text-base text-brand-muted leading-relaxed font-sans">
                <p className="text-lg text-brand-primary font-medium leading-relaxed">
                  Welcome to <strong className="text-accent-bronze font-bold">3D Naksha</strong>, a pioneering force transforming how buildings are conceived, evaluated, and constructed across India.
                </p>

                <p>
                  Backed by Singapore’s <strong className="text-brand-primary font-bold">BIMQP</strong> — a trusted leader with 15 to 20 years of global engineering expertise — we bring world-class digital precision directly to the Indian AEC (Architecture, Engineering, and Construction) landscape.
                </p>

                <p>
                  As a pioneering force, 3D Naksha is the first company in India to introduce immersive Virtual Reality (VR) model reviews, allowing clients, design teams, and builders to physically step inside and completely evaluate their project before ground is ever broken.
                </p>
              </div>

              {/* Endorsement Pill */}
              <div className="pt-2 mt-auto">
                <div className="p-4 rounded-sm bg-brand-canvas border border-gray-200 shadow-2xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-200 flex items-center justify-center text-accent-bronze shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="font-mono-tech text-xs">
                    <span className="font-bold text-brand-primary block">Backed by Singapore’s BIMQP</span>
                    <span className="text-gray-600">15–20 Years of Global Digital Engineering & BIM Leadership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CARD: VR Experience Visual Showcase Panel */}
            <div className="lg:col-span-5 architectural-panel p-3 sm:p-4 rounded-xl border border-gray-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.05)] relative overflow-hidden corner-crosshairs flex flex-col justify-between min-h-[360px] sm:min-h-[420px] group">
              <div className="relative w-full h-full min-h-[320px] rounded-lg overflow-hidden flex flex-col justify-between p-5 text-white">
                {/* Background VR Image with Overlay */}
                <img
                  src="/assets/images/about-vr-showcase.jpg"
                  alt="1:1 Human-Scale Architectural VR Walkthrough Experience"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30"></div>

                {/* Top Badge Overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono-tech text-[11px] text-amber-300 font-bold tracking-widest uppercase bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-amber-300/30">
                    1:1 Human-Scale VR Walkthrough
                  </span>
                  <Badge variant="blue" size="sm">First in India</Badge>
                </div>

                {/* Bottom Content & Action Overlay */}
                <div className="relative z-10 space-y-4 mt-auto pt-12">
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-lg text-white leading-snug drop-shadow-xs">
                      Experience Unbuilt Spaces in Virtual Reality
                    </h4>
                    <p className="font-mono-tech text-xs text-gray-200 leading-relaxed max-w-md drop-shadow-xs">
                      Walk inside your architectural designs at true 1:1 scale before construction begins.
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenConsultation?.('About 3D Naksha VR Experience')}
                    className="w-full py-3 px-4 rounded-sm bg-accent-bronze hover:bg-accent-bronze-hover text-white font-display font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg backdrop-blur-xs border border-white/20"
                  >
                    <span>Discuss Your Project Vision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            02 // WHO WE ARE (Core Team & Transformation Narrative)
           ========================================================= */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-accent-bronze tracking-[0.2em] uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                <span>02 // WHO WE ARE</span>
              </div>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-brand-primary tracking-tight max-w-2xl leading-[1.15]">
                We bridge the gap between what is designed and what is built.
              </h3>
            </div>

            <p className="text-xs font-mono-tech text-gray-600 max-w-xs leading-relaxed">
              Transforming complex technical drafts and 2D floor plans into fully immersive, error-free spatial realities.
            </p>
          </div>

          {/* Narrative Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: Who We Are */}
            <div className="architectural-panel p-6 sm:p-8 rounded-lg border border-gray-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-mono-tech text-xs text-accent-amber font-bold uppercase tracking-wider">
                  Multidisciplinary Expertise
                </div>
                <h4 className="font-display font-bold text-xl text-brand-primary">
                  Architects, Designers & BIM Engineers
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
                  We are a team of visionary architects, interior designers, BIM engineers, and technology innovators. We recognized a major gap in the traditional building process: the disconnect between a client’s vision and the final physical structure.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 font-mono-tech text-xs text-accent-bronze font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-bronze" />
                <span>3D Naksha was born to solve this disconnect.</span>
              </div>
            </div>

            {/* Right Card: Conceptual Spatial Transformation Flow */}
            <div ref={flowRef} className="architectural-panel-glow p-6 sm:p-8 rounded-lg border border-accent-bronze/30 space-y-6 flex flex-col justify-between">
              <div>
                <div className="font-mono-tech text-xs text-accent-bronze font-bold uppercase tracking-wider mb-2">
                  Spatial Evolution Flow
                </div>
                <h4 className="font-display font-bold text-xl text-brand-primary mb-4">
                  From 2D Line Drafts to 1:1 VR Reality
                </h4>

                {/* 3-Step Flow Spectrum */}
                <div className="grid grid-cols-3 gap-2 font-mono-tech text-center text-xs pt-2">
                  <div className="p-3 rounded-sm bg-white border border-gray-200 space-y-1">
                    <span className="block text-[10px] text-gray-500 font-bold">STEP 01</span>
                    <strong className="block text-brand-primary text-xs">2D PLAN</strong>
                    <span className="block text-[10px] text-gray-600">Drawing</span>
                  </div>

                  <div className="p-3 rounded-sm bg-blue-50 border border-blue-200 space-y-1">
                    <span className="block text-[10px] text-accent-blue font-bold">STEP 02</span>
                    <strong className="block text-accent-bronze text-xs">3D BIM</strong>
                    <span className="block text-[10px] text-gray-600">Model</span>
                  </div>

                  <div className="p-3 rounded-sm bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="block text-[10px] text-accent-emerald font-bold">STEP 03</span>
                    <strong className="block text-accent-emerald text-xs">1:1 VR</strong>
                    <span className="block text-[10px] text-gray-600">Experience</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-sm bg-white border border-gray-200 text-center font-mono-tech text-xs text-brand-primary font-bold">
                RESULT: Confident Spatial Decision → Error-Free Build
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            03 // WHAT WE DO (5 Core Disciplines) (Hidden from UI view)
           ========================================================= */}
        {/*
        <div className="space-y-12">
          <SectionHeading
            number="03"
            badgeText="OUR SERVICES & DISCIPLINES"
            badgeVariant="blue"
            title="What We"
            highlightText="Do."
            subtitle="An integrated ecosystem of architectural design and project management services elevated by Virtual Reality."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.num}
                  className="about-stagger-card architectural-panel p-6 rounded-lg border border-gray-200/90 hover:border-accent-bronze/50 transition-all hover-lift flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-xs text-accent-bronze font-bold">
                        {item.num} // DISCIPLINE
                      </span>
                      <Badge variant="blue" size="sm">{item.badge}</Badge>
                    </div>

                    <div className="w-10 h-10 rounded-sm bg-gray-100 group-hover:bg-blue-50 transition-colors flex items-center justify-center text-brand-primary group-hover:text-accent-bronze">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <h4 className="font-display font-bold text-lg text-brand-primary group-hover:text-accent-bronze transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-xs text-brand-muted leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between font-mono-tech text-[11px] text-gray-500">
                    <span>{item.subtitle}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent-bronze" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        */}

        {/* =========================================================
            04 // WHY 3D NAKSHA (3 Value Pillars)
           ========================================================= */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-accent-amber tracking-[0.2em] uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                <span>03 // WHY 3D NAKSHA</span>
              </div>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-brand-primary tracking-tight">
                Why Choose Us.
              </h3>
            </div>
            <p className="text-xs font-mono-tech text-gray-600 max-w-sm leading-relaxed">
              Tangible value propositions built around spatial certainty, financial protection, and team alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuePillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="about-stagger-card architectural-panel p-6 sm:p-8 rounded-lg border border-gray-200 space-y-4 flex flex-col justify-between hover-lift"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-xs text-accent-bronze font-bold">
                        PILLAR {pillar.num}
                      </span>
                      <span className="w-8 h-8 rounded-sm bg-blue-50 text-accent-bronze flex items-center justify-center">
                        <PillarIcon className="w-4 h-4" />
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xl text-brand-primary">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 font-mono-tech text-xs text-accent-emerald font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                    <span>{pillar.benefit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Vision Banner */}
        <div className="p-8 sm:p-12 rounded-xl bg-white border border-gray-200 shadow-sm relative overflow-hidden text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-accent-bronze font-mono-tech text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-accent-bronze" />
            <span>THE FUTURE OF BUILDING</span>
          </div>
          <h4 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary tracking-tight">
            Welcome to the future of building. <span className="text-accent-bronze">Step inside.</span>
          </h4>
          <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed font-sans">
            Whether you are a homeowner crafting your dream residence or a real estate developer looking to showcase properties dynamically to buyers, 3D Naksha gives you total control over your spatial future.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

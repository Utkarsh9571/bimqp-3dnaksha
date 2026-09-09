import type { DetailedServiceData } from '../types';

export const DETAILED_SERVICES: DetailedServiceData[] = [
  {
    id: 'bim-modelling',
    slug: 'bim-modelling',
    number: '01',
    title: 'BIM Modelling',
    tagline: 'Structured 3D building information models for multidisciplinary coordination.',
    categoryTagline: '01 // STRUCTURED BIM COORDINATION & MODELING',
    description: 'Generate parametric 3D BIM models that represent architectural and structural elements for spatial coordination and design review.',
    heroHeadline: 'PARAMETRIC 3D BIM MODELING & SPATIAL COORDINATION',
    heroDescription: 'Transform 2D design drawings into structured, parametric 3D Building Information Models. Coordinate architectural, structural, and spatial geometry early in the design cycle.',
    heroImage: '/assets/images/service-bim-modelling-vr.jpg',
    badge: 'BIM Coordination',
    icon: 'Layers',
    image: '/assets/images/service-bim-modelling-vr.jpg',
    deliverables: [
      'Coordinated 3D BIM Models',
      'Spatial Interference & Coordination Review',
      '3D Sectional & Volumetric Studies',
      'Model-Derived Visual Datasets'
    ],
    specs: [
      { label: 'Methodology', value: 'Building Information Modeling' },
      { label: 'Coordination', value: 'Interdisciplinary Spatial Review' },
      { label: 'Ecosystem', value: 'BIMQP Integrated Workflow' }
    ],
    overview: {
      definition: '3D Naksha BIM Modelling creates parametric 3D building models that integrate architectural components, structural framing, and spatial boundaries into a single coordinated model environment.',
      problemSolved: '2D multidisciplinary overlays frequently miss physical spatial overlaps between structural beams, slab openings, and architectural elements until contractor site assembly.',
      nakshaApproach: 'We leverage the BIMQP ecosystem standards to convert design CAD files into clean, structured parametric 3D geometry suitable for visual coordination and design alignment.',
      aecWorkflowValue: 'Provides clear visual spatial verification to ensure architects, structural engineers, and project managers speak the same spatial language.'
    },
    benefits: [
      {
        title: 'Multidisciplinary Spatial Coordination',
        description: 'Review structural elements alongside architectural walls and ceilings in a single unified 3D environment.',
        icon: 'Layers'
      },
      {
        title: 'Spatial Interference Identification',
        description: 'Spot visual spatial conflicts and clearance issues before ground mobilization or fabrication.',
        icon: 'AlertTriangle'
      },
      {
        title: 'Coordinated Digital Representation',
        description: 'Maintain a single source of spatial truth that evolves alongside design revisions.',
        icon: 'Database'
      },
      {
        title: 'Improved Design Communication',
        description: 'Provide contractors and consultants with clear 3D sectional views and volumetric cuts.',
        icon: 'MessageSquare'
      }
    ],
    detailedDeliverables: [
      {
        title: 'Coordinated 3D BIM Models',
        description: 'Parametric 3D building models incorporating walls, slabs, columns, beams, roofs, openings, and architectural finishes.',
        outputFormat: 'Structured 3D Model Datasets'
      },
      {
        title: 'Spatial Interference & Coordination Review',
        description: 'Visual spatial audit reports highlighting interference locations and clearance pinch points.',
        outputFormat: 'Visual Coordination Report'
      },
      {
        title: '3D Sectional & Volumetric Studies',
        description: 'Dynamic 3D cutaway sections and axonometric diagrams revealing internal structural-architectural relationships.',
        outputFormat: '3D Axonometric Renders'
      },
      {
        title: 'Model-Derived Visual Datasets',
        description: 'Extracted high-definition visual elevations, sections, and perspective views directly generated from the 3D model.',
        outputFormat: 'Extracted Model Graphics'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'DISCOVER',
        subtitle: 'Drawing Audit & BIM Standards',
        description: 'Review architectural blueprints, structural plans, and project modeling standards.',
        keyAction: 'Input Audit',
        deliverable: 'BIM Modeling Matrix'
      },
      {
        step: '02',
        title: 'DEVELOP',
        subtitle: 'Parametric Geometry Creation',
        description: 'Build parametric walls, slabs, columns, stairs, and fenestration according to design drawings.',
        keyAction: 'Model Authoring',
        deliverable: 'Base Architectural Model'
      },
      {
        step: '03',
        title: 'REVIEW',
        subtitle: 'Structural Integration & Audit',
        description: 'Incorporate structural framing elements and review spatial relationships in 3D.',
        keyAction: 'Spatial Audit',
        deliverable: 'Interference Observations'
      },
      {
        step: '04',
        title: 'REFINE',
        subtitle: 'Model Refinement & Cutaways',
        description: 'Resolve spatial mismatches, refine element classifications, and prepare 3D section views.',
        keyAction: 'Model Optimization',
        deliverable: 'Coordinated 3D Model'
      },
      {
        step: '05',
        title: 'DELIVER',
        subtitle: 'Final Model Package & Views',
        description: 'Deliver the coordinated 3D model alongside sectional visual renders and coordination assets.',
        keyAction: 'Final Handover',
        deliverable: 'Complete BIM Package'
      }
    ],
    visualShowcase: [
      {
        title: 'Virtual Reality 3D BIM Structural Inspection',
        subtitle: 'Immersive Parametric Clash Detection & Review',
        image: '/assets/images/service-bim-modelling-vr.jpg',
        caption: 'Engineers walking through glowing 3D BIM structural framing and MEP overlays inside a VR spatial room.',
        tags: ['VR BIM', '3D Section VR', 'Spatial Audit']
      },
      {
        title: 'Virtual Reality Multi-Layer Architectural Coordination',
        subtitle: 'Integrated Building Geometry Review',
        image: '/assets/images/about-vr-showcase.jpg',
        caption: 'Holographic 3D BIM terrain masterplan model coordinating building massing footprints inside VR headset environment.',
        tags: ['VR Masterplan', 'Spatial Model', 'BIM Geometry']
      }
    ],
    audienceIds: ['architects', 'contractors', 'consultants', 'developers'],
    faqs: [
      {
        id: 'faq-bim-1',
        category: 'bimqp',
        question: 'How does 3D Naksha BIM Modelling integrate with the BIMQP ecosystem?',
        answer: '3D Naksha operates as the visualization and design review layer within the BIMQP ecosystem, turning BIM models into accessible spatial walkthroughs and coordination datasets.'
      },
      {
        id: 'faq-bim-2',
        category: 'process',
        question: 'Can 3D Naksha build 3D BIM models from 2D CAD files?',
        answer: 'Yes. We frequently ingest 2D DWG drawings, PDFs, and hand sketches to construct accurate 3D parametric models.'
      }
    ],
    relatedServiceIds: ['construction-pm', 'immersive-vr'],
    seo: {
      title: 'Parametric 3D BIM Modelling & Spatial Review | 3D Naksha',
      description: 'Learn about 3D Naksha BIM Modelling services: structured 3D parametric models, spatial interference review, 3D sectionals, and BIMQP ecosystem coordination.'
    }
  },
  {
    id: 'immersive-vr',
    slug: 'immersive-vr',
    number: '02',
    title: 'Immersive VR Services',
    tagline: 'Interactive virtual reality walkthroughs to step inside spaces before building.',
    categoryTagline: '02 // FLAGSHIP IMMERSIVE SPATIAL WALKTHROUGHS',
    description: 'Our flagship visualization experience: interactive spatial walkthroughs enabling clients and teams to explore unbuilt spaces at true human scale.',
    heroHeadline: 'STEP INSIDE THE UNBUILT SPACE AT TRUE HUMAN SCALE',
    heroDescription: 'Experience unbuilt architectural spaces in real-time 3D interactive environments. Walk through floor plans, evaluate ceiling heights, test lighting moods, and gain intuitive spatial clarity before construction.',
    heroImage: '/assets/images/service-immersive-vr.jpg',
    badge: 'FLAGSHIP EXPERIENCE',
    icon: 'Glasses',
    image: '/assets/images/service-immersive-vr.jpg',
    isFeatured: true,
    deliverables: [
      'Interactive 3D Virtual Walkthroughs',
      'Human-Scale Spatial Perspective Review',
      'Material & Lighting Exploration Environments',
      'Platform-Tailored Interactive Formats'
    ],
    specs: [
      { label: 'Experience Mode', value: 'Interactive 1:1 Scale Walkthrough' },
      { label: 'Viewing Formats', value: 'Immersive & Screen-Based Formats' },
      { label: 'Core Benefit', value: 'Direct Spatial Understanding' }
    ],
    overview: {
      definition: '3D Naksha Immersive VR Services transform static architectural models into real-time interactive walkthrough environments where users navigate spaces at true 1:1 scale.',
      problemSolved: 'Flat renders and 2D floor plans provide fragmented impressions of a project. Decision-makers often struggle to perceive true distances, ceiling heights, and atmospheric lighting before construction.',
      nakshaApproach: 'We bake lighting, reflections, and spatial geometry into optimized real-time 3D engines, creating smooth interactive walkthroughs accessible via VR headsets, computers, and touch displays.',
      aecWorkflowValue: 'Eliminates spatial guesswork, accelerates stakeholder design approvals, and reduces client-requested revisions during construction.'
    },
    benefits: [
      {
        title: 'True 1:1 Spatial Scale',
        description: 'Stand in rooms, corridors, and double-height foyers at exact physical eye-level perspective.',
        icon: 'Eye'
      },
      {
        title: 'Live Lighting & Material Review',
        description: 'Experience natural sunlight transitions and test alternative surface finishes in real-time.',
        icon: 'Sun'
      },
      {
        title: 'Frictionless Client Approvals',
        description: 'Enable non-technical stakeholders to intuitively understand and approve complex spatial layouts.',
        icon: 'CheckCircle2'
      },
      {
        title: 'Accessible Multi-Platform Delivery',
        description: 'Deployable on standalone VR headsets, presentation laptops, and interactive touch screens.',
        icon: 'Sparkles'
      }
    ],
    detailedDeliverables: [
      {
        title: 'Real-Time Interactive 3D Walkthrough Environment',
        description: 'Full interactive 3D scene enabling seamless navigation through unbuilt residential or commercial spaces.'
      },
      {
        title: 'Human-Scale Perspective Review Stations',
        description: 'Curated 1:1 eye-level viewpoint stations configured for key architectural focal points and sightlines.'
      },
      {
        title: 'Real-Time Lighting Simulation Modes',
        description: 'Interactive day/night lighting modes demonstrating daylight infiltration and ambient interior fixtures.'
      },
      {
        title: 'Standalone Executable & Presentation Formats',
        description: 'Self-contained interactive builds ready for presentation suites, sales galleries, and boardroom pitches.'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'DISCOVER',
        subtitle: 'Model Ingestion & VR Scope',
        description: 'Audit 3D BIM geometry and select key walkthrough routes, points of interest, and target viewing devices.',
        keyAction: 'Scene Scope Mapping',
        deliverable: 'VR Experience Blueprint'
      },
      {
        step: '02',
        title: 'DEVELOP',
        subtitle: 'Real-time Engine Optimization',
        description: 'Optimize geometry polygon counts, lightmaps, and collision boundaries for smooth high-framerate rendering.',
        keyAction: 'Geometry Optimization',
        deliverable: 'Interactive Base Scene'
      },
      {
        step: '03',
        title: 'REVIEW',
        subtitle: 'Lighting & Navigation Test',
        description: 'Test movement paths, eye heights, and daylight transitions with project coordinators.',
        keyAction: 'Usability Review',
        deliverable: 'Alpha Interactive Test'
      },
      {
        step: '04',
        title: 'REFINE',
        subtitle: 'Material Tuning & Polish',
        description: 'Apply high-fidelity physical materials, refine light bounces, and embed interactive hotspots.',
        keyAction: 'Fidelity Polish',
        deliverable: 'Beta Interactive Scene'
      },
      {
        step: '05',
        title: 'DELIVER',
        subtitle: 'Package Build & Deployment',
        description: 'Deploy standalone interactive packages, browser-compatible walkthroughs, and VR presentation formats.',
        keyAction: 'Final Handover',
        deliverable: 'Complete VR Package'
      }
    ],
    visualShowcase: [
      {
        title: 'Human-Scale VR Review Group Walkthrough',
        subtitle: 'Multi-User Interactive 1:1 Scale Environment',
        image: '/assets/images/service-immersive-vr.jpg',
        caption: 'Group of architects and clients wearing VR headsets standing inside a 1:1 scale model reviewing spatial volume.',
        tags: ['VR Residential', '1:1 Scale Review', 'Spatial Walkthrough']
      },
      {
        title: 'Commercial Spatial VR Exploration',
        subtitle: 'Multi-Room Sequence VR Review',
        image: '/assets/images/about-vr-showcase.jpg',
        caption: 'Real-time VR walkthrough simulating customer journey paths, room vestibules, and spatial lighting.',
        tags: ['Commercial VR', 'Retail VR Layout', 'Real-time Render']
      }
    ],
    audienceIds: ['architects', 'developers', 'property-owners'],
    faqs: [
      {
        id: 'faq-vr-1',
        category: 'vr',
        question: 'Do clients need expensive VR headsets to view 3D Naksha walkthroughs?',
        answer: 'No. While we support head-mounted displays, we also deliver accessible screen-based interactive formats that run directly on standard computers, laptops, and web browsers.'
      },
      {
        id: 'faq-vr-2',
        category: 'vr',
        question: 'Can material colors and finishes be changed inside the VR walkthrough?',
        answer: 'Yes. We can configure interactive material toggles that allow clients to switch flooring, cabinetry finishes, and lighting options live during presentation sessions.'
      }
    ],
    relatedServiceIds: ['bim-modelling', 'construction-pm'],
    seo: {
      title: 'Immersive VR Walkthroughs & Interactive 3D Services | 3D Naksha',
      description: 'Experience 3D Naksha flagship Immersive VR Services: interactive virtual reality walkthroughs, human-scale spatial reviews, and real-time lighting exploration.'
    }
  },
  {
    id: 'construction-pm',
    slug: 'construction-project-management',
    number: '03',
    title: 'Construction Project Management',
    tagline: 'Visualization-assisted planning, sequence modeling, and project coordination.',
    categoryTagline: '03 // VISUAL CONSTRUCTION PLANNING & COORDINATION',
    description: 'Support construction planning with visual sequence models, milestone coordination, and spatial clarity for on-site decision-makers.',
    heroHeadline: 'VISUAL CONSTRUCTION SEQUENCE PLANNING & MILESTONE COORDINATION',
    heroDescription: 'Empower project management teams and contractors with visual sequence models, milestone coordination assets, and pre-construction spatial clarity.',
    heroImage: '/assets/images/service-construction-pm-vr.jpg',
    badge: 'Project Planning',
    icon: 'HardHat',
    image: '/assets/images/service-construction-pm-vr.jpg',
    deliverables: [
      'Visual Construction Sequence Phasing',
      'Site Milestone Coordination Visuals',
      'Stakeholder Visual Progress Support',
      'Pre-Construction Coordination Reviews'
    ],
    specs: [
      { label: 'Focus Area', value: 'Pre-Construction & Phasing' },
      { label: 'Application', value: 'Project & Milestone Clarity' },
      { label: 'Stakeholders', value: 'Contractors & Project Teams' }
    ],
    overview: {
      definition: '3D Naksha Construction Project Management visualization aligns construction schedules with clear 3D sequence models to improve milestone understanding and contractor communication.',
      problemSolved: 'Traditional Gantt charts and schedule tables fail to communicate complex spatial sequencing and logistical pinch points to on-site contractors and multi-tier sub-contractors.',
      nakshaApproach: 'We link project timeline milestones to 3D spatial models, producing visual step-by-step assembly diagrams that clarify work zones, access routes, and staging requirements.',
      aecWorkflowValue: 'Minimizes site sequencing confusion, supports smoother sub-contractor alignment, and reduces schedule delays.'
    },
    benefits: [
      {
        title: 'Intuitive Schedule Phasing',
        description: 'See construction sequence phases mapped directly onto 3D geometry rather than abstract bar charts.',
        icon: 'Clock'
      },
      {
        title: 'Sub-Contractor Alignment',
        description: 'Coordinate trades by clarifying spatial work zones and milestone dependencies before site entry.',
        icon: 'Users'
      },
      {
        title: 'Logistical Site Clarity',
        description: 'Visualize material staging areas, access paths, and crane swings in spatial context.',
        icon: 'Compass'
      },
      {
        title: 'Fewer On-Site Bottlenecks',
        description: 'Detect assembly sequence conflicts and spatial constraints before field crews begin work.',
        icon: 'Wrench'
      }
    ],
    detailedDeliverables: [
      {
        title: '3D Construction Sequence & Phasing Diagrams',
        description: 'Step-by-step visual models showing foundation, framing, enclosure, and fitout progression stages.'
      },
      {
        title: 'Site Milestone Coordination Graphics',
        description: 'High-clarity graphics illustrating critical path milestones and trade zone handoffs.'
      },
      {
        title: 'Visual Pre-Construction Review Datasets',
        description: 'Detailed spatial snapshots for contractor kick-off meetings and site alignment briefings.'
      },
      {
        title: 'Stakeholder Progress Review Assets',
        description: 'Visual progression graphics designed for client status reporting and executive review presentations.'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'DISCOVER',
        subtitle: 'Schedule & Scope Review',
        description: 'Review project construction schedule milestones, site logistics plans, and structural drawings.',
        keyAction: 'Schedule Mapping',
        deliverable: 'Phasing Sequence Plan'
      },
      {
        step: '02',
        title: 'DEVELOP',
        subtitle: 'Phase Model Grouping',
        description: 'Group 3D BIM model elements into construction phase categories (foundations, core, superstructure, facade).',
        keyAction: 'Element Breakdown',
        deliverable: 'Phased 3D Geometry'
      },
      {
        step: '03',
        title: 'REVIEW',
        subtitle: 'Milestone Stage Review',
        description: 'Verify phase breakdowns against project management milestones with site engineering leads.',
        keyAction: 'Logic Verification',
        deliverable: 'Milestone Checkpoint Set'
      },
      {
        step: '04',
        title: 'REFINE',
        subtitle: 'Visual Phasing Rendering',
        description: 'Generate clear color-coded 3D sequence views, site context graphics, and milestone callouts.',
        keyAction: 'Graphic Formulation',
        deliverable: 'Draft Phasing Graphics'
      },
      {
        step: '05',
        title: 'DELIVER',
        subtitle: 'Final Coordination Package',
        description: 'Deliver the complete visual construction sequence package for project management and contractor briefings.',
        keyAction: 'Final Handover',
        deliverable: 'Complete Phasing Package'
      }
    ],
    visualShowcase: [
      {
        title: 'Virtual Reality On-Site Construction Phasing Review',
        subtitle: '4D Interactive VR Timeline & Overlays',
        image: '/assets/images/service-construction-pm-vr.jpg',
        caption: 'Site manager wearing a hardhat and VR headset inspecting 4D project timelines and BIM overlays directly on the construction floor.',
        tags: ['VR Construction', '4D Phasing', 'Site VR Review']
      },
      {
        title: 'Virtual Reality Structural Coordination Briefing',
        subtitle: 'Pre-Construction VR Enclosure Study',
        image: '/assets/images/service-bim-modelling-vr.jpg',
        caption: 'Engineers coordinating structural assembly logic and site logistics in virtual reality prior to ground mobilization.',
        tags: ['VR Logistics', 'Pre-Con VR', 'Milestone Review']
      }
    ],
    audienceIds: ['contractors', 'project-teams', 'developers', 'consultants'],
    faqs: [
      {
        id: 'faq-cpm-1',
        category: 'process',
        question: 'How do visual sequence models support project management teams?',
        answer: 'Visual sequence models transform complex schedule spreadsheets into intuitive 3D milestone graphics that help site supervisors and sub-contractors quickly understand phasing logic.'
      },
      {
        id: 'faq-cpm-2',
        category: 'deliverables',
        question: 'Can site logistics and crane locations be visualized?',
        answer: 'Yes. We incorporate site boundary context, material staging areas, crane access paths, and temporary hoists into 3D pre-construction review diagrams.'
      }
    ],
    relatedServiceIds: ['bim-modelling', 'immersive-vr'],
    seo: {
      title: 'Construction Project Management & Visual Phasing | 3D Naksha',
      description: 'Explore 3D Naksha Construction Project Management services: visual sequence modeling, milestone coordination graphics, and pre-construction spatial clarity.'
    }
  }
];

export const getServiceBySlug = (slug: string): DetailedServiceData | undefined => {
  return DETAILED_SERVICES.find((service) => service.slug === slug || service.id === slug);
};

export const getServiceById = (id: string): DetailedServiceData | undefined => {
  return DETAILED_SERVICES.find((service) => service.id === id);
};

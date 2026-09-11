import type {
  ServiceItem,
  PortfolioItem,
  FAQItem,
  AudienceItem,
  ProcessStep,
  LifecyclePhase
} from '../types';

export const BRAND_CONFIG = {
  name: '3D Naksha',
  domain: '3dnaksha.com',
  tagline: 'Step Inside Before You Build',
  heroSubtitle: 'Architectural visualization, 3D BIM modeling, and immersive VR services from the BIMQP ecosystem. Helping stakeholders experience spaces, evaluate designs, and make confident construction decisions.',
  ecosystem: 'A Brand of the BIMQP Ecosystem',
  email: 'support@3dnaksha.com',
  metrics: [
    { value: 'Pre-Construction', label: 'Spatial Clarity', detail: 'Experience spaces before physical construction begins' },
    { value: 'True Scale', label: 'Human Perspective', detail: 'Understand spatial proportions, clearance, and flow' },
    { value: 'Visual Alignment', label: 'Stakeholder Review', detail: 'Turn design intent into clear communication across teams' },
    { value: 'AEC Connected', label: 'Lifecycle Integration', detail: 'Connecting design concepts to informed construction decisions' }
  ]
};

export const LIFECYCLE_PHASES: LifecyclePhase[] = [
  {
    phase: '01',
    title: 'DESIGN',
    subtitle: 'From Conceptual Intent to Spatial Blueprint',
    description: 'Translate architectural concepts, floor layouts, and functional requirements into clear visual arrangements.',
    icon: 'PenTool',
    valueAdd: 'Establishes clear spatial intent between designers and clients.',
    accentColor: 'var(--accent-bronze-light)'
  },
  {
    phase: '02',
    title: 'BIM / 3D MODEL',
    subtitle: 'Coordinated Geometry & Digital Representation',
    description: 'Develop structured 3D BIM models that bring architectural, structural, and spatial elements into unified coordination.',
    icon: 'Box',
    valueAdd: 'Enables multidisciplinary spatial review before site execution.',
    accentColor: 'var(--accent-blue-light)'
  },
  {
    phase: '03',
    title: 'IMMERSIVE EXPERIENCE',
    subtitle: 'Spatial Walkthroughs & Material Visualization',
    description: 'Step into the unbuilt environment to evaluate scale, lighting conditions, textures, and sightlines at human scale.',
    icon: 'Glasses',
    valueAdd: 'Brings intuitive spatial comprehension and stakeholder alignment.',
    accentColor: 'var(--accent-amber-gold)'
  },
  {
    phase: '04',
    title: 'BETTER CONSTRUCTION DECISIONS',
    subtitle: 'Informed Planning & Site Readiness',
    description: 'Empower project teams with visual clarity and coordinated models for well-informed pre-construction execution.',
    icon: 'HardHat',
    valueAdd: 'Reduces uncertainty and supports smoother on-site communication.',
    accentColor: 'var(--accent-emerald-light)'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'home-design',
    slug: 'home-design',
    number: '01',
    title: 'Home Design',
    tagline: 'Residential architectural planning, elevation visualization, and spatial layouts.',
    description: 'Tailored residential design solutions ranging from concept floor layouts and elevation studies to functional spatial planning for private residences.',
    deliverables: [
      'Architectural Floor Plan Visualizations',
      'Exterior 3D Elevation Studies',
      'Spatial Flow & Layout Planning',
      'Orientation & Natural Light Studies'
    ],
    specs: [
      { label: 'Project Focus', value: 'Residential Architecture' },
      { label: 'Deliverable Formats', value: '2D Visual Plans & 3D Renders' },
      { label: 'Collaboration', value: 'Direct Designer Review' }
    ],
    icon: 'Home',
    badge: 'Core Service',
    image: '/assets/images/service-home-design-vr.jpg'
  },
  {
    id: 'interior-design',
    slug: 'interior-design',
    number: '02',
    title: 'Interior Design',
    tagline: 'Interior space planning, lighting studies, and material finish visualization.',
    description: 'Visualize interior living spaces, kitchen layouts, commercial interiors, and bespoke joinery with realistic lighting, textures, and material palettes.',
    deliverables: [
      'High-Resolution Interior Visualizations',
      'Material, Texture & Finish Studies',
      'Daylight & Ambient Lighting Exploration',
      'Joinery & Spatial Layout Visuals'
    ],
    specs: [
      { label: 'Project Focus', value: 'Living, Working & Retail Spaces' },
      { label: 'Visual Elements', value: 'Materials, Lighting & Styling' },
      { label: 'Review Mode', value: 'Multiple Angle Perspectives' }
    ],
    icon: 'Armchair',
    badge: 'Interior Focus',
    image: '/assets/images/service-interior-design-vr.jpg'
  },
  {
    id: 'bim-modelling',
    slug: 'bim-modelling',
    number: '03',
    title: 'BIM Modelling',
    tagline: 'Structured 3D building information models for multidisciplinary coordination.',
    description: 'Generate parametric 3D BIM models that represent architectural and structural elements for spatial coordination and design review.',
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
    icon: 'Layers',
    badge: 'BIM Coordination',
    image: '/assets/images/service-bim-layers.jpg'
  },
  {
    id: 'immersive-vr',
    slug: 'immersive-vr',
    number: '04',
    title: 'Immersive VR Services',
    tagline: 'Interactive virtual reality walkthroughs to step inside spaces before building.',
    description: 'Our flagship visualization experience: interactive spatial walkthroughs enabling clients and teams to explore unbuilt spaces at true human scale.',
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
    icon: 'Glasses',
    badge: 'FLAGSHIP EXPERIENCE',
    image: '/assets/images/service-vr-spatial.jpg'
  },
  {
    id: 'construction-pm',
    slug: 'construction-project-management',
    number: '05',
    title: 'Construction Project Management',
    tagline: 'Visualization-assisted planning, sequence modeling, and project coordination.',
    description: 'Support construction planning with visual sequence models, milestone coordination, and spatial clarity for on-site decision-makers.',
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
    icon: 'HardHat',
    badge: 'Project Planning',
    image: '/assets/images/service-construction-coordination.jpg'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'showcase-residential-villa',
    title: 'Residential Architecture Visualization',
    category: 'residential',
    categoryLabel: 'Residential Architecture',
    deliverableType: '3D Exterior Visualization & Spatial Review',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    description: 'Exterior architectural visualization exploring contemporary cantilever forms, natural material transitions, and integration with surrounding terrain.',
    features: ['Daylight & sunset orientation study', 'Material & texture surface review', 'Volumetric massing and proportions'],
    capabilities: ['3D Modeling', 'Photorealistic Lighting', 'Spatial Presentation']
  },
  {
    id: 'showcase-commercial-hub',
    title: 'Commercial Architecture Visualization',
    category: 'commercial',
    categoryLabel: 'Commercial & Mixed-Use',
    deliverableType: 'Building Envelope & Exterior Visualization',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    description: 'Multi-story commercial building visualization illustrating glazed facade treatments, daylighting considerations, and structural massing.',
    features: ['Facade articulation visualization', 'Public realm and entrance study', 'Surrounding context visualization'],
    capabilities: ['Commercial Modeling', 'Facade Study', 'Context Rendering']
  },
  {
    id: 'showcase-interior-penthouse',
    title: 'Interior Space & Finish Exploration',
    category: 'interior',
    categoryLabel: 'Interior Visualization',
    deliverableType: 'Interior Ambiance & Material Study',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    description: 'Double-height residential interior visualization showcasing custom cabinetry, stone surface textures, and natural lighting distribution.',
    features: ['Material texture & finish exploration', 'Lighting ambiance visualization', 'Spatial flow and furniture arrangement'],
    capabilities: ['Interior Lighting', 'Materiality', 'Joinery Visualization']
  },
  {
    id: 'showcase-courtyard-residence',
    title: 'Courtyard Residence Visualization',
    category: 'residential',
    categoryLabel: 'Residential Architecture',
    deliverableType: 'Concept Architecture & Landscape Study',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    description: 'Courtyard-centered residence visualization studying interior-to-exterior visual connections, shaded verandas, and natural ventilation openings.',
    features: ['Courtyard sightline evaluation', 'Indoor-outdoor spatial relationship', 'Natural ventilation and shade studies'],
    capabilities: ['Spatial Planning', 'Courtyard Study', 'Environmental Integration']
  },
  {
    id: 'showcase-commercial-atrium',
    title: 'Commercial Concourse & Atrium',
    category: 'commercial',
    categoryLabel: 'Commercial Interior',
    deliverableType: 'Atrium Scale & Interior Visualization',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    description: 'Multi-level corporate atrium visualization highlighting circulation pathways, public seating areas, and acoustic timber ceiling details.',
    features: ['Circulation and flow visualization', 'Multi-level sightline review', 'Material finish coordination'],
    capabilities: ['Volume Study', 'Atrium Visualization', 'Material Coordination']
  },
  {
    id: 'showcase-masterplan-simulation',
    title: 'Masterplan & Landscape Visualization',
    category: 'vr-bim',
    categoryLabel: 'BIM & Spatial Simulation',
    deliverableType: 'Terrain & Masterplan 3D Model',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
    description: 'Topographical masterplan visualization coordinating road networks, architectural footprints, and natural landscape features.',
    features: ['Terrain topography representation', 'Phased cluster layout review', 'Comprehensive site visualization'],
    capabilities: ['Site Modeling', 'Landscape Integration', 'Cluster Planning']
  }
];

export const AUDIENCE_LIST: AudienceItem[] = [
  {
    id: 'architects',
    role: 'Architects & Design Studios',
    eyebrow: 'STAKEHOLDER // ARCHITECTS & DESIGN STUDIOS',
    headline: 'Help clients experience the design before approving it.',
    tagline: 'Turn 2D plans and design intent into an intuitive experience clients can explore before finalizing.',
    description: 'Turn 2D plans and design intent into an experience clients can understand, explore, and respond to before the design is finalized.',
    traditionalWorkflow: [
      'Clients interpret plans, elevations, and static views.',
      'Spatial ideas often require lengthy explanations.',
      'Design changes may surface late in the approval cycle.'
    ],
    with3DNaksha: [
      'Explore the proposed space through interactive 3D visualization.',
      'Experience room volumes, materials, lighting, and spatial relationships.',
      'Resolve visual uncertainty before detailing and approval.'
    ],
    benefits: [
      'Fewer late-stage revisions',
      'Faster client approvals',
      'Stronger design presentations'
    ],
    ctaText: 'Discuss Requirements for Architects',
    icon: 'Compass',
    image: '/assets/images/audience-architects.jpg'
  },
  {
    id: 'interior-designers',
    role: 'Interior Designers & Stylists',
    eyebrow: 'STAKEHOLDER // INTERIOR DESIGNERS & STYLISTS',
    headline: 'Make material, lighting, and spatial decisions before procurement.',
    tagline: 'Visualize complete interior flow and materials together before anything is ordered.',
    description: 'Visualize the complete interior together so clients can understand how materials, colours, lighting, furniture, and spatial flow work before anything is ordered.',
    traditionalWorkflow: [
      'Material samples and references are reviewed separately.',
      'Clients have to imagine the final combination.',
      'Changes can become expensive after procurement.'
    ],
    with3DNaksha: [
      'Preview materials and finishes in the actual spatial context.',
      'Explore lighting and ambience before implementation.',
      'Validate design choices before procurement.'
    ],
    benefits: [
      'More confident material decisions',
      'Fewer procurement surprises',
      'Faster client sign-off'
    ],
    ctaText: 'Discuss Requirements for Interior Designers',
    icon: 'Palette',
    image: '/assets/images/audience-interior-designers.jpg'
  },
  {
    id: 'developers',
    role: 'Real Estate Developers & Builders',
    eyebrow: 'STAKEHOLDER // REAL ESTATE DEVELOPERS & BUILDERS',
    headline: "Let buyers experience what hasn't been built yet.",
    tagline: 'Turn unbuilt developments into interactive visual experiences for buyers and investors.',
    description: 'Turn unbuilt residential and commercial projects into interactive visual experiences for buyers, investors, marketing teams, and stakeholders.',
    traditionalWorkflow: [
      'Buyers evaluate projects from plans, brochures, and static images.',
      'Spatial quality can be difficult to communicate before construction.',
      'Marketing relies heavily on imagination.'
    ],
    with3DNaksha: [
      'Let prospects explore unbuilt spaces visually.',
      'Showcase units, interiors, exteriors, and spatial relationships.',
      'Give sales and marketing teams a more compelling project experience.'
    ],
    benefits: [
      'Stronger project presentations',
      'Better buyer understanding',
      'More compelling marketing assets'
    ],
    ctaText: 'Discuss Requirements for Developers',
    icon: 'Building2',
    image: '/assets/images/audience-developers.jpg'
  },
  {
    id: 'contractors',
    role: 'Contractors & Construction Companies',
    eyebrow: 'STAKEHOLDER // CONTRACTORS & CONSTRUCTION COMPANIES',
    headline: 'Coordinate the build before problems reach the site.',
    tagline: 'Use coordinated 3D/BIM models to identify spatial conflicts and align site execution.',
    description: 'Use coordinated 3D/BIM models and visual sequencing to understand spatial relationships, identify potential coordination issues, and align teams before execution.',
    traditionalWorkflow: [
      'Teams interpret drawings from different disciplines.',
      'Spatial conflicts may only become obvious during execution.',
      'Site teams rely heavily on 2D references and verbal coordination.'
    ],
    with3DNaksha: [
      'Review coordinated 3D/BIM models before execution.',
      'Visualize spatial relationships and construction sequences.',
      'Give teams a shared visual reference for coordination.'
    ],
    benefits: [
      'Earlier issue identification',
      'Better site coordination',
      'Clearer construction planning'
    ],
    ctaText: 'Discuss Requirements for Contractors',
    icon: 'Wrench',
    image: '/assets/images/audience-contractors.jpg'
  },
  {
    id: 'property-owners',
    role: 'Property Owners & Private Clients',
    eyebrow: 'STAKEHOLDER // PROPERTY OWNERS & PRIVATE CLIENTS',
    headline: 'Experience your future space before construction begins.',
    tagline: 'Walk through your proposed home to understand proportions and layouts with confidence.',
    description: 'Walk through your proposed home or space before it is built so you can understand layouts, proportions, openings, finishes, and spatial flow with greater confidence.',
    traditionalWorkflow: [
      'Plans are approved without experiencing the finished space.',
      'Room proportions and circulation can be difficult to imagine.',
      'Design changes may become difficult once construction begins.'
    ],
    with3DNaksha: [
      'Walk through the proposed space before construction.',
      'Understand room sizes, layouts, openings, and visual relationships.',
      'Review design options before committing to construction decisions.'
    ],
    benefits: [
      'More confident design decisions',
      'Fewer surprises during construction',
      'Greater clarity before investing'
    ],
    ctaText: 'Discuss Requirements for Property Owners',
    icon: 'Key',
    image: '/assets/images/audience-property-owners.jpg'
  },
  {
    id: 'project-teams',
    role: 'Project Management Teams',
    eyebrow: 'STAKEHOLDER // PROJECT MANAGEMENT TEAMS',
    headline: 'Give every stakeholder the same visual reference.',
    tagline: 'Use coordinated 3D visualization as a shared reference for alignment and reviews.',
    description: 'Use coordinated 3D visualization as a shared reference for stakeholder communication, milestone reviews, progress discussions, and project alignment.',
    traditionalWorkflow: [
      'Designers, clients, and execution teams interpret information differently.',
      'Progress discussions rely heavily on drawings and verbal explanations.',
      'Misalignment can appear between project phases.'
    ],
    with3DNaksha: [
      'Use shared 3D models as a common visual reference.',
      'Communicate milestones and spatial changes more clearly.',
      'Support stakeholder reviews with consistent visual information.'
    ],
    benefits: [
      'Better stakeholder alignment',
      'Clearer progress communication',
      'More effective project reviews'
    ],
    ctaText: 'Discuss Requirements for Project Management',
    icon: 'Users2',
    image: '/assets/images/audience-project-management.jpg'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Project Ingestion & Scope Review',
    subtitle: 'Understanding Design Requirements',
    description: 'We review your design drawings, sketches, CAD files, or conceptual briefs to understand spatial goals, site context, and visualization objectives.',
    deliverables: ['Scope & Objective Outline', 'Information Review', 'Milestone Planning'],
    keyAction: 'Initial Review'
  },
  {
    step: '02',
    title: '3D Modeling & Spatial Coordination',
    subtitle: 'Building Geometry & Proportions',
    description: 'We construct structured 3D geometry and BIM representations, establishing room dimensions, ceiling heights, structural elements, and openings.',
    deliverables: ['3D Volumetric Model', 'Proportion & Scale Review', 'Initial Spatial Angles'],
    keyAction: 'Geometry Setup'
  },
  {
    step: '03',
    title: 'Material Formulation & Lighting Studies',
    subtitle: 'Applying Textures & Natural Light',
    description: 'We configure surface materials, textures, and realistic lighting conditions reflecting the project orientation and intended design aesthetic.',
    deliverables: ['Material & Finish Previews', 'Daylight & Lighting Variations', 'Draft Review Renders'],
    keyAction: 'Aesthetic Refinement'
  },
  {
    step: '04',
    title: 'Immersive Experience & Visualization',
    subtitle: 'Interactive Walkthroughs & Master Renders',
    description: 'We develop high-resolution visual renderings and interactive walkthrough environments tailored to your intended presentation format.',
    deliverables: ['High-Resolution Visualizations', 'Interactive 3D Walkthrough Formats', 'Presentation Packages'],
    keyAction: 'Immersive Formulation'
  },
  {
    step: '05',
    title: 'Review, Refinement & Handover',
    subtitle: 'Finalizing Deliverables',
    description: 'We incorporate feedback through structured review stages and deliver the completed visual assets, models, and presentation packages.',
    deliverables: ['Final High-Resolution Assets', 'Interactive Presentation Package', 'Ongoing Design Support'],
    keyAction: 'Final Handover'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'vr',
    question: 'How can clients experience 3D Naksha virtual walkthroughs?',
    answer: 'We deliver interactive walkthroughs in formats tailored to the project requirements—from immersive VR experiences to accessible screen-based interactive formats that can be viewed on computers and mobile devices without requiring specialized hardware.'
  },
  {
    id: 'faq-2',
    category: 'deliverables',
    question: 'What deliverables are typically provided for visualization projects?',
    answer: 'Deliverables vary based on the service selected and typically include high-resolution exterior and interior renderings, 3D floor plan visualizations, coordinated 3D BIM models, and interactive walkthrough formats.'
  },
  {
    id: 'faq-3',
    category: 'bimqp',
    question: 'How does 3D Naksha connect with the BIMQP ecosystem?',
    answer: '3D Naksha is the architectural visualization, interior design, and immersive experience brand of the BIMQP ecosystem. BIMQP provides foundational BIM modeling, engineering data, and digital workflows, while 3D Naksha turns these models into intuitive, high-impact visual experiences for clients and stakeholders.'
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'What materials or files are needed to begin a project?',
    answer: 'We work with a variety of starting materials, including 2D CAD drawings, architectural PDF plans, 3D conceptual models, or hand-drawn sketches with basic dimensions and reference images.'
  },
  {
    id: 'faq-5',
    category: 'process',
    question: 'How does the design review and revision process work?',
    answer: 'We follow a collaborative, milestone-based review process that includes preliminary geometry check-ins, material and lighting review, and final refinement stages to ensure the visual output reflects the design intent.'
  },
  {
    id: 'faq-6',
    category: 'vr',
    question: 'Why is pre-construction visualization valuable for project stakeholders?',
    answer: 'Flat 2D drawings often make it challenging to perceive spatial proportions, room scale, and lighting flow. Pre-construction visualization and immersive walkthroughs allow stakeholders to experience the space beforehand, helping identify adjustments early and facilitating clear decision-making.'
  },
  {
    id: 'faq-7',
    category: 'deliverables',
    question: 'Can 3D Naksha support both residential and commercial projects?',
    answer: 'Yes. 3D Naksha provides home design and interior visualization for private residential clients, as well as BIM modeling, commercial architecture visualization, and project coordination support for developers, contractors, and design practices.'
  }
];

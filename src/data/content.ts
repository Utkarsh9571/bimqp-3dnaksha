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
  email: 'contact@3dnaksha.com',
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
    accentColor: '#D4A373'
  },
  {
    phase: '02',
    title: 'BIM / 3D MODEL',
    subtitle: 'Coordinated Geometry & Digital Representation',
    description: 'Develop structured 3D BIM models that bring architectural, structural, and spatial elements into unified coordination.',
    icon: 'Box',
    valueAdd: 'Enables multidisciplinary spatial review before site execution.',
    accentColor: '#38BDF8'
  },
  {
    phase: '03',
    title: 'IMMERSIVE EXPERIENCE',
    subtitle: 'Spatial Walkthroughs & Material Visualization',
    description: 'Step into the unbuilt environment to evaluate scale, lighting conditions, textures, and sightlines at human scale.',
    icon: 'Glasses',
    valueAdd: 'Brings intuitive spatial comprehension and stakeholder alignment.',
    accentColor: '#E5A93B'
  },
  {
    phase: '04',
    title: 'BETTER CONSTRUCTION DECISIONS',
    subtitle: 'Informed Planning & Site Readiness',
    description: 'Empower project teams with visual clarity and coordinated models for well-informed pre-construction execution.',
    icon: 'HardHat',
    valueAdd: 'Reduces uncertainty and supports smoother on-site communication.',
    accentColor: '#10B981'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'home-design',
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
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'interior-design',
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
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'bim-modelling',
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
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'immersive-vr',
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
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'construction-pm',
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
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18fe0f6?auto=format&fit=crop&w=1200&q=85'
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
    tagline: 'Communicate design intent with clarity and engage clients through immersive visuals.',
    description: 'Present architectural ideas in formats that clients intuitively understand. Enable stakeholders to experience spatial volumes, daylighting, and materials before detailing begins.',
    painPoint: 'Clients struggling to interpret 2D floor plans and requesting changes late in the design cycle.',
    solution: 'Clear 3D visualizations and interactive walkthroughs for intuitive design consensus.',
    icon: 'Compass',
    deliverables: ['Design Presentation Visuals', 'Interactive Spatial Walkthroughs', 'Exterior & Interior Renders']
  },
  {
    id: 'interior-designers',
    role: 'Interior Designers & Stylists',
    tagline: 'Evaluate textures, lighting conditions, and spatial flow before procurement.',
    description: 'Explore material pairings, millwork details, and lighting configurations in realistic 3D environments before ordering materials and custom furniture.',
    painPoint: 'Uncertainty around how materials, colors, and lighting will interact in the built room.',
    solution: 'Realistic lighting and material finish studies for confident selection.',
    icon: 'Palette',
    deliverables: ['Material & Lighting Studies', 'Interior Ambiance Visualizations', 'Custom Joinery Previews']
  },
  {
    id: 'developers',
    role: 'Real Estate Developers & Builders',
    tagline: 'Showcase unbuilt developments to buyers, investors, and municipal stakeholders.',
    description: 'Provide compelling visual representations of upcoming residential and commercial projects to facilitate marketing, investor presentations, and planning discussions.',
    painPoint: 'Communicating project value and spatial quality prior to physical construction.',
    solution: 'High-impact 3D imagery and interactive walkthroughs of unbuilt spaces.',
    icon: 'Building2',
    deliverables: ['Project Showcase Renders', 'Interactive Unit Walkthroughs', 'Exterior Building Visuals']
  },
  {
    id: 'contractors',
    role: 'Contractors & Construction Companies',
    tagline: 'Understand spatial coordination and construction sequences prior to site execution.',
    description: 'Leverage 3D models and visual phasing to review spatial relationships, identify potential coordination issues, and align site teams around the design intent.',
    painPoint: 'Drawing misinterpretations and interdisciplinary coordination gaps discovered on site.',
    solution: 'Coordinated 3D BIM models and visual sequence planning.',
    icon: 'Wrench',
    deliverables: ['3D Coordination Models', 'Visual Phasing Studies', 'Spatial Relationship Reviews']
  },
  {
    id: 'consultants',
    role: 'Engineering & Design Consultants',
    tagline: 'Collaborate across disciplines with unified 3D spatial representations.',
    description: 'Review architectural and structural relationships in coordinated 3D models to ensure design consistency across technical disciplines.',
    painPoint: 'Siloed drawings leading to spatial conflicts across engineering disciplines.',
    solution: 'Integrated 3D BIM models for multidisciplinary review.',
    icon: 'Layers',
    deliverables: ['Interdisciplinary Spatial Review', 'Volumetric Coordination', 'Design Alignment Support']
  },
  {
    id: 'property-owners',
    role: 'Property Owners & Private Clients',
    tagline: 'Experience your future home or space before building starts.',
    description: 'Building or renovating is a major investment. Walk through room layouts, check window placements, and understand room sizes in advance to build with confidence.',
    painPoint: 'Anxiety about whether rooms will feel right, bright, or spacious once constructed.',
    solution: 'Intuitive visual walkthroughs designed for easy client understanding.',
    icon: 'Key',
    deliverables: ['Room-by-Room Walkthroughs', 'Elevation & Floor Visualizations', 'Material Option Previews']
  },
  {
    id: 'project-teams',
    role: 'Project Management Teams',
    tagline: 'Maintain visual clarity and milestone alignment across project phases.',
    description: 'Use coordinated 3D visualization as a shared reference point to support stakeholder communication, milestone planning, and progress reviews.',
    painPoint: 'Communication disconnects between designers, clients, and execution teams.',
    solution: 'Shared visual models and milestone representations across the project lifecycle.',
    icon: 'Users2',
    deliverables: ['Milestone Visual Planning', 'Stakeholder Review Models', 'Progress Communication Visuals']
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

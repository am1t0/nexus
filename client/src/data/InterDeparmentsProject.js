const interdepartmentalProjects = [
  {
    id: 1,
    name: "Smart Traffic Management System",
    description: "Developing an intelligent traffic system using IoT and AI.",
    contractor: "City Infrastructure Corp.",
    status: "Ongoing",
    startDate: "2023-01-15",
    endDate: "2024-12-31",
    budget: "$5,000,000",
    milestones: [
      { milestone: "Phase 1: IoT Sensors Installation", date: "2023-06-01" },
      { milestone: "Phase 2: AI System Integration", date: "2023-11-01" },
      { milestone: "Phase 3: System Testing", date: "2024-06-01" },
    ],
    detailsOfWork: "Installation of IoT sensors across major intersections, integration of AI for traffic pattern analysis, and deployment of real-time traffic management dashboards."
  },
  {
    id: 2,
    name: "Indore Smart City Development",
    description: "A comprehensive project aimed at transforming Indore into a smart city by upgrading its infrastructure, integrating advanced technologies, and enhancing public services.",
    contractor: "Indore Urban Development Authority",
    status: "Ongoing",
    startDate: "2023-03-01",
    endDate: "2025-12-31",
    budget: "$50,000,000",
    milestones: [
      { milestone: "Phase 1: Infrastructure Upgrade", "date": "2023-09-01" },
      { milestone: "Phase 2: Smart Systems Integration", "date": "2024-04-01" },
      { milestone: "Phase 3: Public Services Enhancement", "date": "2024-11-01" },
      { milestone: "Phase 4: Final Testing and Rollout", "date": "2025-05-01" }
    ],
    detailsOfWork: "The project involves the construction of new roads, installation of smart lighting, integration of IoT devices across the city, deployment of AI-based traffic management, and enhancement of water supply and waste management systems.",
   area: [
    { "lat": 22.733, "lng": 75.850 },
    { "lat": 22.737, "lng": 75.850 },
    { "lat": 22.737, "lng": 75.870 },
    { "lat": 22.733, "lng": 75.870 },
  ],
    conflicts: [],
    department: "Urban Development",
    departments: ["Transportation", "Water Management", "Energy"],
    editorContent: "<p>The project will significantly boost Indore's infrastructure and public services.</p>",
    implementer: "ABC Constructions Pvt. Ltd.",
    isInterDepartmental: true,
    resources: ["Heavy Machinery", "IoT Devices", "AI Software"],
    startDate: "2024-09-01",
    status: "Planning"
  }
  
  ,
  {
    id: 3,
    name: "Urban Waste Recycling Program",
    description: "Enhancing waste management and recycling processes.",
    contractor: "CleanCity Enterprises",
    status: "Ongoing",
    startDate: "2022-09-01",
    endDate: "2024-03-31",
    budget: "$3,500,000",
    milestones: [
      { milestone: "Phase 1: Waste Collection Optimization", date: "2022-12-01" },
      { milestone: "Phase 2: Recycling Facility Upgrade", date: "2023-06-01" },
      { milestone: "Phase 3: Public Awareness Campaign", date: "2023-12-01" },
    ],
    detailsOfWork: "Optimization of waste collection routes, upgrading of recycling facilities, and conducting public awareness campaigns to increase participation in recycling programs."
  },
  {
    id: 4,
    name: "Water Conservation and Management",
    description: "Optimizing water usage and distribution systems.",
    contractor: "HydroTech Ltd.",
    status: "Completed",
    startDate: "2021-05-01",
    endDate: "2023-02-28",
    budget: "$4,000,000",
    milestones: [
      { milestone: "Phase 1: Water Usage Audit", date: "2021-08-01" },
      { milestone: "Phase 2: Infrastructure Upgrades", date: "2022-01-01" },
      { milestone: "Phase 3: Smart Metering Implementation", date: "2022-10-01" },
    ],
    detailsOfWork: "Conducting a comprehensive water usage audit, upgrading water distribution infrastructure, and implementing smart metering systems for efficient water management."
  },
  {
    id: 5,
    name: "Public Safety Enhancement",
    description: "Integrating surveillance and emergency response systems.",
    contractor: "SecureSafe Inc.",
    status: "Ongoing",
    startDate: "2023-03-01",
    endDate: "2025-12-31",
    budget: "$7,000,000",
    milestones: [
      { milestone: "Phase 1: Surveillance System Installation", date: "2023-07-01" },
      { milestone: "Phase 2: Emergency Response System Integration", date: "2024-01-01" },
      { milestone: "Phase 3: Data Analytics Platform Deployment", date: "2024-09-01" },
    ],
    detailsOfWork: "Installation of city-wide surveillance systems, integration of emergency response platforms, and deployment of data analytics for real-time monitoring and incident prediction."
  },
  {
    id: 6,
    name: "Smart Parking Solutions",
    description: "Developing a real-time smart parking management system.",
    contractor: "ParkEase Technologies",
    status: "Upcoming",
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    budget: "$2,500,000",
    milestones: [
      { milestone: "Phase 1: Sensor Deployment in Parking Lots", date: "2024-07-01" },
      { milestone: "Phase 2: Real-Time Parking App Development", date: "2024-11-01" },
      { milestone: "Phase 3: System Testing and Launch", date: "2025-02-01" },
    ],
    detailsOfWork: "Deployment of sensors in parking areas, development of a real-time parking availability app, and system testing to ensure seamless user experience."
  },
  {
    id: 7,
    name: "Health and Wellness Programs",
    description: "Creating wellness programs for city employees.",
    contractor: "WellnessFirst",
    status: "Ongoing",
    startDate: "2023-02-01",
    endDate: "2025-01-31",
    budget: "$1,500,000",
    milestones: [
      { milestone: "Phase 1: Mental Health Initiatives", date: "2023-06-01" },
      { milestone: "Phase 2: Physical Fitness Programs", date: "2024-01-01" },
      { milestone: "Phase 3: Wellness Monitoring Platform", date: "2024-08-01" },
    ],
    detailsOfWork: "Implementation of mental health support services, development of physical fitness programs, and deployment of a wellness monitoring platform for employees."
  },
  {
    id: 8,
    name: "Digital Education Platform",
    description: "Facilitating online learning and training for residents.",
    contractor: "EduTech Innovators",
    status: "Ongoing",
    startDate: "2022-11-01",
    endDate: "2024-10-31",
    budget: "$3,000,000",
    milestones: [
      { milestone: "Phase 1: Platform Design and Development", date: "2023-03-01" },
      { milestone: "Phase 2: Course Content Creation", date: "2023-08-01" },
      { milestone: "Phase 3: Pilot Testing and Feedback", date: "2024-01-01" },
    ],
    detailsOfWork: "Design and development of the digital education platform, creation of course content, and pilot testing with feedback collection for final adjustments."
  },
  {
    id: 9,
    name: "Smart Building Infrastructure",
    description: "Retrofitting buildings with smart technologies.",
    contractor: "BuildSmart Solutions",
    status: "Upcoming",
    startDate: "2024-06-01",
    endDate: "2026-05-31",
    budget: "$8,000,000",
    milestones: [
      { milestone: "Phase 1: Building Audit and Assessment", date: "2024-10-01" },
      { milestone: "Phase 2: Technology Integration", date: "2025-04-01" },
      { milestone: "Phase 3: System Testing and Optimization", date: "2025-11-01" },
    ],
    detailsOfWork: "Conducting audits of existing buildings, integrating smart technologies for energy efficiency and automation, and optimizing systems for peak performance."
  },
  {
    id: 10,
    name: "Community Engagement and Feedback System",
    description: "Developing a platform for resident feedback and engagement.",
    contractor: "ConnectCommunity",
    status: "Ongoing",
    startDate: "2023-04-01",
    endDate: "2025-03-31",
    budget: "$1,000,000",
    milestones: [
      { milestone: "Phase 1: Requirement Gathering and Design", date: "2023-08-01" },
      { milestone: "Phase 2: Platform Development", date: "2024-02-01" },
      { milestone: "Phase 3: Pilot Testing and Deployment", date: "2024-11-01" },
    ],
    detailsOfWork: "Gathering requirements from stakeholders, designing and developing the engagement platform, and conducting pilot testing before city-wide deployment."
  },
];

export default interdepartmentalProjects;

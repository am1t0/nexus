export const departments = [
  {
    name: "Public Works",
    personnel: ["John Doe", "Jane Smith"],
    tasks: [
      { name: "Road Construction", progress: 70, deadline: "2024-06-30" },
      { name: "Bridge Maintenance", progress: 45, deadline: "2024-12-15" },
    ],
    resources: ["Concrete", "Steel", "$1M Budget"],
    reports: [
      { title: "Initial Assessment", url: "/reports/initial-assessment.pdf" },
      { title: "Mid-Project Review", url: "/reports/mid-project-review.pdf" },
    ],
    description: "Responsible for constructing and maintaining public infrastructure including roads and bridges.",
    deadlines: ["2024-06-30", "2024-12-15"]
  },
  {
    name: "Transportation",
    personnel: ["Michael Johnson", "Alice Brown"],
    tasks: [
      { name: "Bus Route Expansion", progress: 60, deadline: "2024-08-15" },
      { name: "Traffic Signal Upgrade", progress: 80, deadline: "2024-10-30" },
    ],
    resources: ["Traffic Lights", "Buses", "$500K Budget"],
    reports: [
      { title: "Route Planning", url: "/reports/route-planning.pdf" },
      { title: "Signal Upgrade Report", url: "/reports/signal-upgrade.pdf" },
    ],
    description: "Focuses on expanding and upgrading public transportation infrastructure to improve city mobility.",
    deadlines: ["2024-08-15", "2024-10-30"]
  },
  {
    name: "Water Management",
    personnel: ["Emily Clark", "David Wilson"],
    tasks: [
      { name: "Pipeline Replacement", progress: 90, deadline: "2024-07-20" },
      { name: "Reservoir Maintenance", progress: 50, deadline: "2024-11-05" },
    ],
    resources: ["Pipes", "Water Treatment Chemicals", "$750K Budget"],
    reports: [
      { title: "Pipeline Inspection", url: "/reports/pipeline-inspection.pdf" },
      { title: "Reservoir Maintenance Report", url: "/reports/reservoir-maintenance.pdf" },
    ],
    description: "Responsible for maintaining and upgrading water supply systems, including pipelines and reservoirs.",
    deadlines: ["2024-07-20", "2024-11-05"]
  },
  {
    name: "Environmental Protection",
    personnel: ["Olivia Martin", "Liam Davis"],
    tasks: [
      { name: "Air Quality Monitoring", progress: 85, deadline: "2024-09-15" },
      { name: "Waste Management Upgrade", progress: 65, deadline: "2024-12-01" },
    ],
    resources: ["Monitoring Stations", "Recycling Bins", "$300K Budget"],
    reports: [
      { title: "Air Quality Report", url: "/reports/air-quality.pdf" },
      { title: "Waste Management Plan", url: "/reports/waste-management.pdf" },
    ],
    description: "Focuses on monitoring and improving air quality and upgrading waste management systems.",
    deadlines: ["2024-09-15", "2024-12-01"]
  },
];

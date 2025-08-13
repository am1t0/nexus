const project = {
    name: "Rajwada Main Square Renovation",
    description: "A comprehensive renovation of the Rajwada Main Square to enhance public spaces, improve accessibility, and promote cultural heritage.",
    department: "Department of Roadways",
    start: "01 Jan 2025",
    end: "31 Dec 2026",
    budget: "₹10 Crores",
    contractor: "XYZ Pvt Ltd",
    contacts: [
        { name: "Amit Sharma", phone: "999-111-2233", email: "amit.sharma@roadways.gov.in" },
        { name: "Priya Mehta", phone: "888-222-3344", email: "priya.mehta@roadways.gov.in" }
    ],
    coordinates: [
        { lat: 22.7505, lng: 75.895 },
        { lat: 22.7509, lng: 75.8955 },
        { lat: 22.751, lng: 75.896 },
        { lat: 22.7507, lng: 75.8966 },
        { lat: 22.7502, lng: 75.8964 },
        { lat: 22.7498, lng: 75.8958 }
    ],
    conflicts: [
        { 
            tag: "overlapping-region",
            project: "ABC Construction at YJ",
            department: "Department of Urban Development",
            contacts: [
                { name: "John Doe", phone: "123-456-7890" },
                { name: "Jane Smith", phone: "987-654-3210" }
            ],
            coordinates: [
                { lat: 22.7506, lng: 75.8952 },
                { lat: 22.75085, lng: 75.8957 },
                { lat: 22.75075, lng: 75.89615 },
                { lat: 22.7504, lng: 75.8963 },
                { lat: 22.75015, lng: 75.89585 }
            ]
        },
        { 
            tag: "overlapping-region",
            project: "Heritage Pathway Upgrade",
            department: "Department of Tourism",
            contacts: [
                { name: "Ravi Kapoor", phone: "777-333-4444" },
                { name: "Anita Desai", phone: "666-444-5555" }
            ],
            coordinates: [
                { lat: 22.75035, lng: 75.89495 },
                { lat: 22.75065, lng: 75.8954 },
                { lat: 22.75055, lng: 75.8959 },
                { lat: 22.7502, lng: 75.89605 },
                { lat: 22.74995, lng: 75.89555 }
            ]
        }
    ],
    report: [
        { filename: "inspection_report_1.pdf", link: "url", date: "05 Aug 2025" },
        { filename: "inspection_report_2.pdf", link: "url", date: "12 Aug 2025" },
        { filename: "inspection_report_3.pdf", link: "url", date: "20 Aug 2025" }
    ]
};

export default project;

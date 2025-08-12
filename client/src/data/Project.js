const project = {
    name: "Rajwada Main Square Renovation",
    description: "A comprehensive renovation of the Rajwada Main Square to enhance public spaces, improve accessibility, and promote cultural heritage.",
    department: "Department of Roadways",
    start: "01-Jan-2025",
    end: "31-Dec-2026",
    budget: "₹10 Crores",
    contractor: "XYZ Pvt Ltd",
    contacts: [
        { name: "Amit Sharma", phone: "999-111-2233", email: "amit.sharma@roadways.gov.in" },
        { name: "Priya Mehta", phone: "888-222-3344", email: "priya.mehta@roadways.gov.in" }
    ],
    coordinates: [
        { lat: 22.7505, lng: 75.895 },
        { lat: 22.751, lng: 75.8962 },
        { lat: 22.7498, lng: 75.897 },
        { lat: 22.7493, lng: 75.8958 }
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
                { lat: 22.7506, lng: 75.8951 },
                { lat: 22.7509, lng: 75.8963 },
                { lat: 22.7499, lng: 75.8969 },
                { lat: 22.7494, lng: 75.8957 }
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
                { lat: 22.7504, lng: 75.895 },
                { lat: 22.7508, lng: 75.8961 },
                { lat: 22.7497, lng: 75.8968 },
                { lat: 22.7492, lng: 75.8956 }
            ]
        },
        { 
            tag: "other",
            project: "Old Bazaar Facade Restoration",
            department: "Department of Cultural Affairs",
            contacts: [
                { name: "Suresh Rao", phone: "555-666-7777" },
                { name: "Leena Khanna", phone: "444-777-8888" }
            ],
            coordinates: [
                { lat: 22.75055, lng: 75.89505 },
                { lat: 22.75095, lng: 75.89615 },
                { lat: 22.74985, lng: 75.89695 },
                { lat: 22.74935, lng: 75.89575 }
            ]
        }
    ],
    report: [
        { filename: "inspection_report_1.pdf", link: "url", date: "05-Aug-2025" },
        { filename: "inspection_report_2.pdf", link: "url", date: "12-Aug-2025" },
        { filename: "inspection_report_3.pdf", link: "url", date: "20-Aug-2025" }
    ]
};

export default project;
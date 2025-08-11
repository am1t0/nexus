import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapComponent } from "../../components/map/Map";
import "./projectPage.css";

export default function ProjectPage() {
  const { project } = useParams();
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { key: "details", label: "Details" },
    { key: "conflicts", label: "Conflicts" },
    { key: "report", label: "Report" },
  ];

  const tabContent = {
    details: (
      <ul>
        <li>Project started: Jan 2025</li>
        <li>Estimated completion: Dec 2026</li>
        <li>Budget: ₹10 Crores</li>
        <li>Contractor: XYZ Pvt Ltd</li>
      </ul>
    ),
    conflicts: (
      <ul>
        <li>Underground Telephonic wires</li>
        <li>Forest Area Cover</li>
        <li>Dispute with locals over technique</li>
        <li>Weather issues</li>
      </ul>
    ),
    report: (
      <div>
        <p>Last inspection date: 05-Aug-2025</p>
        <p>Progress: 45% completed</p>
        <p>Next review scheduled: 20-Aug-2025</p>
      </div>
    ),
  };

  return (
    <div className="project-page">
      <div id="project-header">
        <h4>{decodeURIComponent(project)}</h4>
        <h5>Department of Roadways</h5>
      </div>

      <div className="project-content">
        {/* LEFT SIDE */}
        <div className="project-left">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`tab-button ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tab-content">{tabContent[activeTab]}</div>
        </div>

        {/* RIGHT SIDE */}
        <div className="project-right">
          <MapComponent
            const
            markedAreas={[
              {
                id: "area1",
                description: "Rajwada Main Square",
                coordinates: [
                  { lat: 22.7505, lng: 75.895 },
                  { lat: 22.751, lng: 75.8962 },
                  { lat: 22.7498, lng: 75.897 },
                  { lat: 22.7493, lng: 75.8958 },
                ],
              },
            ]}
            mapStyle={{ height: "70vh", width: "100%" }}
            filterShown={false}
          />
        </div>
      </div>
    </div>
  );
}

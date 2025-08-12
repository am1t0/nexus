import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapComponent } from "../../components/map/Map";
import projectData from '../../data/Project.js'
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
      <div>
        <p className="project-description">
          <strong>Description:</strong> {projectData.description}
        </p>
        <ul>
          <li>Project started: {projectData.start}</li>
          <li>Estimated completion: {projectData.end}</li>
          <li>Budget: {projectData.budget}</li>
          <li>Contractor: {projectData.contractor}</li>
        </ul>
        <h5>Contact Details:</h5>
        <ul>
          {projectData.contacts.map((c, i) => (
            <li key={i}>
              {c.name} - {c.phone} ({c.email})
            </li>
          ))}
        </ul>
      </div>
    ),
    conflicts: (
      <div>
        {projectData.conflicts.map((conflict, i) => (
          <div key={i} className="conflict-block">
            <h5>{conflict.project}</h5>
            <p><strong>Department:</strong> {conflict.department}</p>
            <p><strong>Contacts:</strong></p>
            <ul>
              {conflict.contacts.map((c, j) => (
                <li key={j}>{c.name} - {c.phone}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
    report: (
      <div>
        {projectData.report.map((r, i) => (
          <div key={i} className="report-block">
            <a href={r.link} target="_blank" rel="noopener noreferrer">{r.filename}</a>
            <p>Date: {r.date}</p>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="project-page">
      <div id="project-header">
        <h4>{decodeURIComponent(project)}</h4>
        <h5>{projectData.department}</h5>
      </div>

      <div className="project-content">
        {/* LEFT SIDE */}
        <div className="project-left">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
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
            markedAreas={[
              {
                id: "main",
                description: projectData.name,
                coordinates: projectData.coordinates,
              },
              ...projectData.conflicts.map((c, idx) => ({
                id: `conflict-${idx}`,
                description: c.project,
                coordinates: c.coordinates,
              }))
            ]}
            mapStyle={{ height: "70vh", width: "100%" }}
            filterShown={false}
          />
        </div>
      </div>
    </div>
  );
}

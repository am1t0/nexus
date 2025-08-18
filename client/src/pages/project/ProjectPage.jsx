import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapComponent } from "../../components/map/Map";
import projectData from "../../data/Project.js";
import "./projectPage.css";
import Conflicts from "../../sections/projects/Conflicts/Conflicts.jsx";
import Details from "../../sections/projects/Details/Details.jsx";
import Report from "../../sections/projects/Report/Report.jsx";
import Contacts from "../../sections/projects/Contacts/Contacts.jsx";

export default function ProjectPage() {
  const { project } = useParams();
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { key: "details", label: "Details" },
    { key: "conflicts", label: "Conflicts" },
    { key: "report", label: "Report" },
    { key: "contacts", label: "Contacts" },
  ];

  const tabContent = {
    details: <Details projectData = {projectData} />,
    conflicts: <Conflicts conflicts={projectData.conflicts} />,
    report: <Report projectData = {projectData} />,
    contacts:<Contacts projectData = {projectData} />
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
            markedAreas={[
              {
                tag: "main",
                description: projectData.name,
                coordinates: projectData.coordinates,
              },
              ...(activeTab === "conflicts"
                ? projectData.conflicts.map((c, idx) => ({
                    tag: c.tag,
                    description: c.project,
                    coordinates: c.coordinates,
                  }))
                : []),
            ]}
            mapStyle={{ height: "70vh", width: "100%" }}
            filterShown={false}
          />
        </div>
      </div>
    </div>
  );
}

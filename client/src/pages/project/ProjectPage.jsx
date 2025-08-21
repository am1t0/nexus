import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapComponent } from "../../components/map/Map";
import projectData from "../../data/Project.js";
import "./projectPage.css";
import Conflicts from "../../sections/projects/Conflicts/Conflicts.jsx";
import Details from "../../sections/projects/Details/Details.jsx";
import Report from "../../sections/projects/Report/Report.jsx";
import Contacts from "../../sections/projects/Contacts/Contacts.jsx";
import Overlay from "../../components/overlay/Overlay.jsx";

export default function ProjectPage() {
  const { project } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [editMode, setEditMode] = useState(false);

  const tabs = [
    { key: "details", label: "Details" },
    { key: "conflicts", label: "Conflicts" },
    { key: "report", label: "Report" },
    { key: "contacts", label: "Contacts" },
  ];

  const tabContent = {
    details: <Details projectData = {projectData} setEditMode={setEditMode}/>,
    conflicts: <Conflicts conflicts={projectData.conflicts} setEditMode={setEditMode}/>,
    report: <Report projectData = {projectData} setEditMode={setEditMode}/>,
    contacts:<Contacts projectData = {projectData} setEditMode={setEditMode}/>
  };

  const ShowEditOverlay = () => {
    switch(activeTab){
      case "details":
        return <Overlay 
          title="Edit Project Details"
          content={<Details projectData={projectData} editMode={editMode} setEditMode={setEditMode} />}
          onClose={() => setEditMode(false)}
        />;
      case "conflicts":
        return <Overlay 
          title="Edit Conflicts"
          content={<Conflicts conflicts={projectData.conflicts} editMode={editMode} setEditMode={setEditMode} />}
          onClose={() => setEditMode(false)}
        />;
      case "report":
        return <Overlay 
          title="Edit Report"
          content={<Report projectData={projectData} editMode={editMode} setEditMode={setEditMode} />}
          onClose={() => setEditMode(false)}
        />; 
      case "contacts":
        return <Overlay 
          title="Edit Contacts"
          content={<Contacts projectData={projectData} editMode={editMode} setEditMode={setEditMode} />}
          onClose={() => setEditMode(false)}
        />;
      default:
        return null; // No overlay for other tabs
    }
  }


  return (
    <div className="project-page">
      { editMode && ShowEditOverlay()}
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

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapComponent } from "../../components/map/Map";
import projectData from "../../data/Project.js";
import "./projectPage.css";
import { FaPhoneAlt, FaEnvelope, FaDownload, FaOpenid, FaArrowCircleDown, FaArrowDown, FaBoxOpen } from "react-icons/fa";

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
    details: (
      <div>
        <p className="project-description">
          <strong>Description:</strong> {projectData.description}
        </p>

        {/* Project Properties */}
        <div className="project-details">
          <div className="detail-row">
            <span className="detail-key">Project started:</span>
            <span className="detail-value">{projectData.start}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Estimated completion:</span>
            <span className="detail-value">{projectData.end}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Budget:</span>
            <span className="detail-value">{projectData.budget}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Contractor:</span>
            <span className="detail-value">{projectData.contractor}</span>
          </div>
        </div>
      </div>
    ),
    conflicts: (
      <div>
        {projectData.conflicts.map((conflict, i) => (
          <div key={i} className="conflict-block">
            <h5>{conflict.project}</h5>
            <p>
              <strong>Department:</strong> {conflict.department}
            </p>
            <p>
              <strong>Contacts:</strong>
            </p>
            <ul>
              {conflict.contacts.map((c, j) => (
                <li key={j}>
                  {c.name} - {c.phone}
                </li>
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
             <div className="file-details">
             <p>{r.filename}</p>
            <span>{r.date}</span>
             </div>
             <div className="file-options">
               <p>download</p>
               <p>open</p>
             </div>
          </div>
        ))}
      </div>
    ),
    contacts: (
      <div>
        {/* Contact Information */}
        <h5>Contact Details:</h5>
        <div className="contact-list">
          {projectData.contacts.map((c, i) => (
            <div key={i} className="contact-card">
              {/* Left side - Photo + Name + Designation */}
              <div className="contact-left">
                <img
                  src={
                    c.photo ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"
                  }
                  alt={c.name}
                  className="contact-photo"
                />
                <h6 className="contact-name">{c.name}</h6>
                <span className="contact-role">
                  {c.role || "Project Manager"}
                </span>
              </div>

              {/* Right side - Contact Info */}
              <div className="contact-right">
                <div className="contact-info">
                  <FaPhoneAlt className="contact-icon phone" />
                  <span>{c.phone}</span>
                </div>
                <div className="contact-info">
                  <FaEnvelope className="contact-icon email" />
                  <span>{c.email || "Not Available"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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

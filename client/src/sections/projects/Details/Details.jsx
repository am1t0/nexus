import React from 'react'
import './details.css'

export default function Details(props) {

 const { projectData, setEditMode } = props;
  return (
      <div>
        <div className="control-bar">
          <button onClick={()=> setEditMode((prev)=> !prev)}>Edit</button>
        </div>
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
  );
}

import {
  faCalendarAlt,
  faEdit,
  faMap,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import interdepartmentalProjects from "../../../data/InterDeparmentsProject";
import { useEffect } from "react";
import { useFirebase } from "../../../Firebase";
import {
  faMapMarkerAlt,
  faMoneyBillWave,
  faTrash,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const ProjectDetail = () => {
  const [project, setProject] = useState(null);
  const firebase = useFirebase();
  const { projectId } = useParams();
  const mapStyle ={
    height: "350px",
  }

  const fetchProjectData = async () => {
    let fetchedProject = await firebase.fetchProject(projectId);

    if (!fetchedProject) {
      fetchedProject = interdepartmentalProjects.find(
        (project) => project.id === projectId
      );
    }
    setProject(fetchedProject);
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>; // Add a loading state
  }

  const today = new Date();
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const totalDuration = endDate - startDate;
  const elapsedDuration = today - startDate;
  const progressPercentage = Math.min(
    (elapsedDuration / totalDuration) * 100,
    100
  );

  const markedArea = [
    {
      id: projectId,
      description: project.name,
      coordinates: project.area,
    },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title">{project.name || "Project Name"}</h3>
          <h6 className="text-muted">
            Implemented by: {project.implementer || "Unknown"}
          </h6>

          {progressPercentage < 100 ? (
            <div className="progress mb-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(progressPercentage)}%
              </div>
              <p className="text-muted mb-0">01 January 2024</p>
            </div>
          ) : (
            <p className="badge bg-primary">{project.status || "Completed"}</p>
          )}

          <hr />

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="mb-3 p-3 bg-light rounded">
                <h5>Description</h5>
                <p>{project.description || "No description available"}</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card bg-primary text-white mb-3">
                    <div className="card-body">
                      <h6 className="card-title">Start Date</h6>
                      <p className="card-text">{project.startDate}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-warning text-white mb-3">
                    <div className="card-body">
                      <h6 className="card-title">End Date</h6>
                      <p className="card-text">{project.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="mb-3"
                style={{
                  height: "350px",
                  backgroundColor: "#d3d3d3",
                  borderRadius: "8px",
                  textAlign: "center",
                  lineHeight: "200px",
                }}
              >
                <MapComponent markedAreas={markedArea} mapStyle={mapStyle}/>
              </div>
              <div className="mb-3 p-3 bg-light rounded">
                <h5>Conflicts</h5>
                <ul className="list-group">
                  {project.conflicts?.length > 0 ? (
                    project.conflicts.map((conflict, index) => (
                      <li key={index} className="list-group-item my-2">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>{conflict.existingProjectDetails.department}</h5>
                          <Link
                            to={`/communicate/${conflict.existingProjectDetails.department}`}
                          >
                            <FontAwesomeIcon icon={faMessage} />
                          </Link>
                        </div>
                        <h6>{conflict.existingProjectDetails.name}</h6>
                        <span className="badge bg-warning">
                          {conflict.existingProjectDetails.status}
                        </span>
                        <div className="mt-2">
                          <strong>Start Date: </strong>
                          <span className="badge bg-light text-dark ms-3">
                            {new Date(
                              conflict.existingProjectDetails.startDate
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <strong className="ms-3">End Date: </strong>
                          <span className="badge bg-light text-dark ms-3">
                            {new Date(
                              conflict.existingProjectDetails.endDate
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="mt-3">
                          {conflict.existingProjectDetails.description}
                        </p>
                        <span className="badge bg-danger">
                          Overlap: {conflict.percentageOverlapNewProject}%
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>No conflicts</li>
                  )}
                </ul>
              </div>
              <p className="text-muted mb-0">04 December 2026</p>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-light">
            <hr style={{ backgroundColor: '#e0e0e0' }} />
            <div className="text-center mb-3">
              <h5 className="text-muted" style={{ fontWeight: 'bold', color: '#495057' }}>Project Details</h5>
            </div>
            <hr style={{ backgroundColor: '#e0e0e0' }} />
          </div>
          <div className="d-flex justify-content-between mb-4" style={{ gap: '5rem' }}>
            <div style={{ padding: '10px', borderRadius: '5px', width: '45%' }}>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faMap} style={{ color: '#28a745', marginRight: '5px' }} />
                <p className="mb-1" style={{ fontWeight: 'bold', color: '#495057' }}>Area</p>
              </div>
              <p className="text-muted mb-0">44/A Greater Brijeshwari Canal</p>
            </div>
            <div style={{ padding: '10px', borderRadius: '5px', width: '45%' }}>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: 'orange', marginRight: '5px' }} />
                <p className="mb-1" style={{ fontWeight: 'bold', color: '#495057' }}>Budget</p>
              </div>
              <p className="text-muted mb-0">$450,000</p>
            </div>
          </div>

          {/* Contractor */}
          <div style={{ padding: '10px', borderRadius: '5px', width: '100%' }}>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUserTie} style={{ color: '#6c757d', marginRight: '5px' }} />
              <p className="mb-1" style={{ fontWeight: 'bold', color: '#495057' }}>Contractor</p>
            </div>
            <p className="text-muted mb-0">APS TECHNOLOGY AND CONSTRUCTION LTD</p>
          </div>
        </div>

        {/* Right Section: Map */}
        <div className="col-md-6 d-flex align-items-start justify-content-center mb-3">
          <div style={{ width: '100%', height: '400px', backgroundColor: '#eaeaea', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#777' }}>Map Preview</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="row mt-4">
        <div className="col">
          <h5 className="text-muted" style={{ fontWeight: 'bold', color: '#495057' }}>Description</h5>
          <p className="text-muted">
            This project focuses on implementing water conservation techniques in Greater Noida. It aims to reduce water waste and promote sustainable usage of water resources through advanced irrigation techniques and rainwater harvesting methods.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

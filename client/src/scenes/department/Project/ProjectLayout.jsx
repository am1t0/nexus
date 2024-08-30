import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faMailBulk, faMailForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProjectDetail = ({ project = {} }) => {
  // Calculate the progress percentage
  const [communicate, setCommunicate] = useState('');
  const { department } = useParams();

  const today = new Date();
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const totalDuration = endDate - startDate;
  const elapsedDuration = today - startDate;
  const progressPercentage = Math.min(
    (elapsedDuration / totalDuration) * 100,
    100
  );

  return (
    <div className="container mt-5" style={{ position: "absolute" }}>
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title">{project.name || "Project Name"}</h3>
          <h6 className="text-muted">Implemented by: {project.implementer || "Unknown"}</h6>

          {progressPercentage < 100 ? (
            <div className="progress mb-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressPercentage}% ` }}
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(progressPercentage)}%
              </div>
            </div>
          ) : (
            <p className="badge bg-primary">{project.status || "Completed"}</p>
          )}

          <hr />

          <div className="row">
            <div className="col-md-6">
              <div
                className="mb-3 p-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                <h5>Description</h5>
                <p>{project.description || "No description available"}</p>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <button className="btn btn-primary">
                    <h6>Start Date</h6>
                  </button>
                  <p>{project.startDate || "N/A"}</p>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-warning">
                    <h6>End Date</h6>
                  </button>
                  <p>{project.endDate || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="mb-3"
                style={{
                  height: "200px",
                  backgroundColor: "#d3d3d3",
                  borderRadius: "8px",
                  textAlign: "center",
                  lineHeight: "200px",
                }}
              >
                Map Placeholder
              </div>

              <div className="mb-3 p-3">
                <h5>Conflicts</h5>
                <ul className="list-group">
                  {project.conflicts?.map((conflict, index) => (
                    <div key={index} className="list-group-item my-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <h3>{conflict.existingProjectDetails.department || "N/A"}</h3>
                        <Link to={`/communicate/${conflict.existingProjectDetails.department}`}>
                          <FontAwesomeIcon icon={faMessage} />
                        </Link>
                      </div>
                      <h6>{conflict.existingProjectDetails.name || "N/A"}</h6>
                      <span className="badge bg-warning">
                        {conflict.existingProjectDetails.status || "Pending"}
                      </span>
                      <div className="mt-2">
                        <strong>Start Date:</strong>
                        <span style={{ border: '1px solid grey', borderRadius: '4px' }} className="p-1 m-3">
                          {conflict.existingProjectDetails.startDate
                            ? new Date(conflict.existingProjectDetails.startDate).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })
                            : "N/A"}
                        </span>
                        <strong>End Date:</strong>
                        <span style={{ border: '1px solid grey', borderRadius: '4px' }} className="p-1 m-3">
                          {conflict.existingProjectDetails.endDate
                            ? new Date(conflict.existingProjectDetails.endDate).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })
                            : "N/A"}
                        </span>
                      </div>
                      <p>{conflict.existingProjectDetails.description || "No description available"}</p>
                      <span>Overlap</span>
                      <span className="badge bg-danger">{conflict.percentageOverlapNewProject || 0}%</span>
                    </div>
                  )) || <li>No conflicts</li>}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h5>Budget</h5>
            <p>{project.budget || "Not specified"} USD</p>
          </div>

          <div className="mb-3">
            <h5>Departments Involved</h5>
            <ul className="list-group">
              {project.departments?.map((department, index) => (
                <li key={index} className="list-group-item">
                  {department || "Unknown Department"}
                </li>
              )) || <li>No departments involved</li>}
            </ul>
          </div>

          <div className="mb-3">
            <h5>Milestones</h5>
            {project.milestones?.map((milestone, index) => (
              <p key={index}>{milestone || "No milestones available"}</p>
            )) || <p>No milestones</p>}
          </div>

          <div className="mb-3">
            <h5>Editor Content</h5>
            <p>{project.editorContent || "No additional content"}</p>
          </div>

          <div className="mb-3">
            <h5>Resources</h5>
            <p>{project.resources || "No resources specified"}</p>
          </div>

          <div className="mb-3">
            <h5>Area</h5>
            {/* <p>{project.area}</p> */}
          </div>

          <div className="mb-3">
            <h5>Details of Work</h5>
            <p>{project.detailsOfWork || "No work details provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

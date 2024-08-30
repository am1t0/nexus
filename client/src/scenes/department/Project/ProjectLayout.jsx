import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
const ProjectDetail = ({ project = {} }) => {
  // Calculate the progress percentage
  const [communicate, setCommunicate] = useState('');
  const { department } = useParams();

=======
const ProjectDetail = ({ project }) => {
  const [communicate] = useState('');
  
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
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
    <div className="container mt-5">
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

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="mb-3 p-3 bg-light rounded">
                <h5>Description</h5>
                <p>{project.description || "No description available"}</p>
              </div>
<<<<<<< HEAD

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
=======
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
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
                </div>
              </div>
            </div>

            <div className="col-md-6">
<<<<<<< HEAD
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
=======
              <div className="mb-3" style={{ height: "200px", backgroundColor: "#d3d3d3", borderRadius: "8px", textAlign: "center", lineHeight: "200px" }}>
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
                Map Placeholder
              </div>
              <div className="mb-3 p-3 bg-light rounded">
                <h5>Conflicts</h5>
                <ul className="list-group">
                  {project.conflicts?.map((conflict, index) => (
<<<<<<< HEAD
                    <div key={index} className="list-group-item my-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <h3>{conflict.existingProjectDetails.department || "N/A"}</h3>
=======
                    <li key={index} className="list-group-item my-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>{conflict.existingProjectDetails.department}</h5>
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
                        <Link to={`/communicate/${conflict.existingProjectDetails.department}`}>
                          <FontAwesomeIcon icon={faMessage} />
                        </Link>
                      </div>
<<<<<<< HEAD
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
=======
                      <h6>{conflict.existingProjectDetails.name}</h6>
                      <span className="badge bg-warning">{conflict.existingProjectDetails.status}</span>
                      <div className="mt-2">
                        <strong>Start Date: </strong>
                        <span className="badge bg-light text-dark ms-3">
                          {new Date(conflict.existingProjectDetails.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <strong className="ms-3">End Date: </strong>
                        <span className="badge bg-light text-dark ms-3">
                          {new Date(conflict.existingProjectDetails.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="mt-3">{conflict.existingProjectDetails.description}</p>
                      <span className="badge bg-danger">Overlap: {conflict.percentageOverlapNewProject}%</span>
                    </li>
                  ))}
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
                </ul>
              </div>
            </div>
          </div>

<<<<<<< HEAD
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
=======
          <div className="row">
            <div className="col-md-4">
              <div className="card bg-info text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">Budget</h5>
                  <p className="card-text">{project.budget} USD</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-secondary text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">Area</h5>
                  {/* <p className="card-text">{project.area}</p> */}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-success text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">Departments Involved</h5>
                  <ul className="list-group">
                    {project?.departments.map((department, index) => (
                      <li key={index} className="list-group-item">
                        {department}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h5>Milestones</h5>
            <ul className="list-group">
              {project.milestones.map((milestone, index) => (
                <li key={index} className="list-group-item">
                  {milestone}
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
                </li>
              )) || <li>No departments involved</li>}
            </ul>
          </div>

          <div className="mb-3">
<<<<<<< HEAD
            <h5>Milestones</h5>
            {project.milestones?.map((milestone, index) => (
              <p key={index}>{milestone || "No milestones available"}</p>
            )) || <p>No milestones</p>}
          </div>

          <div className="mb-3">
            <h5>Editor Content</h5>
            <p>{project.editorContent || "No additional content"}</p>
=======
            <h5>Editor Content</h5>
            <div className="card bg-light mb-3">
              <div className="card-body">
                <p>{project.editorContent}</p>
              </div>
            </div>
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
          </div>

          <div className="mb-3">
            <h5>Resources</h5>
<<<<<<< HEAD
            <p>{project.resources || "No resources specified"}</p>
          </div>

          <div className="mb-3">
            <h5>Area</h5>
            {/* <p>{project.area}</p> */}
=======
            <div className="card bg-light mb-3">
              <div className="card-body">
                {/* <p>{project.resources}</p> */}
              </div>
            </div>
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
          </div>

          <div className="mb-3">
            <h5>Details of Work</h5>
<<<<<<< HEAD
            <p>{project.detailsOfWork || "No work details provided"}</p>
=======
            <div className="card bg-light mb-3">
              <div className="card-body">
                <p>{project.detailsOfWork}</p>
              </div>
            </div>
>>>>>>> 601fc5cb7c707525ab74601cda77809ee4ec5e28
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

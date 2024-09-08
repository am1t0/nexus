import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import interdepartmentalProjects from "../../../data/InterDeparmentsProject";
import { useFirebase } from '../../../Firebase';
import { MapComponent } from "./Map";

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
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card bg-info text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">Budget</h5>
                  <p className="card-text">{project.budget || "N/A"} USD</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-secondary text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">Area</h5>
                  <p className="card-text">
                    {project.area
                      ? typeof project.area === "string"
                        ? project.area
                        : "Area information is not available"
                      : "No area information available"}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-success text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">Departments Involved</h5>
                  <ul className="list-group">
                    {project.departments?.length > 0 ? (
                      project.departments.map((department, index) => (
                        <li key={index} className="list-group-item">
                          {department}
                        </li>
                      ))
                    ) : (
                      <li>No departments involved</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h5>Milestones</h5>
            <ul className="list-group">
              {project.milestones?.length > 0 ? (
                project.milestones.map((milestone, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{milestone.milestone}</strong> -{" "}
                    {new Date(milestone.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </li>
                ))
              ) : (
                <li>No milestones</li>
              )}
            </ul>
          </div>

          <div className="mb-3">
            <h5>Editor Content</h5>
            <div className="card bg-light mb-3">
              <div className="card-body">
                <p>{project.editorContent || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

import React from 'react';

const ProjectDetail = ({ project }) => {
  return (
    <div className="container mt-5" style={{position:'absolute'}}>
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title">{project.name}</h3>
          <p className="text-muted">Implemented by: {project.implementer}</p>
          <p className="badge bg-primary">{project.status}</p>

          <hr />

          <div className="mb-3">
            <h5>Description</h5>
            <p>{project.description}</p>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Start Date</h5>
              <p>{new Date(project.startDate).toLocaleDateString()}</p>
            </div>
            <div className="col-md-6">
              <h5>End Date</h5>
              <p>{new Date(project.endDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-3">
            <h5>Budget</h5>
            <p>{project.budget} USD</p>
          </div>

          <div className="mb-3">
            <h5>Departments Involved</h5>
            {/* <ul className="list-group">
              {project.departments.map((department, index) => (
                <li key={index} className="list-group-item">
                  {department}
                </li>
              ))}
            </ul> */}
          </div>

          <div className="mb-3">
            <h5>Milestones</h5>
            <p>{project.milestones}</p>
          </div>

          <div className="mb-3">
            <h5>Editor Content</h5>
            <p>{project.editorContent}</p>
          </div>

          <div className="mb-3">
            <h5>Resources</h5>
            <p>{project.resources}</p>
          </div>

          <div className="mb-3">
            <h5>Area</h5>
            <p>{project.area}</p>
          </div>

          <div className="mb-3">
            <h5>Details of Work</h5>
            <p>{project.detailsOfWork}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

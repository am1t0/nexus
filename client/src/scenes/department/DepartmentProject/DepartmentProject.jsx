import React, { useEffect, useState } from 'react';
import ProjectCreationForm from '../Project/ProjectCreate';
import { useFirebase } from '../../../Firebase';
import ProjectDetail from '../Project/ProjectLayout';

export default function DepartmentProject() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapView, setMapView] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewedProjectId, setViewedProjectId] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Construction of Chimi to Panod Road Length 3.20 KM',
      status: 'completed',
      location: 'Indore-2',
      startDate: '2022-06-15',
      endDate: '2023-04-10',
      contractor: 'VEGA INFRA PROJECT INDORE'
    },
    // Other projects...
  ];

  const [projectList, setProjectList] = useState(projects);
  const firebase = useFirebase();

  useEffect(() => {
    firebase.fetchAllProjects(setProjectList);
  }, []);

  const filteredProjects = projectList.filter(project => {
    return (
      (statusFilter === 'all' || project.status === statusFilter) &&
      project?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleRowClick = (projectId) => {
    setViewedProjectId(viewedProjectId === projectId ? null : projectId);
  };

  return (
    <div className="container mt-5">
      {/* Filter Options */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
          <select
            id="statusFilter"
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="searchTerm" className="form-label">Search by Project Name</label>
          <input
            type="text"
            id="searchTerm"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex align-items-end gap-4">
          <button
            className={`btn ${mapView ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setMapView(!mapView)}
          >
            {mapView ? 'List View' : 'Map View'}
          </button>

          <button 
            className='btn btn-primary'
            onClick={() => setOpen(!open)}
          >
            Create Project
          </button>
        </div>
        {open && (
          <div className="container bg-light px-5" style={{ width: '80%', position: 'absolute' }}>
            <ProjectCreationForm setOpen={setOpen} />
          </div>
        )}
      </div>

      {/* Map View */}
      {mapView && (
        <div className="mb-4">
          <h5>Map View (Example placeholder)</h5>
          <div
            style={{
              height: '300px',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
              lineHeight: '300px',
            }}
          >
            Map will be displayed here.
          </div>
        </div>
      )}

      {/* Table of Projects */}
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th style={{ width: '40%' }}>Project Name</th>
            <th>Contractor</th>
            <th>Status</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project, index) => (
            <>
              <tr key={project.id} onClick={() => handleRowClick(project.id)}>
                <td>{index + 1}</td>
                <td>{project.name}</td>
                <td>{project.contractor}</td>
                <td>{project.status}</td>
                <td>{project.location}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
              </tr>
              {viewedProjectId === project.id && (
                <tr>
                  <td colSpan="7">
                    <ProjectDetail project={project} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {/* No projects found message */}
      {filteredProjects.length === 0 && (
        <div className="text-center mt-4">
          <p>No projects found.</p>
        </div>
      )}
    </div>
  );
}
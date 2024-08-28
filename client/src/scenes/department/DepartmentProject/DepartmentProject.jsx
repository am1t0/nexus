import React, { useEffect, useState } from 'react';
import ProjectCreationForm from '../Project/ProjectCreate';
import { useFirebase } from '../../../Firebase';
import ProjectDetail from '../Project/ProjectLayout';
import { MapComponent } from '../Project/Map';
import { useParams } from 'react-router-dom';

export default function DepartmentProject() {

  const {department} = useParams();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapView, setMapView] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewedProjectId, setViewedProjectId] = useState(null);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [markedAreas, setMarkedAreas] = useState([]);

  const [projectList, setProjectList] = useState([]);
  const firebase = useFirebase();

  const getProjects = async () => {
   const fetchedProjects =  await firebase.fetchDepartmentProject(department);
    setProjectList(fetchedProjects)
   const newMarkedAreas = fetchedProjects.map((project) => ({
     id: project.id,
     description: project.name,
     coordinates: project.area,
   }));
   
  //  Update the state once with all the new objects
   setMarkedAreas(newMarkedAreas);
 };

  useEffect(() => {
    getProjects();
  }, []);

  const filteredProjects = projectList.filter(project => {
    return (
      (statusFilter === 'all' || project.status === statusFilter) &&
      project?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
   
  const handleRowClick = (projectId, index) => {
    if (viewedProjectId === projectId) {
      setViewedProjectId(null);
      setClickedRowIndex(null);
    } else {
      setViewedProjectId(projectId);
      setClickedRowIndex(index);
    }
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
            <option value="collision">Collision</option>
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
          <div className="container bg-light px-5">
            <ProjectCreationForm projectList={projectList} setOpen={setOpen} />
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
            <MapComponent markedAreas={markedAreas} />
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
            <React.Fragment key={project.id}>
              <tr onClick={() => handleRowClick(project.id, index)}>
                <td>{index + 1}</td>
                <td>{project.name}</td>
                <td>{project.implementer}</td>
                <td>{project.status}</td>
                <td>{project.location}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
              </tr>
              {viewedProjectId === project.id && (
                <tr>
                  <td colSpan="7" style={{ position: 'relative', padding: 0 }}>
                    <div
                      className="project-detail-container"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 1,
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <ProjectDetail project={filteredProjects.find(proj => proj.id === viewedProjectId)} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Firebase';
import { BallTriangle } from 'react-loader-spinner';
import interdepartmentalProjects from '../../data/InterDeparmentsProject';
import { MapComponent } from '../department/Project/Map';
import ProjectDetail from '../department/Project/ProjectLayout'; // Assuming this is the correct path

export default function Entry() {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markedAreas, setMarkedAreas] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // Added state for selectedProject

  const getProjects = async () => {
    setLoading(true);
    try {
      const fetchedProjects = await firebase.fetchAllProjects(setProjectList);
      const newMarkedAreas = fetchedProjects.map((project) => ({
        id: project.id,
        description: project.name,
        coordinates: project.area,
      }));
      setMarkedAreas(newMarkedAreas);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const departmentsData = await firebase.fetchAllDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
    loadDepartments();
  }, []);

  const handleNavigate = (department) => {
    const formattedName = department.replace(/ /g, '-');
    navigate(`/${formattedName}`);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project); // Set the selected project
  };

  const handleCloseModal = () => {
    setSelectedProject(null); // Close the modal
  };

  return (
    !loading && departments.length !== 0 ? (
      <div className="container mt-4">
        <div className="row">
          {/* Department List */}
          <div className="col-md-6">
            <h3 className='my-3'>Urban Departments</h3>
            <ul className="list-group">
              {departments.map((department, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center mb-3 border"
                >
                  {department.deptName}
                  <span
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleNavigate(department.deptName)}
                  >
                    &gt;
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Section */}
          <div className="col-md-6">
            <h3 className='my-3'>Map</h3>
            <div className="embed-responsive embed-responsive-16by9 h-50">
              <MapComponent markedAreas={markedAreas} />
            </div>
          </div>
        </div>
        <hr />

        <div className="container mt-4">
          <h2>Interdepartmental Projects</h2>
          <div className="row">
            {interdepartmentalProjects.map((project) => (
              <div className="col-md-4 mb-4" style={{cursor:'pointer'}} key={project.id}>
                <div className="card shadow-sm" onClick={() => handleProjectClick(project)}>
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Project Detail */}
        {selectedProject && (
          <div
            className="modal fade show"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleCloseModal}
          >
            <div
              className="modal-dialog modal-xl"
              style={{ maxWidth: '80%' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <div className="modal-content">
                <div className="modal-body">
                  {/* Close Button */}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    style={{ float: 'right' }}
                  ></button>
                  
                  {/* Project Details */}
                  <ProjectDetail project={selectedProject} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <h6>Loading Data...</h6>
      </div>
    )
  );
}

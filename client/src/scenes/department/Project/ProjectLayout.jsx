import {
  faCalendarAlt,
  faEdit,
  faMap,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFirebase } from "../../../Firebase";
import { MapComponent } from "./Map";
import {
  faMapMarkerAlt,
  faMoneyBillWave,
  faTrash,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import interdepartmentalProjects from "../../../data/InterDeparmentsProject";

const ProjectDetail = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const firebase = useFirebase();
  const { projectId } = useParams();
  const mapStyle = {
    height: "400px",
    width: "550px"
  };

  const fetchProjectData = async () => {
    try {
      let fetchedProject = await firebase.fetchProject(projectId);
      if (!fetchedProject) {
        console.log("Project not found in Firebase, checking hardcoded data...");
        fetchedProject =  interdepartmentalProjects.find(project => project.id === parseInt(projectId));
        if (!fetchedProject) {
          console.error("Project not found in hardcoded data either.");
        }
      }
      setProject(fetchedProject);
      setLoading(false);
      console.log("Fetched Project:", fetchedProject);
    } catch (error) {
      console.error("Error fetching project data:", error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a more sophisticated loader if needed
  }

  if (!project) {
    return <div>Error: Project not found</div>; // Handle case when project is null
  }

  const today = new Date();
  const startDate = new Date(project?.startDate);
  const endDate = new Date(project?.endDate);
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
    <div className="container" style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '30px 60px' }}>
      {/* Project Name and Edit/Delete Buttons */}
      <div className="row">
        <div className="col">
          <h2 style={{ color: '#007BFF', fontWeight: 'bold', display: 'inline-block' }}>
            {project.name}
          </h2>
        </div>
        <div className="col d-flex justify-content-end align-items-center">
          <button className="btn btn-outline-primary me-2">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
          <button className="btn btn-outline-danger">
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>
      </div>

      <div className="row">
        {/* Left Section: Project Details */}
        <div className="col-md-6">
          {/* Project Dates */}
          <div className="d-flex mb-4" style={{ gap: '' }}>
            <div style={{ padding: '10px', borderRadius: '5px', width: '45%' }}>
              <div className="d-flex align-items-center">
                <p className="mb-1 p-1 bg-success" style={{borderRadius:'4px',fontWeight: 'bold', color: 'white'}}>Start Date</p>
              </div>
              <p className="text-muted mb-0">{project?.startDate}</p>
            </div>
            <div style={{ padding: '10px', borderRadius: '5px', width: '45%' }}>
              <div className="d-flex align-items-center">
                <p className="mb-1 p-1 bg-danger" style={{borderRadius:'4px',fontWeight: 'bold', color: 'white'}}>End Date</p>
              </div>
              <p className="text-muted mb-0">{project?.endDate}</p>
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
              <p className="text-muted mb-0">Area</p>
            </div>
            <div style={{ padding: '10px', borderRadius: '5px', width: '45%' }}>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: 'orange', marginRight: '5px' }} />
                <p className="mb-1" style={{ fontWeight: 'bold', color: '#495057' }}>Budget</p>
              </div>
              <p className="text-muted mb-0">{project?.budget}</p>
            </div>
          </div>

          {/* Contractor */}
          <div style={{ padding: '10px', borderRadius: '5px', width: '100%' }}>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUserTie} style={{ color: '#6c757d', marginRight: '5px' }} />
              <p className="mb-1" style={{ fontWeight: 'bold', color: '#495057' }}>Contractor</p>
             
            </div>
            <p className="text-muted mb-0">{project?.contractor}</p>
          </div>
        </div>

        {/* Right Section: Map */}
        <div className="col-md-6 d-flex align-items-start justify-content-center mb-3">
          <div style={{ width: '100%', height: '400px', backgroundColor: '#eaeaea', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MapComponent markedAreas={markedArea} mapStyle={mapStyle}/>
          </div>
        </div>
      </div>


      {/* Description Section */}
      <div className="row mt-4">
        <div className="col">
          <h5 className="text-muted" style={{ fontWeight: 'bold', color: '#495057' }}>Description</h5>
          <p className="text-muted">
            {project?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../Firebase";
import { BallTriangle } from "react-loader-spinner";
import interdepartmentalProjects from "../../data/InterDeparmentsProject";
import { MapComponent } from "../department/Project/Map";
import ProjectDetail from "../department/Project/ProjectModule"; // Ensure the path is correct
import { scroller } from "react-scroll";
import cityDepartments from "../../data/CityDepartments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faGem,
  faGrimace,
  faHandPeace,
  faStar,
} from "@fortawesome/free-regular-svg-icons";

export default function Entry() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markedAreas, setMarkedAreas] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project
  const projectSectionRef = useRef(null); // Ref for the project section
  const [searchTerm, setSearchTerm] = useState('');
  const mapStyle ={
    height: "500px",
  }

  const filteredDepartments = cityDepartments.filter(department =>
    department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      console.error("Error fetching projects:", error);
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

  useEffect(() => {
    if (projectSectionRef.current) {
      scroller.scrollTo("projects-section", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "scroll-container", // Optional, if you use a specific container for scrolling
      });
    }
  }, []);

  const handleNavigate = (department) => {
    const formattedName = department.replace(/ /g, "-");
    navigate(`/${formattedName}`);
  };

  const handleProjectClick = (project) => {
    // setSelectedProject(project);
    // console.log('Selected project:', project);
    console.log('Selected project:', project.id);
    navigate(`/project/${project.id}`);
  };

  const handleCloseModal = () => {
    setSelectedProject(null); // Close the modal
  };

  return !loading && departments.length !== 0 ? (
    <div className="px-4 py-4 bg-light" id="scroll-container">
      <div className="row">
        {/* Department List */}
        <div className="col-md-6">
        <h3 className="my-3">Urban Departments</h3>
      <form className="d-flex my-2" role="search" style={{ maxWidth: '300px' }}>
        <input
          className="form-control bg-light"
          type="search"
          placeholder="Search Department"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <ul className="list-group">
        {filteredDepartments.map((department, index) => (
          <Link
            key={index}
            className="border py-2 px-4 my-1"
            style={{ textDecoration: "none", display: "flex", gap: "10px" }}
            to={`/${department}`}
          >
            <FontAwesomeIcon icon={faDotCircle} />
            <h6 className="m-0">{department}</h6>
          </Link>
        ))}
      </ul>
        </div>

        {/* Map Section */}
        <div className="col-md-6">
          <h3 className="my-3">Map</h3>
          <div className="embed-responsive embed-responsive-16by9 h-50">
            <MapComponent markedAreas={markedAreas} mapStyle={mapStyle}/>
          </div>
        </div>
      </div>
      <hr />

      {/* Interdepartmental Projects Section */}
      <div className="container mt-4">
        <h2 id="projects-section" ref={projectSectionRef}>
          Interdepartmental Projects
        </h2>
        <div className="row">
          {interdepartmentalProjects.map((project) => (
            <div
              className="col-md-4 mb-4"
              style={{ cursor: "pointer" }}
              key={project.id}
            >
              <div
                className="card shadow-sm h-100"
                onClick={() => handleProjectClick(project)}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text flex-grow-1">{project.description}</p>
                  <div className="mt-3">
                    <p className="mb-1">
                      <strong>Contractor:</strong> {project.contractor}
                    </p>
                    <p className="mb-0">
                      <strong>Status:</strong> {project.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Modal for Project Detail */}
      
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
  
}

import { faDochub, faNeos } from '@fortawesome/free-brands-svg-icons';
import { faBuilding, faCircle, faFile, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faBoxOpen, faChartLine, faExclamationTriangle, faTachometer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProjectSidebar({setContent}) {
  const {projectId} = useParams();

  return (
    <div className="d-flex flex-column navbar-dark text-white flex-shrink-0 p-3 bg-primary " style={{ width: '240px', height:'100vh' }}>
      <Link to={`/project/${projectId}`} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <FontAwesomeIcon className="bi text-white" width="40" style={{fontSize:'50px',marginLeft:'1.5rem'}} icon={faNeos}/>
            <h4 className="fs-4 text-white mx-2">NEXUS</h4>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li onClick={()=> setContent('Dashboard') }>
          <div className="nav-link link-dark text-white">
          <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faTachometer}/>
            Dashboard
          </div>
        </li>
        <li onClick={()=> setContent('Progress') }>
          <div className="nav-link link-dark text-white">
          <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faChartLine}/>
             Progress
          </div>
        </li>
        <li onClick={()=> setContent('Departments') }>
          <div className="nav-link link-dark text-white">
          <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faBuilding}/>
            Departments
          </div>
        </li>
        <li onClick={()=> setContent('Conflicts') }>
          <div className="nav-link link-dark text-white">
          <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faExclamationTriangle}/>
            Conflicts
          </div>
        </li>
        <li onClick={()=> setContent('Documents') }>
          <div className="nav-link link-dark text-white">
          <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faFileAlt}/>
             Documents
          </div>
        </li>
        <li onClick={()=> setContent('Resources') }>
          <div className="nav-link link-dark text-white">
            <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faBoxOpen}/>
  
            Resources
          </div>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  );
}

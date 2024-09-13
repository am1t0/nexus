import { faDochub, faNeos } from '@fortawesome/free-brands-svg-icons';
import { faBuilding, faCircle, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faBoxOpen, faChartLine, faExclamationTriangle, faTachometer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from '../../../Image/Logo.png';

export default function ProjectSidebar({ setContent, content, showLogo = true }) {
  const { projectId } = useParams();

  // Helper function to apply the 'active' class based on content
  const isActive = (section) => content === section ? 'bg-secondary text-white' : 'text-white';

  return (
    <div className="d-flex flex-column navbar-dark text-white flex-shrink-0 p-3 bg-primary" style={{ width: '240px', height:'100%' }}>
      {showLogo && (
        <Link to={`/project/${projectId}`} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img src={Logo} alt="" width="200" className='m-auto' />
        </Link>
      )}
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li onClick={() => setContent('Dashboard')}>
          <div className={`nav-link link-dark ${isActive('Dashboard')} custom-hover`}>
            <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faTachometer} />
            Dashboard
          </div>
        </li>
        <li onClick={() => setContent('Progress')}>
          <div className={`nav-link link-dark ${isActive('Progress')} custom-hover`}>
            <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faChartLine} />
            Progress
          </div>
        </li>
        <li onClick={() => setContent('Departments')}>
          <div className={`nav-link link-dark ${isActive('Departments')} custom-hover`}>
            <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faBuilding} />
            Departments
          </div>
        </li>
        <li onClick={() => setContent('Conflicts')}>
          <div className={`nav-link link-dark ${isActive('Conflicts')} custom-hover`}>
            <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faExclamationTriangle} />
            Conflicts
          </div>
        </li>
        <li onClick={() => setContent('Documents')}>
          <div className={`nav-link link-dark ${isActive('Documents')} custom-hover`}>
            <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faFileAlt} />
            Documents
          </div>
        </li>
        <li onClick={() => setContent('Resources')}>
          <div className={`nav-link link-dark ${isActive('Resources')} custom-hover`}>
            <FontAwesomeIcon className="bi me-2" width="16" height="16" icon={faBoxOpen} />
            Resources
          </div>
        </li>
      </ul>
    </div>
  );
}

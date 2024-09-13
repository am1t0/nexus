import React, { useState } from 'react';
import ProjectSidebar from './ProjectSidebar';
import ProjectDetail from './ProjectLayout';
import ProjectConflicts from './ProjectConflicts';
import ProjectProgress from './ProjectProgress';
import ProjectDocs from './ProjectDocs';
import ProjectResources from './ProjectResources';
import ProjectFoot from './ProjectFoot';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from '../../../Image/Logo.png';
import ProjectDepartments from './ProjectDepartments';

export default function Project() {
  const [content, setContent] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (content) {
      case 'Conflicts':
        return <ProjectConflicts />;
      case 'Departments':
        return <ProjectDepartments />;
      case 'Progress':
        return <ProjectProgress />;
      case 'Documents':
        return <ProjectDocs />;
      case 'Resources':
        return <ProjectResources />;
      default:
        return <ProjectDetail />;
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="d-lg-none">
        <Container>
          <Navbar.Brand href="#">
            <img src={Logo} alt="Logo" width="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Navbar.Collapse id="basic-navbar-nav" className={isSidebarOpen ? 'show' : ''}>
            <ProjectSidebar setContent={setContent} content={content} showLogo={false} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='d-flex'>
        <div className='d-none d-lg-block'>
          <ProjectSidebar setContent={setContent} content={content} />
        </div>
        <div className="content p-3" style={{ width: '100%' }}>
          {renderContent()}
        </div>
      </div>
      <ProjectFoot />
    </>
  );
}

import React, { useState } from 'react';
import ProjectSidebar from './ProjectSidebar';
import ProjectDetail from './ProjectLayout';
import ProjectConflicts from './ProjectConflicts';
import ProjectProgress from './ProjectProgress';
import ProjectDocs from './ProjectDocs';
import ProjectResources from './ProjectResources';
import ProjectDepartments from './ProjectDepartments';
import ProjectFoot from './ProjectFoot';

export default function Project() {
  const [content, setContent] = useState('Dashboard');

  const renderContent = () => {
    switch (content) {
      case 'Conflicts':
        return <ProjectConflicts/> ;
      case 'Departments':
        return <ProjectDepartments/> ;
      case 'Progress':
        return <ProjectProgress/>;
      case 'Documents':
        return <ProjectDocs/>;
      case 'Resources':
        return <ProjectResources/>;
      default:
        return <ProjectDetail/>;
    }
  };

  return (
    <>
     <div className='d-flex'>
      <ProjectSidebar setContent={setContent} content={content}/>
      <div className="content p-3" style={{ width: '100%' }}>
        {renderContent()}
      </div>
     </div>
      <ProjectFoot/>
    </>
  );
}

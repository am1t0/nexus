import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const ProjectConflicts = () => {

  const conflicts = {
    detailed: [
      {
        departmentName: 'Ministry of Water Resources',
        projectName: 'River Basin Cleanup Initiative',
        times: 'March 2024 - December 2024',
        implementer: 'HydroTech Solutions',
        siteOverlappingPercentage: 75
      },
      {
        departmentName: 'Department of Renewable Energy',
        projectName: 'Solar Grid Expansion',
        times: 'June 2024 - June 2025',
        implementer: 'SunPower Corp',
        siteOverlappingPercentage: 50
      }
    ],
    potential: [
      {
        departmentName: 'Ministry of Agriculture',
        reasonForConflict: 'Previous irrigation improvements in overlapping regions.'
      },
      {
        departmentName: 'Department of Infrastructure',
        reasonForConflict: 'Planned road construction in adjacent areas.'
      }
    ]
  };

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="col">
          <h3 className="text-danger" style={{ fontWeight: 'bold' }}>
            <FontAwesomeIcon icon={faExclamationTriangle} /> Project Conflicts
          </h3>
        </div>
      </div>

      <div className="row">
        {/* Left Column: Detailed Conflicts */}
        <div className="col-md-6 mb-4">
          <h5 className="text-muted" style={{ fontWeight: 'bold', color: '#495057' }}>Detailed Conflicts</h5>
          {conflicts.detailed.map((conflict, index) => (
            <div 
              key={index} 
              className="mb-4 p-3 bg-light" 
              style={{ border: '1px solid #e0e0e0', borderRadius: '5px', backgroundColor: '#fff' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-primary" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                  {conflict.departmentName}
                </h5>
                <Link to={`/communicate/${conflict.departmentName}`}>
                <FontAwesomeIcon icon={faMessage} className="text-muted" style={{ fontSize: '1.5rem' }} />
                </Link>
              </div>
              <h6 className="text-secondary mb-3" style={{ fontSize: '1.1rem' }}>{conflict.projectName}</h6>
              <div className="mb-2 d-flex">
                <span className="badge bg-light text-dark" style={{ border: '1px solid #e0e0e0', padding: '5px' }}>
                  {conflict.times.split(' - ')[0]}
                </span>
                <span className="mx-2">to</span>
                <span className="badge bg-light text-dark" style={{ border: '1px solid #e0e0e0', padding: '5px' }}>
                  {conflict.times.split(' - ')[1]}
                </span>
              </div>
              <p className="text-muted mb-2" style={{ fontSize: '1rem' }}>
                <strong>Implementer:</strong> {conflict.implementer}
              </p>
              <p className='font-weight-bold text-danger' style={{ marginBottom: '0', fontSize: '1rem' }}>
                <strong>Site Overlapping:</strong> {conflict.siteOverlappingPercentage}%
              </p>
            </div>
          ))}
        </div>

        {/* Right Column: Potential Conflicts */}
        <div className="col-md-6 mb-4">
          <h5 className="text-muted" style={{ fontWeight: 'bold', color: '#495057' }}>Potential Conflicting Departments</h5>
          {conflicts.potential.map((department, index) => (
            <div 
              key={index} 
              className="mb-4 p-3" 
              style={{ border: '1px solid #e0e0e0', borderRadius: '5px', backgroundColor: '#fff' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-primary" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                  {department.departmentName}
                </h5>
                <FontAwesomeIcon icon={faCommentDots} className="text-muted" style={{ fontSize: '1.5rem' }} />
              </div>
              <p className="text-muted mb-0" style={{ fontSize: '1rem' }}>{department.reasonForConflict}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectConflicts;

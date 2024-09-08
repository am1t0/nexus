import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ProjectConflicts = () => {

  const conflicts = {
    detailed: [
      {
        departmentName: 'Department A',
        projectName: 'Water Conservation Initiative',
        times: '2024 Q1 - 2024 Q4',
        implementer: 'XYZ Corp',
        siteOverlappingPercentage: 75
      },
      {
        departmentName: 'Department B',
        projectName: 'Green Energy Project',
        times: '2024 Q2 - 2025 Q2',
        implementer: 'ABC Ltd',
        siteOverlappingPercentage: 50
      }
    ],
    potential: [
      {
        departmentName: 'Department C',
        reasonForConflict: 'Previous work on water conservation in a similar area.'
      },
      {
        departmentName: 'Department D',
        reasonForConflict: 'Ongoing projects in adjacent regions.'
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
          <div key={index} className="mb-3" style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '5px', backgroundColor: '#fff' }}>
            <h6 className="text-primary" style={{ fontWeight: 'bold' }}>{conflict.departmentName}</h6>
            <p className="mb-1"><strong>Conflicting Project:</strong> {conflict.projectName}</p>
            <p className="mb-1"><strong>Times:</strong> {conflict.times}</p>
            <p className="mb-1"><strong>Implementer:</strong> {conflict.implementer}</p>
            <p className="mb-1"><strong>Site Overlapping:</strong> {conflict.siteOverlappingPercentage}%</p>
          </div>
        ))}
      </div>

      {/* Right Column: Potential Conflicts */}
      <div className="col-md-6 mb-4">
        <h5 className="text-muted" style={{ fontWeight: 'bold', color: '#495057' }}>Potential Conflicting Departments</h5>
        {conflicts.potential.map((department, index) => (
          <div key={index} className="mb-3" style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '5px', backgroundColor: '#fff' }}>
            <h6 className="text-primary" style={{ fontWeight: 'bold' }}>{department.departmentName}</h6>
            <p className="text-muted mb-0">{department.reasonForConflict}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ProjectConflicts;

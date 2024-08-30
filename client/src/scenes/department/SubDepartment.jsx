import React from 'react';
import { Link, useParams } from 'react-router-dom';

function SubDepartment() {
  const { department } = useParams();
  console.log('Department:', department); // Debugging line

  const data = {
    'Municipal-Corporation': [
      { name: 'Sanitation Division', link: '/municipal/sanitation' },
      { name: 'Parks and Recreation Division', link: '/municipal/parks-recreation' },
      { name: 'Public Health Division', link: '/municipal/public-health' },
    ],
    'Public-Works': [
      { name: 'Roads and Highways Division', link: '/public-works/roads-highways' },
      { name: 'Water Supply and Sewerage Division', link: '/public-works/water-sewerage' },
      { name: 'Building and Infrastructure Division', link: '/public-works/building-infrastructure' },
      { name: 'Electrical and Mechanical Services Division', link: '/public-works/electrical-mechanical' },
      { name: 'Environmental Services Division', link: '/public-works/environmental-services' },
      { name: 'Transportation and Logistics Division', link: '/public-works/transportation-logistics' },
    ],
    'Urban-Planning-and-Development': [
      { name: 'Urban Design Division', link: '/urban-planning/urban-design' },
      { name: 'Land Use Planning Division', link: '/urban-planning/land-use' },
      { name: 'Building Code Division', link: '/urban-planning/building-code' },
      { name: 'Community Development Division', link: '/urban-planning/community-development' },
    ],
    'Utilities-Works-Department': [
      { name: 'Electricity Division', link: '/utilities/electricity' },
      { name: 'Gas Supply Division', link: '/utilities/gas-supply' },
      { name: 'Water Supply Division', link: '/utilities/water-supply' },
      { name: 'Waste Management Division', link: '/utilities/waste-management' },
    ],
    'Disaster-Management': [
      { name: 'Emergency Response Division', link: '/disaster-management/emergency-response' },
      { name: 'Disaster Recovery Division', link: '/disaster-management/disaster-recovery' },
      { name: 'Risk Assessment Division', link: '/disaster-management/risk-assessment' },
      { name: 'Training and Preparedness Division', link: '/disaster-management/training-preparedness' },
    ],
  };

  const subDepartments = data[department] || [];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {department === 'municipal-department' ? 'Municipal Department' :
         department === 'public-works-department' ? 'Public Works Department' :
         department === 'urban-planning-and-development' ? 'Urban Planning and Development' :
         department === 'utilities-works-department' ? 'Utilities Works Department' :
         department === 'disaster-management' ? 'Disaster Management' :
         'Department'}
      </h2>
      <ul className="list-group">
        {subDepartments.length > 0 ? (
          subDepartments.map((dept, index) => (
            <Link to={dept.link} key={index} className="text-decoration-none">
              <li 
                className="list-group-item d-flex justify-content-between align-items-center border rounded"
                style={{ marginBottom: '15px', padding: '10px' }}
              >
                <span className="text-dark">{dept.name}</span>
                <span 
                  className="text-primary" // Apply Bootstrap's link color here
                  style={{ fontSize: '1.5rem' }}
                >
                  &gt;
                </span>
              </li>
            </Link>
          ))
        ) : (
          <p className="text-center">No sub-departments available.</p>
        )}
      </ul>
    </div>
  );
}

export default SubDepartment;

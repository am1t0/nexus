import React from 'react';
import { Link, useParams } from 'react-router-dom';

function SubDepartment() {
  const { department } = useParams();

  const data = {
    'Indore-Municipal-Corporation': [
      { name: 'Sanitation Division', link: '/Sanitation-Division' },
      { name: 'Parks and Recreation Division', link: '/parks-recreation' },
      { name: 'Public Health Division', link: '/public-health' },
    ],
    'Public-Works-Department': [
      { name: 'Roads and Highways Division', link: '/roads-highways' },
      { name: 'Water Supply and Sewerage Division', link: '/water-sewerage' },
      { name: 'Building and Infrastructure Division', link: '/building-infrastructure' },
      { name: 'Electrical and Mechanical Services Division', link: '/electrical-mechanical' },
      { name: 'Environmental Services Division', link: '/environmental-services' },
      { name: 'Transportation and Logistics Division', link: '/transportation-logistics' },
    ],
    'Utilities-Works-Department': [
      { name: 'Electricity Division', link: '/utilities/electricity' },
      { name: 'Gas Supply Division', link: '/utilities/gas-supply' },
      { name: 'Water Supply Division', link: '/utilities/water-supply' },
      { name: 'Waste Management Division', link: '/utilities/waste-management' },
    ],
    'Indore-Development-Authority': [
      { name: 'Town Planning Division', link: '/ida/town-planning' },
      { name: 'Infrastructure Development Division', link: '/ida/infrastructure-development' },
      { name: 'Land Acquisition and Management Division', link: '/ida/land-acquisition' },
      { name: 'Housing Projects Division', link: '/ida/housing-projects' },
      { name: 'Public Amenities Division', link: '/ida/public-amenities' },
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
            <Link 
              to={dept.link} 
              key={index} 
              style={{ textDecoration: 'none' }} // Remove underline
            >
              <li 
                className="list-group-item d-flex justify-content-between align-items-center border rounded"
                style={{ marginBottom: '15px', padding: '10px' }}
              >
                <span className="text-dark">{dept.name}</span>
                <span 
                  className="text-primary"
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

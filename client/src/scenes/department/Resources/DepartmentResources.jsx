import React, { useState } from 'react';
import Machinary from './Machinary';
import Experts from './Experts';
import Employees from './Employees';

// Main Component
export default function DepartmentResources() {
  const [selectedResource, setSelectedResource] = useState('');

  const handleResourceChange = (event) => {
    setSelectedResource(event.target.value);
  };

  return (
    <div className="container mt-4">
      {/* Resource Type Filter */}
      <div className="mb-3">
        <label htmlFor="resourceType" className="form-label">Select Resource Type:</label>
        <select id="resourceType" className="form-select" value={selectedResource} onChange={handleResourceChange}>
          <option value="">--Select--</option>
          <option value="machinery">Machinery</option>
          <option value="experts">Experts</option>
          <option value="employees">Employees</option>
        </select>
      </div>

      {/* Conditionally Rendered Tables Based on Selected Resource */}
      {selectedResource === 'machinery' && <Machinary />}
      {selectedResource === 'experts' && <Experts />}
      {selectedResource === 'employees' && <Employees />}
    </div>
  );
}



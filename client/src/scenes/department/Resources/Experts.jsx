import React, { useState } from 'react';

export default function Experts() {
  const [filter, setFilter] = useState('');
  const expertsData = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Civil Engineering', experience: '15 years', contact: 'john@example.com', status: 'Available' },
    { id: 2, name: 'Jane Smith', specialty: 'Structural Analysis', experience: '10 years', contact: 'jane@example.com', status: 'On Project' },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Geotechnical Engineering', experience: '12 years', contact: 'emily.davis@example.com', status: 'Available' },
    { id: 4, name: 'Michael Brown', specialty: 'Hydraulic Engineering', experience: '8 years', contact: 'michael.brown@example.com', status: 'Available' },
    { id: 5, name: 'Sarah Wilson', specialty: 'Environmental Engineering', experience: '6 years', contact: 'sarah.wilson@example.com', status: 'On Leave' },
    { id: 6, name: 'Dr. Robert Taylor', specialty: 'Construction Management', experience: '20 years', contact: 'robert.taylor@example.com', status: 'On Project' },
    { id: 7, name: 'Anna Lee', specialty: 'Urban Planning', experience: '14 years', contact: 'anna.lee@example.com', status: 'Available' },
    { id: 8, name: 'James Johnson', specialty: 'Transport Engineering', experience: '9 years', contact: 'james.johnson@example.com', status: 'On Leave' },
    { id: 9, name: 'Linda Harris', specialty: 'Architectural Engineering', experience: '11 years', contact: 'linda.harris@example.com', status: 'Available' },
    { id: 10, name: 'David White', specialty: 'Structural Engineering', experience: '13 years', contact: 'david.white@example.com', status: 'On Project' }
  ];

  const filteredData = expertsData.filter(expert =>
    expert.name.toLowerCase().includes(filter.toLowerCase()) ||
    expert.specialty.toLowerCase().includes(filter.toLowerCase()) ||
    expert.experience.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Experts</h2>
      <input
        type="text"
        placeholder="Filter by name, specialty, or experience"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-3"
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Experience</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((expert) => (
            <tr key={expert.id}>
              <td>{expert.id}</td>
              <td>{expert.name}</td>
              <td>{expert.specialty}</td>
              <td>{expert.experience}</td>
              <td>{expert.contact}</td>
              <td>{expert.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


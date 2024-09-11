import React, { useState } from 'react';

export default function Employees() {
  const [filter, setFilter] = useState('');
  const employeesData = [
    { id: 1, name: 'Alice Johnson', role: 'Site Manager', department: 'Construction', contact: 'alice@example.com', status: 'Active', projectName: 'Project 1' },
    { id: 2, name: 'Bob Brown', role: 'Safety Officer', department: 'Safety', contact: 'bob@example.com', status: 'On Leave' },
    { id: 3, name: 'Charlie Davis', role: 'Project Engineer', department: 'Engineering', contact: 'charlie.davis@example.com', status: 'Active' },
    { id: 4, name: 'Dana Lee', role: 'Construction Supervisor', department: 'Construction', contact: 'dana.lee@example.com', status: 'Active' },
    { id: 5, name: 'Eve Miller', role: 'Quality Control Inspector', department: 'Quality Assurance', contact: 'eve.miller@example.com', status: 'On Project' },
    { id: 6, name: 'Frank Wilson', role: 'Estimator', department: 'Estimating', contact: 'frank.wilson@example.com', status: 'Active' },
    { id: 7, name: 'Grace Brown', role: 'Design Engineer', department: 'Design', contact: 'grace.brown@example.com', status: 'Active' },
    { id: 8, name: 'Hank Taylor', role: 'Logistics Coordinator', department: 'Logistics', contact: 'hank.taylor@example.com', status: 'On Leave' },
    { id: 9, name: 'Ivy White', role: 'Site Clerk', department: 'Administration', contact: 'ivy.white@example.com', status: 'Active' },
    { id: 10, name: 'Jack Black', role: 'Health and Safety Manager', department: 'Safety', contact: 'jack.black@example.com', status: 'Active' }
  ];

  const filteredData = employeesData.filter(employee =>
    employee.name.toLowerCase().includes(filter.toLowerCase()) ||
    employee.role.toLowerCase().includes(filter.toLowerCase()) ||
    employee.department.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Employees</h2>
      <input
        type="text"
        placeholder="Filter by name, role, or department"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-3"
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>{employee.contact}</td>
              <td>{employee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

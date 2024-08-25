import React, { useState } from 'react';

export default function Machinary() {

  const [filter, setFilter] = useState('');

  const machineryData = [
    { id: 1, name: 'Excavator', type: 'Heavy', manufacturer: 'CAT', location: 'Site A', status: 'Operational' },
    { id: 2, name: 'Bulldozer', type: 'Heavy', manufacturer: 'Komatsu', location: 'Site B', status: 'Under Maintenance' },
    { id: 3, name: 'Crane', type: 'Construction', manufacturer: 'Liebherr', location: 'Site C', status: 'Operational' },
    { id: 4, name: 'Loader', type: 'Heavy', manufacturer: 'John Deere', location: 'Site D', status: 'Operational' },
    { id: 5, name: 'Dump Truck', type: 'Heavy', manufacturer: 'Volvo', location: 'Site E', status: 'Operational' },
    { id: 6, name: 'Backhoe Loader', type: 'Heavy', manufacturer: 'JCB', location: 'Site F', status: 'Under Maintenance' },
    { id: 7, name: 'Concrete Mixer', type: 'Construction', manufacturer: 'SANY', location: 'Site G', status: 'Operational' },
    { id: 8, name: 'Paver', type: 'Construction', manufacturer: 'Terex', location: 'Site H', status: 'Operational' },
    { id: 9, name: 'Excavator', type: 'Heavy', manufacturer: 'Kobelco', location: 'Site I', status: 'Operational' },
    { id: 10, name: 'Road Roller', type: 'Construction', manufacturer: 'Case', location: 'Site J', status: 'Under Maintenance' }
  ];

  const filteredData = machineryData.filter(machine =>
    machine.name.toLowerCase().includes(filter.toLowerCase()) ||
    machine.type.toLowerCase().includes(filter.toLowerCase()) ||
    machine.manufacturer.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Machinery</h2>
      <input
        type="text"
        placeholder="Filter by name, type, or manufacturer"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-3"
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((machine) => (
            <tr key={machine.id}>
              <td>{machine.id}</td>
              <td>{machine.name}</td>
              <td>{machine.type}</td>
              <td>{machine.manufacturer}</td>
              <td>{machine.location}</td>
              <td>{machine.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

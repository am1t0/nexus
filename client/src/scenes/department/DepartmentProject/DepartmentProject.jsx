import React, { useEffect, useState } from 'react';
import ProjectCreationForm from '../Project/ProjectCreate';
import { useFirebase } from '../../../Firebase';

export default function DepartmentProject() {
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapView, setMapView] = useState(false);

  
  const projects = [
    {
      id: 1,
      name: 'Construction of Chimi to Panod Road Length 3.20 KM',
      status: 'completed',
      location: 'Indore-2',
      startDate: '2022-06-15',
      endDate: '2023-04-10',
      contractor: 'VEGA INFRA PROJECT INDORE'
    },
    {
      id: 2,
      name: 'Construction of Dharampuri to Solsinda Road Length 0.58 KM',
      status: 'completed',
      location: 'Indore-2',
      startDate: '2022-10-01',
      endDate: '2023-09-30',
      contractor: 'PATEL SHREE ENTERPRISES'
    },
    {
      id: 3,
      name: 'Construction of Hatod Ajnod Road Length 1.50 KM',
      status: 'completed',
      location: 'Indore-2',
      startDate: '2022-09-10',
      endDate: '2023-10-05',
      contractor: 'PATEL SHREE ENTERPRISES'
    },
    {
      id: 4,
      name: 'Construction of Jambuddrri Srewar to Basandra Road Length 1.76 KM',
      status: 'completed',
      location: 'Indore-2',
      startDate: '2022-07-20',
      endDate: '2024-03-30',
      contractor: 'Kuldeep Sharma'
    },
    {
      id: 5,
      name: 'Construction of Jamodi to Hatuniya Road Length 4.80 KM',
      status: 'completed',
      location: 'Indore-2',
      startDate: '2022-05-01',
      endDate: '2023-06-10',
      contractor: 'VEGA INFRA PROJECT INDORE'
    },
    {
      id: 6,
      name: 'Construction of Katkaya to Dhaturiya Road Length 2.50 KM',
      status: 'completed',
      location: 'Indore-2',
      startDate: '2022-08-15',
      endDate: '2023-04-28',
      contractor: 'Hemendra Singh Panwar'
    },
    {
      id: 7,
      name: 'Construction of Mundalabag to Panod Road Length 1.10 KM',
      status: 'completed',
      location: 'Indore-2',
      startDate: '2022-11-05',
      endDate: '2024-01-19',
      contractor: 'Madhav Infrastructure'
    },
    {
      id: 8,
      name: 'Construction of Muyadra Road Ch',
      status: 'ongoing',
      location: 'Indore-2',
      startDate: '2023-03-01',
      endDate: '2024-09-15',
      contractor: 'PATEL SHREE ENTERPRISES'
    }
  ];

  const [projectList, setProjectList] = useState(projects);
  const [open , setOpen] = useState(false);
  const firebase = useFirebase();

  useEffect(()=>{
     firebase.fetchAllProjects(setProjectList);
  },[])

  
  // Filtered projects based on status and search term
  const filteredProjects = projectList.filter(project => {
    return (
      (statusFilter === 'all' || project.status === statusFilter) &&
      project?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mt-5">
      {/* Filter Options */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
          <select
            id="statusFilter"
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="searchTerm" className="form-label">Search by Project Name</label>
          <input
            type="text"
            id="searchTerm"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex align-items-end gap-4">
          <button
            className={`btn ${mapView ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setMapView(!mapView)}
          >
            {mapView ? 'List View' : 'Map View'}
          </button>

          <button 
          className='btn btn-primary'
          onClick={()=> setOpen(!open)}
          >
            Create Project
          </button>
        </div>
        {
          open &&
          
          <div className="container bg-light px-5" style={{width:'80%',position:'absolute'}}>
            <ProjectCreationForm setOpen={setOpen}/>
          </div>
        }
      </div>

      {/* Map View */}
      
      {mapView && (
        <div className="mb-4">
          <h5>Map View (Example placeholder)</h5>
          <div
            style={{
              height: '300px',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
              lineHeight: '300px',
            }}
          >
            Map will be displayed here.
          </div>
        </div>
      )}

      {/* Table of Projects */}
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th style={{ width: '40%' }} >Project Name</th>
            <th>Contractor</th>
            <th>Status</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project, index) => (
            <tr key={project.id+index}>
              <td>{index + 1}</td>
              <td>{project.name} Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, repellendus. </td>
              <td>{project.contractor} </td>
              <td>{project.status}</td>
              <td>{project.location}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No projects found message */}
      {filteredProjects.length === 0 && (
        <div className="text-center mt-4">
          <p>No projects found.</p>
        </div>
      )}
    </div>
  );
}

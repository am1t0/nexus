import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Firebase';
import { BallTriangle } from 'react-loader-spinner';
import interdepartmentalProjects from '../../data/InterDeparmentsProject';

export default function Entry() {

  const navigate = useNavigate();
  const firebase = useFirebase();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const departmentsData = await firebase.fetchAllDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        console.log(departments)
      }
    };

    loadDepartments();
  }, []);
  const handleNavigate = (department) => {
    const formattedName = department.replace(/ /g, '-');
    navigate(`/${formattedName}`);
  };

  return (

    !loading && departments.length!==0 ? (
    // Main Content
    <div className="container mt-4">
      <div className="row">
        {/* Department List */}
        <div className="col-md-6">
          <h3 className='my-3'>Urban Departments</h3>
          <ul className="list-group">
            {departments.map((department, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center mb-3 border"
              >
                {department.deptName}
                <span
                  className="text-primary"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNavigate(department.deptName)}
                >
                  &gt;
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Map Section */}
        <div className="col-md-6">
          <h3 className='my-3'>Map</h3>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              title="Indore City Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5791422851824!2d75.85772557575592!3d22.719568829367725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e30a52847e4b%3A0x6ff8486ecf1d2455!2sIndore%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1614912295610!5m2!1sen!2sus"
              width="100%"
              height="400"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <hr />

      <div className="container mt-4">
      <h2>Interdepartmental Projects</h2>
      <div className="row">
        {interdepartmentalProjects.map(project => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    ): (
        <div style={{width:'100%',height:'100vh', display:'flex',flexDirection:'column',gap:'2rem',alignItems:'center',justifyContent:'center'}}>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <h6>Loading Data...</h6>
      </div>
    )
  );
}

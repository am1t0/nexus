import React, { useState } from "react";
import { departments } from "../../data/InterDepartmental";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faFilePdf, faVideo, faMap, faTasks, faTasksAlt, faAdd } from '@fortawesome/free-solid-svg-icons';

const InterDepartmentalProject = () => {
    
    
    const [expandedIndex, setExpandedIndex] = useState(departments);  //dummy data

  const [departmentsRole, setDepartmentsRole] = useState()

  const handleRowClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="my-3">
      <div className="d-flex my-4">
        <div>
          <h2>City Infrastructure Development</h2>
        </div>
        <div className="col text-left">
          <button className="btn btn-primary mx-2"><FontAwesomeIcon icon={faVideo} /></button>
          <button className="btn btn-primary mx-2"><FontAwesomeIcon icon={faMap} /></button>
        </div>
      </div>

      <div className="mx-4">
        <div className="d-flex gap-4">
          <div>
            <button className="btn btn-success">Start Date</button>
            <span> January 1, 2024</span>
          </div>
          <div>
            <button className="btn btn-warning">End Date</button>
            <span> December 31, 2024</span>
          </div>
        </div>

        <div className="p-2 my-2 border">
          <div className="progress my-3" style={{ width: "70%" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="60"
            >
              25%
            </div>
          </div>
          <p className="text-left">
            This project focuses on the development and improvement of city infrastructure, including roads, public transport, water supply, and sanitation.
          </p>
        </div>
      </div>

      <div>
        <div className="d-flex">
           <h2>Involved Departments</h2>
            <div className="col">
            <button className="btn btn-warning mx-2">Task <FontAwesomeIcon icon={faAdd}/></button>
            <button className="btn btn-warning mx-2"><FontAwesomeIcon icon={faVideo} /></button>
            </div>
        </div>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Department Name</th>
              <th>Personnel Involved</th>
              <th>Assigned Tasks</th>
              <th>Resources Utilized</th>
              <th>Reports</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => handleRowClick(index)}>
                  <td>{department.name}</td>
                  <td>{department.personnel.join(", ")}</td>
                  <td>
                    <ul>
                      {department.tasks.map((task, idx) => (
                        <li key={idx}>
                          {task.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{department.resources.join(", ")}</td>
                  <td>
                    <ul>
                      {department.reports.map((report, idx) => (
                        <li key={idx}>
                          <a href={report.url} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFilePdf} /> {report.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <FontAwesomeIcon icon={expandedIndex === index ? faMinus : faPlus} />
                  </td>
                </tr>
                {expandedIndex === index && (
                  <tr>
                    <td colSpan="6">
                      <div className="p-3 border">
                        <h5>Details</h5>
                        <p><strong>Description:</strong> {department.description}</p>
                        <p><strong>Deadlines:</strong> {department.deadlines.join(", ")}</p>
                        <h6>Task Details</h6>
                        <ul>
                          {department.tasks.map((task, idx) => (
                            <li key={idx}>
                              {task.name} - Deadline: {task.deadline}
                            </li>
                          ))}
                        </ul>
                        <h6>Personnel</h6>
                        <ul>
                          {department.personnel.map((person, idx) => (
                            <li key={idx}>{person}</li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          <div className="border p-3">
            <h5>Discussion Forum</h5>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Discuss about the project here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterDepartmentalProject;

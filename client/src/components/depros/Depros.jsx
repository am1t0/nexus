import React, { useState } from 'react'
import './depros.css'
import depros from '../../data/Depros.js'
import { NavLink } from 'react-router-dom'

export default function Depros() {
  const [expanded, setExpanded] = useState({})

  const toggleShow = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="depros-container">
      {depros.map((dept, index) => {
        const showAll = expanded[index]
        const visibleProjects = showAll ? dept.projects : dept.projects.slice(0, 4)

        return (
          <div key={index} className="depros-card">
            <h2 className="depros-name">
              <NavLink to="/list">{dept.department}</NavLink>
            </h2>

            <ul className="project-list">
              {visibleProjects.map((project, i) => (
                <li key={i} className="project-item">
                  <NavLink to="/list">{project}</NavLink>
                </li>
              ))}
            </ul>

            {dept.projects.length > 4 && (
              <button className="toggle-btn" onClick={() => toggleShow(index)}>
                {showAll ? 'Show Less ▲' : 'Show More ▼'}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

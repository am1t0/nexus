import React from 'react'
import './report.css'

export default function Report(props) {
    const { projectData } = props;

  return (
     <div>
        {projectData.report.map((r, i) => (
          <div key={i} className="report-block">
             <div className="file-details">
             <p>{r.filename}</p>
            <span>{r.date}</span>
             </div>
             <div className="file-options">
               <p>download</p>
               <p>open</p>
             </div>
          </div>
        ))}
      </div>
  )
}

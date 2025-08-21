import React from 'react'
import './Forms.css'

export default function DetailEdit(props) {
  
  return (
    <form className='project-edit-form'>
       <div className="project-form-item">
         <label htmlFor="description">Description</label>
         <textarea  id="description"></textarea>
       </div>
       <div className="project-form-item">
          <input type="date" placeholder='start'/>
          <input type='date' placeholder='end'/>
       </div>
       <div className="project-form-item">
          <label htmlFor="budget">Budget</label>
          <input type="number" />
       </div>
       <div className="project-form-item">
          <label htmlFor="contractor">Contractor</label>
           <input type="text" />
       </div>
    </form>
  )
}

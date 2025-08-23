import React from 'react'
import './Forms.css'

export default function DetailEdit(props) {
  
  const { setEditMode } = props;

  return (
    <form className='project-edit-form'>
       <h4>Project Details</h4>
       <div className="project-form-item">
         <label htmlFor="description">Description</label>
         <textarea  id="description"></textarea>
       </div>
       <div id="se-dates-container">
         <div className="start-end-date">
          <label htmlFor="start">start</label>
          <input type="date" placeholder='start'/>
         </div>
         <div className="start-end-date">
           <label htmlFor="end">end</label>
          <input type='date' placeholder='end'/>
         </div>
       </div>
       <div className="project-form-item">
          <label htmlFor="budget">Budget</label>
          <input type="number" />
       </div>
       <div className="project-form-item">
          <label htmlFor="contractor">Contractor</label>
           <input type="text" />
       </div>

       <div className="two-options">
         <button type='button' className='submit-btn' onClick={()=> {alert("loda lega!!")}}> submit </button>

         <button type='button' className='cancel-btn' onClick={()=> setEditMode((e)=> !e)}> cancel </button>
       </div>
    </form>
  )
}

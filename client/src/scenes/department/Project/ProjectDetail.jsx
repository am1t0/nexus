import React from 'react'
import ProjectSidebar from './ProjectSidebar'
import { Outlet } from 'react-router-dom'
import ProjectLayout from './ProjectLayout'

export default function ProjectDetail() {
  return (
    <div className='d-flex'>
     <ProjectSidebar/>

     <ProjectLayout/>
    </div>
  )
}

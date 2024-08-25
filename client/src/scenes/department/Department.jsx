import React from 'react'
import DepartmentNavbar from './DepartmentNavbar'
import { Outlet } from 'react-router-dom'

export default function Department() {
  return (
    <>
      <DepartmentNavbar/>
      <Outlet/> 
    </>
  )
}

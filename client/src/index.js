import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@fortawesome/react-fontawesome"



import App from './App';
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Department from './scenes/department/Department';
import DepartmentResources from './scenes/department/Resources/DepartmentResources';
import DepartmentProject from './scenes/department/DepartmentProject/DepartmentProject';
import DepartmentHome from './scenes/department/DepartmentHome';
import { FirebaseProvider } from './Firebase';
import Home from './scenes/desktop/Home';
import DepartmentRegistrationForm from './scenes/SubmitForm/DepartmentRegistrationForm';
import CommunicationLayout from './communication/CommunicationLayout';
import Entry from './scenes/desktop/Entry';
import ProjectDetail from './scenes/department/Project/ProjectLayout';
import SubDepartment from './scenes/department/SubDepartment';
import Project from './scenes/department/Project/Project';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
{
  path:'/', element: <App/>, children:[]
},
{
  path:'/home', element: <Home/> , children:[
    {path:'/home', element: <Entry/>}
  ]
},
{
  path: '/register', element: <DepartmentRegistrationForm/>
},
{
  path:'/:department', element: <Department/>, children: [
    { path:'/:department' , element: <DepartmentHome/>},
    { path:'/:department/resources', element: <DepartmentResources/> },
    { path:'/:department/projects', element: <DepartmentProject/> },
    { path:'/:department/subdepartment', element: <SubDepartment/> },
    // { path:'/:department/projects', element: <DepartmentProject/> },
  ]
},

 {
   path: '/communicate/:chatWith' , element: <CommunicationLayout departmentId={"dep-A"} otherDepartmentId={"dep-B"}/>
 },
 {
   path:"/project/:projectId", element:<Project /> 
 }
])
root.render(
  <FirebaseProvider>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  </FirebaseProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


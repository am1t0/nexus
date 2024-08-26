import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Department from './scenes/department/Department';
import DepartmentResources from './scenes/department/Resources/DepartmentResources';
import DepartmentProject from './scenes/department/DepartmentProject/DepartmentProject';
import DepartmentHome from './scenes/department/DepartmentHome';
import { FirebaseProvider } from './Firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
{
  path:'/', element: <App/>, children:[]
},
{
  path:'/:department', element: <Department/>, children: [
    { path:'/:department' , element: <DepartmentHome/>},
    { path:'/:department/resources', element: <DepartmentResources/> },
    { path:'/:department/projects', element: <DepartmentProject/> },
    // { path:'/:department/projects', element: <DepartmentProject/> },
  ]
}
])
root.render(
  <React.StrictMode> 
  <FirebaseProvider>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  </FirebaseProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

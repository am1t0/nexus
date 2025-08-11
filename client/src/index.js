import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@fortawesome/react-fontawesome"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



import App from './App';
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Department from './scenes/department/Department';
import DepartmentResources from './scenes/department/Resources/DepartmentResources';
import DepartmentProject from './scenes/department/DepartmentProject/DepartmentProject';
import DepartmentHome from './scenes/department/DepartmentHome';
import { FirebaseProvider } from './Firebase';
import Home from './pages/home/Home.jsx'
import DepartmentRegistrationForm from './scenes/SubmitForm/DepartmentRegistrationForm';
import CommunicationLayout from './communication/CommunicationLayout';
import SubDepartment from './scenes/department/SubDepartment';
import ProjectPage from './pages/project/ProjectPage.jsx';
import { MapComponent } from './components/map/Map.jsx';
import Depros from '../src/components/depros/Depros.jsx';
import { faHourglass1 } from '@fortawesome/free-solid-svg-icons';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
{
  path:'/', element: <Home/> , 
  children:[ 
    {"path":'/', element: <MapComponent/> },
    {"path":'/list', element: <Depros/> },
    {"path":'/:project', element: <ProjectPage/> },
  ]
},
{
  path: '/register', element: <DepartmentRegistrationForm/>
},
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


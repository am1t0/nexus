import logo from './logo.svg';
import './App.css';
import DepartmentNavbar from './scenes/department/DepartmentNavbar';
import DepartmentProject from './scenes/department/DepartmentProject/DepartmentProject';
import DepartmentResources from './scenes/department/Resources/DepartmentResources';
import InterDepartmentalProject from './scenes/InterProject/InterDepartmentalProject';
import DiscussionForum from './scenes/experime.jsx'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();
   
  useEffect(()=>{
    navigate('/home')
  },[])
  
  return (
    <div className="App">
      <InterDepartmentalProject/>
      {/* <DiscussionForum /> */}
    </div>
  );
}

export default App;

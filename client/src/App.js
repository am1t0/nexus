import logo from './logo.svg';
import './App.css';
import DepartmentNavbar from './scenes/department/DepartmentNavbar';
import DepartmentProject from './scenes/department/DepartmentProject/DepartmentProject';
import DepartmentResources from './scenes/department/Resources/DepartmentResources';
import InterDepartmentalProject from './scenes/InterProject/InterDepartmentalProject';
import DiscussionForum from './scenes/experime.jsx'

function App() {
  return (
    <div className="App">
      <InterDepartmentalProject/>
      <DiscussionForum />
    </div>
  );
}

export default App;

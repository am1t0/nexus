import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFirebase } from '../../../Firebase';
import { BallTriangle } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { MapComponent } from './Map';

const ProjectCreationForm = ({setOpen, projectList}) => {
  const {department} = useParams();
  const [editorContent, setEditorContent] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [milestoneInput, setMilestoneInput] = useState('');
  const [isInterDepartmental, setIsInterDepartmental] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [formPart, setFormPart] = useState(1);
  const [resources, setResources] = useState([]);
  const [resourceType, setResourceType] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [implementer, setImplementer] = useState('');
  const [area, setArea] = useState('');
  const [detailsOfWork, setDetailsOfWork] = useState('');
  const [loading ,setLoading] = useState(false);
  const [markedAreas, setMarkedAreas] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const mapStyle ={
    height: "500px",
  }
  


  const firebase = useFirebase();

  const handleAddResource = () => {
    if (resourceType && resourceName && quantity && cost) {
      const newResource = { id: resources.length + 1, resourceType, resourceName, quantity, cost };
      setResources([...resources, newResource]);
      // Clear the input fields after adding the resource
      setResourceType('');
      setResourceName('');
      setQuantity('');
      setCost('');
    }
  };

  const handleAddMilestone = () => {
    if (milestoneInput) {
      setMilestones([...milestones, milestoneInput]);
      setMilestoneInput('');
    }
  };

  const handleAddDepartment = () => {
    if (selectedDepartment) {
      setDepartments([...departments, selectedDepartment]);
      setSelectedDepartment('');
    }
  };

  const handleNextPart = () => {
    setFormPart(formPart + 1);
  };

  const handlePreviousPart = () => {
    setFormPart(formPart - 1);
  };

  const handleSubmit = async () => {
    // Collect all form data into an object
    setLoading(true);

    const newProject = {
      department,
      projectName,
      description,
      startDate,
      endDate,
      budget,
      implementer,
      isInterDepartmental: departments.length > 1, // Determine inter-departmental status
      departments,
      milestones,
      editorContent,
      resources,
      area,
      detailsOfWork,
      coordinates,
    };
  
    // Call addProject function from context
    if (firebase.addProject) {
      await firebase.addProject(newProject);
    } else {
      console.error('addProject function is not available.');
    }

    setLoading(false);
    setOpen(false);

  };

  const saveMarkedArea = (coords) => {
    setCoordinates( coords );
  };

  const deleteMarkedArea = async (id) => {
    try {
        // const updatedAreas = markedAreas.filter(area => area.id !== id);
        // setMarkedAreas(updatedAreas);
        // await deleteDoc(1doc(firestore, 'projects', id));
    } catch (error) {
        console.error('Error deleting marked area:', error);
    }
};

const loadMarkedAreas= async ()=>{
  
  const newMarkedAreas = await projectList.map((project) => {
    return {
      id: project.id,
      description: project.name,
      coordinates: project.area,
    };
  });
  
  // Update the state once with all the new objects
  setMarkedAreas([...markedAreas, ...newMarkedAreas]);
 
};

useEffect(()=>{
  loadMarkedAreas();
},[])


  
  return (
    <div className="container my-4">
       {loading ? ( <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /> 
) : (
<>
      {formPart === 1 && (
        <>
          <h2>Project Creation - Part 1</h2>
          
          {/* Project Name */}
          <div className="mb-3">
            <label className="form-label">Project Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter project name" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          
          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Enter project description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          
          {/* Start Date and End Date */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Start Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Budget and Implementer */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Budget</label>
              <input 
                type="number" 
                className="form-control" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Implementer/Contractor</label>
              <input 
                type="text" 
                className="form-control" 
                value={implementer}
                onChange={(e) => setImplementer(e.target.value)}
              />
            </div>
          </div>
          
          {/* Inter-departmental Checkbox */}
          <div className="form-check mb-3">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="interDepartmentalCheck" 
              checked={isInterDepartmental}
              onChange={() => setIsInterDepartmental(!isInterDepartmental)} 
            />
            <label className="form-check-label" htmlFor="interDepartmentalCheck">
              Inter-departmental Project
            </label>
          </div>
          
          {/* Departments Section */}
          {isInterDepartmental && (
            <div className="mb-3">
              <label className="form-label">Departments</label>
              <div className="input-group mb-3">
                <select 
                  className="form-select" 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="Public Works">Public Works</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Water Management">Water Management</option>
                  {/* Add more options as needed */}
                </select>
                <button className="btn btn-primary" onClick={handleAddDepartment}>Add</button>
              </div>
              <div>
                {departments.map((department, index) => (
                  <span 
                    key={index} 
                    className="badge bg-secondary me-2 mb-2"
                  >
                    {index + 1}. {department}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Milestones */}
          <div className="mb-3">
            <label className="form-label">Milestones</label>
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter milestone" 
                value={milestoneInput}
                onChange={(e) => setMilestoneInput(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddMilestone}>Add</button>
            </div>
            <div>
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="alert alert-info py-2 px-3 mb-2"
                >
                  {index + 1}. {milestone}
                </div>
              ))}
            </div>
          </div>

          {/* Text Editor for Additional Info */}
          <div className="form-group mb-3">
            <label>Project Documentation</label>
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              theme="snow"
              className="mb-4"
              style={{ minHeight: '200px' }}
              placeholder="Write the project details, add images, links, etc."
            />
          </div>

          {/* Next Part Button */}
          <button className="btn btn-primary" onClick={handleNextPart}>Next</button>
        </>
      )}

      {formPart === 2 && (
        <>
          <h2>Project Creation - Part 2</h2>

          <div className="row">
            <div className="col-md-6">
              {/* Left side: Area and Details */}
              <div className="mb-3">
                <label className="form-label">Area/Location</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter area or location" 
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Details of Work</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Enter details of work" 
                  value={detailsOfWork}
                  onChange={(e) => setDetailsOfWork(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6">
            <MapComponent
                canEdit={true}
                projectName={projectName}
                markedAreas={markedAreas}
                onSaveArea={saveMarkedArea}
                onDeleteArea={deleteMarkedArea}
                mapStyle={mapStyle}
                />
               
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={handlePreviousPart}>Back</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </>
      )}
</>
 )}
    </div>
  );
};

export default ProjectCreationForm;

import React, { useRef } from "react";
import "./filter.css";


const ProjectFilter = () => {
  const formRef = useRef(null);
  const [durationValue, setDurationValue] = React.useState(6);

  // Example function to collect all filter values
  const getFilterValues = () => {
    if (!formRef.current) return {};
    const form = formRef.current;
    return {
      department: form.department.value,
      location: form.location.value,
      status: form.status.value,
      duration: form.duration.value,
    };
  };

  return (
    <form className="map-filter-container" ref={formRef}>
        <h4 >Filter</h4>
        <hr />
      {/* Department */}
      <div className="mp-f-item">
      <label htmlFor="department">Department</label>
      <select id="department" name="department" defaultValue="All">
        <option value="All">All</option>
        <option value="Department of Roadways">Department of Roadways</option>
        <option value="Sewage maintenance">Sewage maintenance</option>
        <option value="Water supply">Water Supply</option>
        <option value="Parks and Recreation">Parks & Recreation</option>
      </select>
      </div>

      {/* Location */}
      <div className="mp-f-item">
      <label htmlFor="location">Location</label>
      <select id="location" name="location" defaultValue="Central Zone">
        <option value="City Center">Central Center</option>
        <option value="North Zone">North Zone</option>
        <option value="South Zone">South Zone</option>
        <option value="East Zone">East Zone</option>
        <option value="West Zone">West Zone</option>
      </select>
      </div>

      {/* Project Status */}
      <div className="mp-f-item">
      <label htmlFor="status">Project Status</label>
      <select id="status" name="status" defaultValue="In Progress">
        <option value="Planning">Planning</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
      </select>
      </div>

      {/* Duration Slider */}
      <div className="mp-f-item">
      <label htmlFor="duration">Duration (Months)</label>
      <input
        type="range"
        id="duration"
        name="duration"
        min="1"
        max="60"
        value={durationValue}
        onChange={(e) => setDurationValue(e.target.value)}
      />
      <span className="duration-value">{durationValue} Months</span>
      </div>

      {/* Example button to collect values */}
      <button type="submit" onClick={() => console.log(getFilterValues())}>
         Apply
      </button>
    </form>
  );
};

export default ProjectFilter;

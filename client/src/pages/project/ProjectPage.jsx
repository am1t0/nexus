import React from "react";
import { useParams } from "react-router-dom";
import { MapComponent } from "../../components/map/Map";

export default function ProjectPage() {
  const { project } = useParams();

  return (
    <div className="project-page">
        <h4>Project: {decodeURIComponent(project)}</h4>
        <h5>Department of Roadways</h5>
      <div className="project-left">
        <h5>conflicts</h5>
         <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
          <li>D</li>
          <li>E</li>
         </ul>
      </div>
      <div className="right">
        <MapComponent 
          mapStyle={{ height: "60vh", width: "50%" }}
          filterShown = {false}
        />
      </div>
    </div>
  );
}

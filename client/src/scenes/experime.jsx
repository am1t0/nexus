// import React from 'react';

// const ProjectDetail = ({ project }) => {
//   // Calculate the progress percentage
//   const today = new Date();
//   const startDate = new Date(project.startDate);
//   const endDate = new Date(project.endDate);
//   const totalDuration = endDate - startDate;
//   const elapsedDuration = today - startDate;
//   const progressPercentage = Math.min((elapsedDuration / totalDuration) * 100, 100);

//   return (
//     <div className="container mt-5" style={{ position: 'absolute' }}>
//       <div className="card shadow-lg">
//         <div className="card-body">
//           <h3 className="card-title">{project.name}</h3>
//           <p className="text-muted">Implemented by: {project.implementer}</p>

//           {/* Progress Bar with paddingInline */}
//           <div className="progress mb-3" style={{ paddingInline: '25px' }}>
//             <div
//               className="progress-bar"
//               role="progressbar"
//               style={{ width: ${progressPercentage}% }}
//               aria-valuenow={progressPercentage}
//               aria-valuemin="0"
//               aria-valuemax="100"
//             >
//               {Math.round(progressPercentage)}%
//             </div>
//           </div>

//           <hr />

//           <div className="row">
//             <div className="col-md-6">
//               {/* Description Div with height set to 250px */}
//               <div
//                 className="mb-3 p-3"
//                 style={{
//                   height: '250px',
//                   backgroundColor: '#f0f0f0',
//                   borderRadius: '8px',
//                   overflowY: 'auto',
//                 }}
//               >
//                 <h5>Description</h5>
//                 <p>{project.description}</p>
//               </div>
//             </div>

//             <div className="col-md-6">
//               {/* Empty gray square area for future map integration */}
//               <div
//                 className="mb-3"
//                 style={{
//                   height: '200px',
//                   backgroundColor: '#d3d3d3',
//                   borderRadius: '8px',
//                   textAlign: 'center',
//                   lineHeight: '200px',
//                 }}
//               >
//                 Map Placeholder
//               </div>

//               <div className="mb-3 p-3">
//                 <h5>Collisions</h5>
//                 <ul className="list-group">
//                   {project.collisions?.map((collision, index) => (
//                     <li key={index} className="list-group-item">
//                       {collision}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <h5>Start Date</h5>
//               <p>{startDate.toLocaleDateString()}</p>
//             </div>
//             <div className="col-md-6">
//               <h5>End Date</h5>
//               <p>{endDate.toLocaleDateString()}</p>
//             </div>
//           </div>

//           <div className="mb-3">
//             <h5>Budget</h5>
//             <p>{project.budget} USD</p>
//           </div>

//           <div className="mb-3">
//             <h5>Departments Involved</h5>
//             {/* Uncomment the below code when departments data is available */}
//             {/* <ul className="list-group">
//               {project.departments.map((department, index) => (
//                 <li key={index} className="list-group-item">
//                   {department}
//                 </li>
//               ))}
//             </ul> */}
//           </div>

//           <div className="mb-3">
//             <h5>Milestones</h5>
//             <p>{project.milestones}</p>
//           </div>

//           <div className="mb-3">
//             <h5>Editor Content</h5>
//             <p>{project.editorContent}</p>
//           </div>

//           <div className="mb-3">
//             <h5>Resources</h5>
//             <p>{project.resources}</p>
//           </div>

//           <div className="mb-3">
//             <h5>Area</h5>
//             <p>{project.area}</p>
//           </div>

//           <div className="mb-3">
//             <h5>Details of Work</h5>
//             <p>{project.detailsOfWork}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetail;


// <div className="container-fluid">
// {/* Header Section with Filters */}
// <div className="row bg-primary text-white py-3">
//   <div className="col-md-3">
//     <label htmlFor="areaSelect">Area</label>
//     <select className="form-select" id="areaSelect">
//       <option>Greater Noida</option>
//       <option>Noida</option>
//       <option>Delhi</option>
//       {/* Add more options as needed */}
//     </select>
//   </div>
//   <div className="col-md-3">
//     <label htmlFor="projectSelect">Project</label>
//     <select className="form-select" id="projectSelect">
//       <option>Project 9008</option>
//       <option>Project 9009</option>
//       {/* Add more options as needed */}
//     </select>
//   </div>
//   <div className="col-md-3">
//     <label htmlFor="dateSelect">End Date</label>
//     <input type="date" className="form-control" id="dateSelect" />
//   </div>
// </div>

// {/* Main Content Section */}
// <div className="row mt-3">
//   <div className="col-md-8">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Description</h5>
//         <p className="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
//           Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
//           elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
//         </p>
//         {/* You can add more content or map the list here */}
//       </div>
//     </div>
//   </div>

//   {/* Map Section */}
//   <div className="col-md-4">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Map</h5>
//         {/* Placeholder for the map */}
//         <div className="map-placeholder bg-light" style={{ height: '300px' }}>
//           <p className="text-center my-5">Map goes here</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
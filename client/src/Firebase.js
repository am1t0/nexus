import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, addDoc, setDoc, getDoc, arrayUnion, updateDoc, query, where, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createContext, useContext } from "react";
import * as martinez from 'martinez-polygon-clipping';




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbkOe2ijBGijBf463M_uyP5nRJw4RuDTQ",
  authDomain: "cooperation-26e4b.firebaseapp.com",
  projectId: "cooperation-26e4b",
  storageBucket: "cooperation-26e4b.appspot.com",
  messagingSenderId: "5862210627",
  appId: "1:5862210627:web:47166358d5fd42d73b68f6",
  measurementId: "G-99Z6GH9CNC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


// Create Firebase context
const firebaseContext = createContext(null);

// Custom hook to use Firebase context
export const useFirebase = () => useContext(firebaseContext);

export const FirebaseProvider = ({ children }) => {
  const isValidPolygon = (polygon) => {
    return polygon && polygon.type === 'Feature' &&
      polygon.geometry && polygon.geometry.type === 'Polygon' &&
      polygon.geometry.coordinates && polygon.geometry.coordinates.length > 0;
  };

  function calculatePolygonArea(polygon) {
    const coords = polygon[0]; // Assuming a single ring polygon
    let area = 0;

    for (let i = 0; i < coords.length - 1; i++) {
      area += (coords[i][0] * coords[i + 1][1]) - (coords[i + 1][0] * coords[i][1]);
    }

    area = Math.abs(area) / 2;
    return area;
  }

  const addProject = async (project) => {
    try {
      // Fetch existing projects
      const existingProjectsSnapshot = await getDocs(collection(firestore, 'projects'));
      const existingProjects = existingProjectsSnapshot.docs.map(doc => doc.data());
  
      // Convert the coordinates to an array of arrays and ensure it's closed
      const projectCoordinates = project.coordinates.map(coord => [coord.lng, coord.lat]);
  
      // Ensure the polygon is closed
      if (projectCoordinates[0][0] !== projectCoordinates[projectCoordinates.length - 1][0] ||
          projectCoordinates[0][1] !== projectCoordinates[projectCoordinates.length - 1][1]) {
          projectCoordinates.push(projectCoordinates[0]);
      }
  
      const newProjectPolygon = [projectCoordinates];
  
      if (newProjectPolygon[0].length < 4) {
        throw new Error('Invalid polygon: A polygon must have at least 4 points including the closure.');
      }
  
      const conflicts = [];
  
      // Loop through existing projects and check for overlaps
      for (const existingProject of existingProjects) {
        const existingProjectCoordinates = existingProject.area.map(coord => [coord.lng, coord.lat]);
        // Ensure the polygon is closed
        if (existingProjectCoordinates[0][0] !== existingProjectCoordinates[existingProjectCoordinates.length - 1][0] ||
            existingProjectCoordinates[0][1] !== existingProjectCoordinates[existingProjectCoordinates.length - 1][1]) {
            existingProjectCoordinates.push(existingProjectCoordinates[0]);
        }
  
        const existingProjectPolygon = [existingProjectCoordinates];
  
        if (existingProjectPolygon[0].length >= 4) {
          // Compute the intersection
          const intersection = martinez.intersection(newProjectPolygon, existingProjectPolygon);
          if(!intersection){
            continue;
          }
          else if (intersection.length > 0) {
            const intersectionArea = calculatePolygonArea(intersection[0]);
            const newProjectArea = calculatePolygonArea(newProjectPolygon);
            const existingProjectArea = calculatePolygonArea(existingProjectPolygon);
  
            const percentageOverlapNewProject = (intersectionArea / newProjectArea) * 100;
            const percentageOverlapExistingProject = (intersectionArea / existingProjectArea) * 100;

            conflicts.push({
              percentageOverlapNewProject,
              percentageOverlapExistingProject,
              existingProjectDetails: existingProject,
            });
          } else {
            console.log('No overlap detected.');
          }
        } else {
          console.warn('Invalid existing project polygon detected and skipped:', existingProject);
        }
      }
  
      if (conflicts.length > 0) {
        console.warn('Conflicts detected:', conflicts);
        project.conflicts = conflicts;
      }
  
      const isInterDepartmental = project.departments.length > 1;
  
      const projectData = {
        department: project.department,
        name: project.projectName,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        budget: project.budget,
        implementer: project.implementer,
        isInterDepartmental,
        departments: project.departments,
        milestones: project.milestones,
        editorContent: project.editorContent,
        resources: project.resources,
        area: project.coordinates, // Original coordinates
        detailsOfWork: project.detailsOfWork,
        status: 'upcoming',
        conflicts,
      };
  
      const docRef = await addDoc(collection(firestore, 'projects'), projectData);
      console.log('Project added with ID:', docRef.id);
  
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const fetchAllProjects = async (setProjectList) => {
    try {
      // Get a reference to the 'projects' collection
      const projectsCollection = collection(firestore, 'projects');

      // Fetch all documents from the 'projects' collection
      const projectSnapshot = await getDocs(projectsCollection);

      // Extract the data from each document
      const projects = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setProjectList((prevProjects) => [...prevProjects, ...projects]);

      return projects;

    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };

  return (

    <firebaseContext.Provider
      value=
      {{
        addProject,
        fetchAllProjects
      }}
    >
      {children}
    </firebaseContext.Provider>

  );
}
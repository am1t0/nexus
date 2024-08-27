import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { polygon, intersect, area, booleanDisjoint } from '@turf/turf';
import { getFirestore, doc, addDoc, setDoc, getDoc,arrayUnion, updateDoc,query,where,collection, getDocs} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createContext, useContext } from "react";



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
const addProject = async (project) => {
  try {
      // Fetch existing projects
      const existingProjectsSnapshot = await getDocs(collection(firestore, 'projects'));
      const existingProjects = existingProjectsSnapshot.docs.map(doc => doc.data());

      const conflicts = [];

      // Convert the coordinates to an array of arrays and ensure it's closed
      const projectCoordinates = project.coordinates.map(coord => [coord.lng, coord.lat]);

      // Ensure the polygon is closed by checking if the first and last coordinates are the same
      if (projectCoordinates[0][0] !== projectCoordinates[projectCoordinates.length - 1][0] ||
          projectCoordinates[0][1] !== projectCoordinates[projectCoordinates.length - 1][1]) {
          projectCoordinates.push(projectCoordinates[0]);
      }

      const newProjectPolygon = polygon([projectCoordinates]);

      if (newProjectPolygon.geometry.coordinates[0].length < 4) {
          throw new Error('Invalid polygon: A polygon must have at least 4 points including the closure.');
      }

      for (const existingProject of existingProjects) {
          const existingProjectCoordinates = existingProject.area.map(coord => [coord.lng, coord.lat]);

          if (existingProjectCoordinates[0][0] !== existingProjectCoordinates[existingProjectCoordinates.length - 1][0] ||
              existingProjectCoordinates[0][1] !== existingProjectCoordinates[existingProjectCoordinates.length - 1][1]) {
              existingProjectCoordinates.push(existingProjectCoordinates[0]);
          }

          const existingProjectPolygon = polygon([existingProjectCoordinates]);

          if (existingProjectPolygon.geometry.coordinates[0].length >= 4) {
              // Check if the polygons are valid and not disjoint
              if (newProjectPolygon && existingProjectPolygon && 
                  !booleanDisjoint(newProjectPolygon, existingProjectPolygon)) {
                  // Check if there's an overlap
                  if (!isValidPolygon(newProjectPolygon) || !isValidPolygon(existingProjectPolygon)) {
                    console.error('Invalid polygons provided:', { newProjectPolygon, existingProjectPolygon });
                    return; // Or handle the error as needed
                  }
                  console.log('New Project Polygon Geometry:', newProjectPolygon);
                  console.log('Existing Project Polygon Geometry:', existingProjectPolygon);
                  var poly1 = {
                    "type": "Feature",
                    "properties": {
                      "fill": "#0f0"
                    },
                    "geometry": {
                      "type": "Polygon",
                      "coordinates": [[
                        [-122.801742, 45.48565],
                        [-122.801742, 45.60491],
                        [-122.584762, 45.60491],
                        [-122.584762, 45.48565],
                        [-122.801742, 45.48565]
                      ]]
                    }
                  };
                  
                  var poly2 = {
                    "type": "Feature",
                    "properties": {
                      "fill": "#00f"
                    },
                    "geometry": {
                      "type": "Polygon",
                      "coordinates": [[
                        [-122.520217, 45.535693],
                        [-122.64038, 45.553967],
                        [-122.720031, 45.526554],
                        [-122.669906, 45.507309],
                        [-122.723464, 45.446643],
                        [-122.532577, 45.408574],
                        [-122.487258, 45.477466],
                        [-122.520217, 45.535693]
                      ]]
                    }
                  };
                  
                  var polygons = {
                    "type": "FeatureCollection",
                    "features": [poly1, poly2]
                  };
                  
                  var overlap = intersect(poly1, poly2);
                  
                  
                  
                  // const overlap = intersect(a, b);

                  if (overlap) {
                      const overlapArea = area(overlap);
                      const newProjectArea = area(newProjectPolygon);
                      const existingProjectArea = area(existingProjectPolygon);

                      const percentageOverlapNewProject = (overlapArea / newProjectArea) * 100;
                      const percentageOverlapExistingProject = (overlapArea / existingProjectArea) * 100;

                      conflicts.push({
                          percentageOverlapNewProject,
                          percentageOverlapExistingProject,
                          existingProjectDetails: existingProject,
                      });
                  } else {
                      console.log('No overlap detected.');
                  }
              } else {
                  console.log('Polygons are disjoint or invalid, skipping intersection.');
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

      // const projectData = {
      //     name: project.projectName,
      //     description: project.description,
      //     startDate: project.startDate,
      //     endDate: project.endDate,
      //     budget: project.budget,
      //     implementer: project.implementer,
      //     isInterDepartmental,
      //     departments: project.departments,
      //     milestones: project.milestones,
      //     editorContent: project.editorContent,
      //     resources: project.resources,
      //     area: project.coordinates, // Original coordinates
      //     detailsOfWork: project.detailsOfWork,
      //     status: 'upcoming',
      //     conflicts,
      // };

      // const docRef = await addDoc(collection(firestore, 'projects'), projectData);
      // console.log('Project added with ID:', docRef.id);

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
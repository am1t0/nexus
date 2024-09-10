import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, addDoc, setDoc, getDoc, arrayUnion, updateDoc, query, where, collection, getDocs, serverTimestamp, orderBy, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createContext, useContext } from "react";
import * as martinez from 'martinez-polygon-clipping';




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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
        department: project.department.replace(/-/g, ' '),
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
        status: 'planning',
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

  const addDepartment = async (department) => {
    try {
        // Reference to the 'departments' collection
        const deptCollection = collection(firestore, 'departments');
        
        // Add a new document with the department data
        const docRef = await addDoc(deptCollection, department);
        
        console.log("Department added with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding department: ", error);
        return { success: false, error: error.message };
    }
};

const fetchAllDepartments = async () => {
  try {
    const departmentsCollection = collection(firestore, 'departments'); // Reference to the 'departments' collection
    const departmentSnapshot = await getDocs(departmentsCollection); // Get all documents in the collection
    const departmentList = departmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map documents to data

    return departmentList; // Return the list of departments
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

const fetchDepartmentData = async (department) => {
  const departmentName = department.replace(/-/g, ' ');
  console.log('ok  ji ', departmentName)
  try {
    // Reference to the departments collection
    const departmentsRef = collection(firestore, 'departments');
    
    // Create a query to find the document with the matching deptName
    const q = query(departmentsRef, where('deptName', '==', departmentName));
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    
    // Check if any documents were found
    if (querySnapshot.empty) {
      console.log('No such document!');
      return null;
    }
    
    // Assuming deptName is unique, get the first document in the result
    const doc = querySnapshot.docs[0];
    return doc.data();
  } catch (error) {
    console.error('Error fetching department data:', error);
    return null;
  }
}

const fetchDepartmentProject = async (department) => {
  const departmentName = department.replace(/-/g, ' ');
  try {
    // Reference to the 'projects' collection
    const projectsRef = collection(firestore, 'projects');

    // Create a query against the collection to get projects for the specified department
    const q = query(projectsRef, where('department', '==', departmentName));

    // Execute the query and get the documents
    const querySnapshot = await getDocs(q);

    // Map over the documents to retrieve data
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return projects;
  } catch (error) {
    console.error('Error fetching department projects:', error);
    return [];
  }
};

const fetchProject = async (ProjectID) => {
  try {
    const projectRef = await doc(firestore, 'projects', ProjectID);
    const projectSnapshot = await getDoc(projectRef);
    console.log('Project snapshot:', projectSnapshot.data());
    if (projectSnapshot.exists()) {
      return projectSnapshot.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};
  // Function to get or create a chat between two departments
const getOrCreateChat = async (departmentAId, departmentBId) => {
  const chatsRef = collection(firestore, "chats");

  // Query to find a chat between these two departments
  const q = query(
      chatsRef,
      where("departmentA", "in", [departmentAId, departmentBId]),
      where("departmentB", "in", [departmentAId, departmentBId])
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
      // If no chat exists, create a new one
      const newChatRef = await addDoc(chatsRef, {
          departmentA: departmentAId,
          departmentB: departmentBId
      });
      return newChatRef.id;
  } else {
      // Return the existing chat's ID
      return querySnapshot.docs[0].id;
  }
};

const sendMessage = async (chatId, text, senderDepartmentId) => {
  const messagesRef = collection(firestore, "chats", chatId, "messages");

  await addDoc(messagesRef, {
      text: text,
      senderDepartment: senderDepartmentId,
      timestamp: serverTimestamp()
  });
};

const listenForMessages = (chatId, callback) => {
  const messagesRef = collection(firestore, "chats", chatId, "messages");
  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

  return onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
      callback(messages);
  });
};

  return (

    <firebaseContext.Provider
      value=
      {{
        addProject,
        fetchAllProjects,
        addDepartment,
        fetchAllDepartments,
        fetchDepartmentData,
        getOrCreateChat,
        sendMessage,
        listenForMessages,
        fetchDepartmentProject,
        fetchProject
      }}
    >
      {children}
    </firebaseContext.Provider>

  );
}
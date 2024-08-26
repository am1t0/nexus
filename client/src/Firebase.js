import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

    const addProject = async (project) => {
        try {
          // Determine if the project is inter-departmental
          const isInterDepartmental = project.departments.length > 1;
          
          // Create a new project object with the appropriate attributes
          const projectData = {
            name: project.projectName,
            description: project.description,
            startDate: project.startDate,
            endDate: project.endDate,
            budget: project.budget,
            implementer: project.implementer,
            isInterDepartmental, // Set based on the departments involved
            departments: project.departments,
            milestones: project.milestones,
            editorContent: project.editorContent,
            resources: project.resources,
            area: project.area,
            detailsOfWork: project.detailsOfWork,
            status: 'upcoming'
          };
      
          // Add the new project to the 'projects' collection in Firestore
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
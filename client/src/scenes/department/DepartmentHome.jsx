import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../Firebase";
import { BallTriangle } from "react-loader-spinner";
import DepartmentFooter from "./DepartmentFooter";


export default function DepartmentHome() {
  const { department } = useParams();
  const [departmentData, setDepartmentData] = useState(null);
  const firebase = useFirebase();
  const [info, setInfo] = useState(true);

  const dummyDepartmentData = {
    area: [
      { latitude: 28.7041, longitude: 77.1025, description: "Location 1" },
      { latitude: 28.5355, longitude: 77.3910, description: "Location 2" },
      { latitude: 28.4595, longitude: 77.0266, description: "Location 3" },
    ],
    budget: "3000",
    conflicts: [],
    department: "Public Works",
    departments: [],
    description: `Contact Information: Lists the email, phone, and address with corresponding icons.
  Follow Us: Displays social media icons. The socialMedia array should be passed in with platform names (e.g., facebook, twitter, linkedin) and URLs.`,
    detailsOfWork: "",
    editorContent: "",
    endDate: "2024-08-24",
    id: "fD8I6jKPqFn6lhNF6jAT",
    implementer: "Siyaram Constructions",
    isInterDepartmental: false,
    milestones: ['first milestone', 'second milestone', 'third milestone'],
    name: "PWD-1",
    resources: [],
    startDate: "2024-08-03",
    status: "upcoming"
  };
  
  const ImageData = {
    'Municipal Corporation': [
      { img1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfuCeG6VZzI4TzVUWDeTML4GJwzN1brSIS3Q&s' },
      { img2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHrv0Rnu0birdfNKLao0_1FkDLLhN2frMig&s' },
    ],
    'Public Works Department': [
      { img1: 'https://onsiteteams.com/wp-content/uploads/2022/08/Blog-Images-65.jpg' },
      { img2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0yCnkM1k2Gj0ePHEqcMT4XwTG3e0oheT41A&s' },
    ],
    'Utilities Works Department': [
      { img1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLAJOnJ_3fBnt9ttdpx_5dx9FAD_XaH_rvgg&s' },
      { img2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcK_NCvE5acYLZIiwVgZI0v7Yuz6FkBIDVaA&s' },
    ]
  }

  useEffect(() => {
    getDepartment();
  }, []);

  const convertHtmlToFormattedText = (html) => {
    // Replace HTML entities with corresponding characters
    const htmlWithEntities = html.replace(/&nbsp;/g, " ");

    // Create a temporary DOM element to parse HTML
    const temporaryDiv = document.createElement("div");
    temporaryDiv.innerHTML = htmlWithEntities;

    // Convert HTML to formatted text
    return temporaryDiv.textContent || temporaryDiv.innerText || "";
  };

  const getDepartment = async () => {
    const fetchedDepartment = await firebase.fetchDepartmentData(department);
    setDepartmentData(fetchedDepartment);
    if(!fetchedDepartment){
      setInfo(false);
    }
  };

  if(info === false){
    return (
      <>
      <p>no project</p>
      </>
    )
  }

  

  return departmentData ? (
    <>
    <div className="container">
      <div className="card">
        <div className="d-flex gap-4 justify-content-center my-2">
          <img
            style={{ height: "20rem", width: "30rem" }}
            src={ImageData[department][0].img1}
            className="card-img-top"
            alt="Deaprtment-Image"
          />
          <img
            style={{ height: "20rem", width: "30rem" }}
            src={ImageData[department][1].img2}
            className="card-img-top"
            alt="Deaprtment-Image"
          />
        </div>
        <div className="card-body">
          <p className="card-text mx-5">
            {convertHtmlToFormattedText(departmentData.deptDesc)}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            distinctio mollitia excepturi dicta accusantium laboriosam ducimus
            nihil velit incidunt praesentium. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Dolore vitae fuga adipisci nulla
            earum, sit repellendus architecto totam? Eum minus placeat dicta
            quod doloremque. Laudantium, nobis voluptatibus sit deleniti
            officiis sed alias error soluta eos fugiat eligendi eum voluptate
            pariatur.
          </p>

          {/* <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Email:</strong>{" "}
              <a href={`mailto:${departmentData.emailAddress}`}>
                {departmentData.emailAddress}
              </a>
            </li>
            <li className="list-group-item">
              <strong>Phone:</strong> {departmentData.phoneNumber}
            </li>
            <li className="list-group-item">
              <strong>Office Address:</strong> {departmentData.officeAddress}
            </li>
          </ul> */}
          {/* <h5 className="mt-3">Resources:</h5>
          <ul className="list-group">
            {departmentData.resources.map((resource, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{resource.type}</span>
                <span className="badge bg-primary rounded-pill">
                  {resource.quantity}
                </span>
              </li>
            ))}
          </ul> */}

        </div>
      </div>
    </div>
    <DepartmentFooter department={departmentData}/>
    </>
  ) : (
    <div
      style={{
        width: "100%",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <h6>Loading Data...</h6>
    </div>
  );
}

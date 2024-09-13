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
    // Dummy data omitted for brevity
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
    const htmlWithEntities = html.replace(/&nbsp;/g, " ");
    const temporaryDiv = document.createElement("div");
    temporaryDiv.innerHTML = htmlWithEntities;
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
      <div className="container text-center">
        <p>No project</p>
      </div>
    );
  }

  return departmentData ? (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-6 d-flex justify-content-center">
              <img
                className="img-fluid"
                src={ImageData[department][0].img1}
                alt="Department Image 1"
                style={{ height: "20rem", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <img
                className="img-fluid"
                src={ImageData[department][1].img2}
                alt="Department Image 2"
                style={{ height: "20rem", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="card-body">
            <p className="card-text">
              {convertHtmlToFormattedText(departmentData.deptDesc)}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum distinctio mollitia excepturi dicta accusantium laboriosam ducimus nihil velit incidunt praesentium. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore vitae fuga adipisci nulla earum, sit repellendus architecto totam? Eum minus placeat dicta quod doloremque. Laudantium, nobis voluptatibus sit deleniti officiis sed alias error soluta eos fugiat eligendi eum voluptate pariatur.
            </p>
          </div>
        </div>
      </div>
      <DepartmentFooter department={departmentData}/>
    </>
  ) : (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "60vh" }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
      <h6 className="mt-3">Loading Data...</h6>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../Firebase";
import { BallTriangle } from "react-loader-spinner";

export default function DepartmentHome() {
  const { department } = useParams();
  const [departmentData, setDepartmentData] = useState(null);
  const firebase = useFirebase();

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
    console.log(fetchedDepartment);
  };
  return departmentData ? (
    <div className="container">
      <div className="card">
        <div className="d-flex gap-4 justify-content-center my-2">
          <img
            style={{ height: "20rem", width: "30rem" }}
            src="https://imcindore.mp.gov.in/uploads/IMC_GALLERY_IMAGE_01_094e6e28eb.png"
            className="card-img-top"
            alt="Municipal Corporation"
          />
          <img
            style={{ height: "20rem", width: "30rem" }}
            src="https://apacnewsnetwork.com/wp-content/uploads/2023/07/Indore-Municipal-Corporation-becomes-the-countrys-first-urban-body-to-earn-EPR-credit.png"
            className="card-img-top"
            alt="Municipal Corporation"
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
          <ul className="list-group list-group-flush">
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
          </ul>
          <h5 className="mt-3">Resources:</h5>
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
          </ul>
        </div>
      </div>
    </div>
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

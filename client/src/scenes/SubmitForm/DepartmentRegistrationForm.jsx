import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFirebase } from "../../Firebase";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function DepartmentRegistrationForm() {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const firebase = useFirebase();
  const [formData, setFormData] = useState({
    deptName: "",
    emailAddress: "",
    phoneNumber: "",
    editorContet: "",
    officeAddress: "",
    resourceType: "",
    quantity: "",
    resources: [],
  });

  const handleDepartmentSubmit = async () => {
    setLoading(true);

    await firebase.addDepartment(formData);
    navigate(`/${formData.deptName}`)
  
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: Array.from(files) });
  };

  const handleAddResource = () => {
    setFormData({
      ...formData,
      resources: [
        ...formData.resources,
        {
          type: formData.resourceType,
          quantity: formData.quantity,
        },
      ],
      resourceType: "",
      quantity: "",
    });
  };

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDepartmentSubmit();
  };

  return !loading ? (
    <div className="container mt-4 my-3">
      <h1 className="text-center mb-4">Department Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="border p-4 mb-4">
          <legend className="w-auto">Department Information</legend>
          <div className="form-group">
            <label htmlFor="deptName">Department</label>
            <input
              type="text"
              className="form-control"
              id="deptName"
              name="deptName"
              value={formData.deptName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deptName">Address</label>
            <input
              type="text"
              className="form-control"
              id="officeAddress"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex gap-5">
            <div className="form-group">
              <label htmlFor="deptName">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="deptName">Office Email</label>
              <input
                type="text"
                className="form-control"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="deptDesc">Department Description:</label>
            <ReactQuill
              value={formData.deptDesc}
              onChange={handleQuillChange("deptDesc")}
              theme="snow"
              className="mb-4"
              style={{ minHeight: "200px" }}
              placeholder="Write the department description here..."
            />
          </div>
        </fieldset>

        <fieldset className="border p-4 mb-4">
          <legend className="w-auto">Resources</legend>
          <div className="d-flex align-items-center" style={{ gap: "1.3rem" }}>
            <div className="form-group">
              <label htmlFor="resourceType">Resource Type:</label>
              <input
                type="text"
                className="form-control"
                id="resourceType"
                name="resourceType"
                value={formData.resourceType}
                onChange={handleResourceChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleResourceChange}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={handleAddResource}
            >
              Add
            </button>
          </div>
          <div className="my-2">
            {formData.resources.map((resource, index) => (
              <div key={index} className="alert alert-info py-2 px-3 mb-2">
                {index + 1}. {resource.type} - {resource.quantity}
              </div>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div style={{width:'100%',height:'100vh', display:'flex',flexDirection:'column',gap:'2rem',alignItems:'center',border:'1px solid red',justifyContent:'center'}}>
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
      <h6>Creating Department...</h6>
    </div>
  );
}

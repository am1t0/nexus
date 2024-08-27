// DepartmentRegistrationForm.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

const DepartmentRegistrationForm = () => {
    const [formData, setFormData] = useState({
        deptName: '',
        deptID: '',
        deptHead: '',
        deptDesc: '',
        contactPerson: '',
        emailAddress: '',
        phoneNumber: '',
        officeAddress: '',
        resourceType: '',
        quantity: '',
        resourceDesc: '',
        availableFrom: '',
        availableUntil: '',
        projectProposals: [],
        licensesPermits: [],
        certificates: [],
        otherDocs: [],
        comments: '',
        deptWebsite: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files : value
        }));
    };

    const handleQuillChange = (field) => (content) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: content
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };

    return (
        <div className="container mt-4 my-3">
            <h1 className="text-center mb-4">Department Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <fieldset className="border p-4 mb-4">
                    <legend className="w-auto">Department Information</legend>
                    <div className="form-group">
                        <label htmlFor="deptName">Department Name:</label>
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
                        <label htmlFor="deptID">Department ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="deptID"
                            name="deptID"
                            value={formData.deptID}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deptHead">Head of Department:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="deptHead"
                            name="deptHead"
                            value={formData.deptHead}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deptDesc">Department Description:</label>
                        <ReactQuill
                            value={formData.deptDesc}
                            onChange={handleQuillChange('deptDesc')}
                            theme="snow"
                            className="mb-4"
                            style={{ minHeight: "200px" }}
                            placeholder="Write the department description here..."
                        />
                    </div>
                </fieldset>

                <fieldset className="border p-4 mb-4">
                    <legend className="w-auto">Contact Information</legend>
                    <div className="form-group">
                        <label htmlFor="contactPerson">Contact Person:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailAddress">Email Address:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailAddress"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="officeAddress">Office Address:</label>
                        <textarea
                            className="form-control"
                            id="officeAddress"
                            name="officeAddress"
                            value={formData.officeAddress}
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>

                <fieldset className="border p-4 mb-4">
                    <legend className="w-auto">Resources</legend>
                    <div className="form-group">
                        <label htmlFor="resourceType">Resource Type:</label>
                        <select
                            className="form-control"
                            id="resourceType"
                            name="resourceType"
                            value={formData.resourceType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Resource Type</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Personnel">Personnel</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="resourceDesc">Description:</label>
                        <textarea
                            className="form-control"
                            id="resourceDesc"
                            name="resourceDesc"
                            value={formData.resourceDesc}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableFrom">Available From:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="availableFrom"
                            name="availableFrom"
                            value={formData.availableFrom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableUntil">Available Until:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="availableUntil"
                            name="availableUntil"
                            value={formData.availableUntil}
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>

                <fieldset className="border p-4 mb-4">
                    <legend className="w-auto">Document Uploads</legend>
                    <div className="form-group">
                        <label htmlFor="projectProposals">Project Proposals:</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="projectProposals"
                            name="projectProposals"
                            multiple
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="licensesPermits">Licenses/Permits:</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="licensesPermits"
                            name="licensesPermits"
                            multiple
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="certificates">Certificates:</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="certificates"
                            name="certificates"
                            multiple
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="otherDocs">Other Relevant Documents:</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="otherDocs"
                            name="otherDocs"
                            multiple
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>

                <fieldset className="border p-4 mb-4">
                    <legend className="w-auto">Additional Information</legend>
                    <div className="form-group">
                        <label htmlFor="comments">Comments/Notes:</label>
                        <textarea
                            className="form-control"
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deptWebsite">Department Website:</label>
                        <input
                            type="url"
                            className="form-control"
                            id="deptWebsite"
                            name="deptWebsite"
                            value={formData.deptWebsite}
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>

                <div className="form-group">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="agreeTerms"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            required
                        />
                        <label className="form-check-label" htmlFor="agreeTerms">
                            I agree to the terms and conditions
                        </label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default DepartmentRegistrationForm;

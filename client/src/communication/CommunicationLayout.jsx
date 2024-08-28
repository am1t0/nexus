import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CommunicationLayout() {
  const { chatWith } = useParams();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [department, setDepartment] = useState();

  useEffect(()=>{
        setDepartment(chatWith)
  },[])

  const departments = [
    "Department of Public Works",
    "Department of Sanitation",
    "Department of Transportation",
    "Department of Parks and Recreation",
    "Department of Housing and Urban Development",
    "Department of Public Health"
  ];

  const handleSendMessage = () => {
    if (message || attachments.length > 0) {
      // Implement the logic to send the message and attachments
      console.log('Message:', message);
      console.log('Attachments:', attachments);
      // Clear the input fields after sending
      setMessage('');
      setAttachments([]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar for recent chats */}
        <div className="col-md-4 col-lg-3 border-end">
          <h5 className="mb-4">Recent Chats</h5>
          <ul className="list-group">
             {
                departments.map((department, index) => (
                    <div onClick={()=> setDepartment(department)}>
                        {department}
                    </div>
                ))
             }
          </ul>
        </div>

        {/* Chat window */}
        <div className="col-md-8 col-lg-9">
          <div className="card">
            <div className="card-header">
              <h5>Chat with: @{department}</h5>
            </div>
            <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
              {/* Chat messages go here */}
              <p>Welcome to your chat with @{department}.</p>
              {/* Additional chat messages can be added here */}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  className="form-control"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="btn btn-outline-secondary">
                  Attach
                </label>
                <button className="btn btn-primary" type="button" onClick={handleSendMessage}>
                  Send
                </button>
              </div>

              {/* Display attachments */}
              {attachments.length > 0 && (
                <div className="mt-2">
                  <h6>Attachments:</h6>
                  <ul className="list-group">
                    {attachments.map((file, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {file.name}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveAttachment(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

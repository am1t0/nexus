import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useFirebase} from "../Firebase";
import {ChatbotModal} from "./ChatBot.jsx";

export default function CommunicationLayout({ departmentId, otherDepartmentId }) {
  const { chatWith } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [department, setDepartment] = useState();
  const [chatId, setChatId] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatBotRes,setChatBotRes] = useState('');


  const firebase = useFirebase();

  useEffect(()=>{
        setDepartment(chatWith)

        const setupChat = async () => {
          const id = await firebase.getOrCreateChat(departmentId, otherDepartmentId);
          setChatId(id);

          // Listen for new messages
          firebase.listenForMessages(id, setMessages);
      };
      setupChat();
  },[departmentId, otherDepartmentId])

  const departments = [
    "Department of Public Works",
    "Department of Sanitation",
    "Department of Transportation",
    "Department of Parks and Recreation",
    "Department of Housing and Urban Development",
    "Department of Public Health"
  ];

  const handleSendMessage = async () => {
    if (newMessage || attachments.length > 0) {
      // Implement the logic to send the message and attachments
      console.log('Message:', newMessage);
      console.log('Attachments:', attachments);
      // Clear the input fields after sending
      if (newMessage.trim() !== "") {
        await firebase.sendMessage(chatId, newMessage, departmentId);
        setNewMessage("");
    }
      // setMessage('');
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
  
  const handleChatbotClose = (message) => {
    if (message) {
      setNewMessage(message);
      handleSendMessage(); // Send the generated message
    }
    setShowChatbot(false);
  };

  const generateMessage = (input) => {
   return setChatBotRes(input);
  };


  return (
    <div className="container-fluid mt-4" >
      <div className="row">
        {/* Sidebar for recent chats */}
        <div className="col-md-4 col-lg-3 border-end">
          <h5 className="mb-4">Recent Chats</h5>
          <ul className="list-group">
            {departments.map((dep, index) => (
              <li key={index} className="list-group-item" onClick={() => setDepartment(dep)}>
                {dep}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat window */}
        <div className="col-md-8 col-lg-9">
          <div className="card">
            <div className="card-header">
              <h5>Chat with: @{department}</h5>
            </div>
            <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
              {messages.length === 0 ? (
                <p>No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={msg.senderDepartment === departmentId ? "text-end" : "text-start"}>
                    <p>
                      <strong>{msg.senderDepartment === departmentId ? "You" : `@${msg.senderDepartment}`}:</strong> {msg.text}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                 
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
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowChatbot(true)}
                >
                  Open Chatbot
                </button>
              </div>
              <ChatbotModal show={showChatbot} handleClose={handleChatbotClose} generateMessage={generateMessage} dangerouslySetInnerHTML={{ __html: chatBotRes }} />

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

import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {marked} from 'marked';


// Custom hook to interact with Google Generative AI API

export const ChatbotModal = ({ show, handleClose, generateMessage }) => {
  const [input, setInput] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const systemPrompt="you are a bot for genrating messages for a formal conversation between two departments at city level";
  const handleGenerateMessage = async () => {
    
        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction: systemPrompt });
        const chat = model.startChat();
        const result = await chat.sendMessage((input));
        // console.log(result);
        const responseText =  result.response.text();
        setGeneratedMessage(((responseText)));
    
  };
  generateMessage(generatedMessage);

  const handleSendMessage = () => {
    handleClose(generatedMessage); // Send the message back to the chat
    setGeneratedMessage('');
  };

  const modalCenteredStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1050,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  };

  const modalDialogCenteredStyle = {
    margin: 0,
  };

  return (
    <div
      className="modal"
      style={show ? modalCenteredStyle : { display: 'none' }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" style={modalDialogCenteredStyle} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chatbot Assistant</h5>
            <button type="button" className="close" onClick={() => handleClose()}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Describe the details of the conversation:</label>
              <textarea
                className="form-control"
                rows="3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            <button className="btn btn-primary mt-2" onClick={handleGenerateMessage}>
              Generate Formal Message
            </button>
            <div className="mt-3">
              <h6>Generated Message:</h6>
              <div   dangerouslySetInnerHTML={{ __html: generatedMessage }}></div>
              <button className="btn btn-success" onClick={handleSendMessage} disabled={!generatedMessage}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

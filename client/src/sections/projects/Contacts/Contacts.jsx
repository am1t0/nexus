import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import './contacts.css'

export default function Contacts(props) {
  const { projectData } = props;
  return (
    <div>
        {/* Contact Information */}
        <h5>Contact Details:</h5>
        <div className="contact-list">
          {projectData.contacts.map((c, i) => (
            <div key={i} className="contact-card">
              {/* Left side - Photo + Name + Designation */}
              <div className="contact-left">
                <img
                  src={
                    c.photo ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"
                  }
                  alt={c.name}
                  className="contact-photo"
                />
                <h6 className="contact-name">{c.name}</h6>
                <span className="contact-role">
                  {c.role || "Project Manager"}
                </span>
              </div>

              {/* Right side - Contact Info */}
              <div className="contact-right">
                <div className="contact-info">
                  <FaPhoneAlt className="contact-icon phone" />
                  <span className="contact-detail">{c.phone}</span>
                </div>
                <div className="contact-info">
                  <FaEnvelope className="contact-icon email" style={{ marginLeft: '2.2rem' }} />
                  <span className="contact-detail">{c.email || "Not Available"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

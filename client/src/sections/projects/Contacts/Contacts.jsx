import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import './contacts.css'

export default function Contacts(props) {
  const { projectData } = props;
  return (
    <div>
        {/* Contact Information */}
        <div className="contact-list">
          {projectData.contacts.map((c, i) => (
            <div key={i} className="contact-card">
              {/* Left side - Photo + Name + Designation */}
              <div className="contact-upper">
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
              <div className="contact-lower">
                  <span className="contact-detail">{c.phone}</span>
                  <span className="contact-detail">{c.email || "Not Available"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

import React, { useState } from 'react'
import { FaPhoneAlt, FaArrowCircleDown, FaArrowDown} from "react-icons/fa";
import './conflicts.css'

export default function Conflicts( props ) {

 const { conflicts } = props;

 const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);
  return (
    <div className="conflicts-list">
      {conflicts.map((conflict, i) => (
        <div className={`conflict-card${openIndex === i ? " open" : ""}`} key={i}>
          <div className="conflict-card-header">
            <div>
              <div className="conflict-project">{conflict.project}</div>
              <div className="conflict-department">{conflict.department}</div>
            </div>
            <button
              className="conflict-opener"
              aria-label={openIndex === i ? "Collapse" : "Expand"}
              onClick={() => handleToggle(i)}
            >
              {openIndex === i ? <FaArrowDown /> : <FaArrowCircleDown />}
            </button>
          </div>
          <div
            className="conflict-card-body"
            style={{
              maxHeight: openIndex === i ? 300 : 0,
              opacity: openIndex === i ? 1 : 0,
              transition: "max-height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.3s",
              overflow: "hidden",
              padding: openIndex === i ? "1rem" : "0 1rem",
              background: "#f8faff"
            }}
          >
            <div className="conflict-reason">
              <strong>Reason:</strong> Issue with the current overlapping region near block.
            </div>
            <div className="conflict-contacts">
              <div className="conflict-contacts-title">Contacts</div>
              <div className="conflict-contacts-list">
                {conflict.contacts.map((c, j) => (
                  <div className="conflict-contact-card" key={j}>
                    <div className="contact-avatar">
                      {c.name[0]}
                    </div>
                    <div className="contact-info">
                      <div className="contact-name">{c.name}</div>
                      <div className="contact-phone"><FaPhoneAlt />{c.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

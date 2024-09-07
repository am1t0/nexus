import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faLocation, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const DepartmentFooter = ({ department }) => {
  const {
    emailAddress,
    phoneNumber,
    officeAddress,
  } = department;

  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <hr />
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact Information</h5>
            <ul className="list-unstyled">
              <li className='list-item my-2'>
               <FontAwesomeIcon icon={faMessage}  className='px-2'/> {emailAddress}
              </li>
              <li className='list-item my-2'>
               <FontAwesomeIcon icon={faPhone}  className='px-2'/>  {phoneNumber}
              </li>
              <li className='list-item my-2'>
                 <FontAwesomeIcon icon={faLocationDot} className='px-2' /> {officeAddress}
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <div className="d-flex py-2">
      <a href="https://facebook.com" className="mx-2" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://twitter.com" className="mx-2" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href="https://instagram.com" className="mx-2" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a href="https://linkedin.com" className="mx-2" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
      <a href="https://youtube.com" className="mx-2" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
    </div>
          </div>
        </div>
      </div>
      <div className="bg-dark text-white text-center p-3">
        {/* &copy; {new Date().getFullYear()} Inter departmental cooperation */}
      </div>
    </footer>
  );
};

export default  DepartmentFooter;

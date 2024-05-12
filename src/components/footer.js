import React,{useState} from 'react';
import '../styles/footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {


    return (
        <footer className="footer-main-container">
            <div className="footer-section">
                <div className="logo">
                  
                    <img src="https://rugsimple.com/wp-content/uploads/2020/06/Book_online_appointment.png" alt="Logo" />
                </div>
                <div className="text">
                 
                    <p>Fastest Growing Appointment Booking Platform </p>
                </div>
                <div className="social-icons">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faLinkedin} />
            

                </div>
            </div>
            <div className="footer-section">
                <h3>Reach Us</h3>
                <h6>Please Contact the below details for information</h6>
                <h5>Email: </h5>
                <p>example@example.com</p>
                <h5>Address:</h5>
                <p>123 Street, City, Country</p>
            </div>
            <div className="footer-section"> 
                <h3> FEATURES</h3>
                <div className="icon-grid">
                   
                    <div > 
                        <img src='https://th.bing.com/th/id/OIP.2_TbDrGsyQTt5eAtXz7P6wHaHa?w=163&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'   />
                        <p>Create Patients</p>
                    </div>
                    <div > 
                        <img src='https://th.bing.com/th/id/OIP.Nkfpisv64ns0MDwumy0zTgAAAA?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'   />
                        <p>Book Appointments</p>
                    </div>
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;

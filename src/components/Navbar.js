import React, { useState } from 'react';
import '../styles/navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation();

  if (location.pathname !== '/' && location.pathname !== '/signup' && !isLoggedIn) {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {

    localStorage.removeItem('userData');
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logohead">
          <img src={'https://rugsimple.com/wp-content/uploads/2020/06/Book_online_appointment.png'} className="logoimg"></img>
          <span className="logo">Patient Appointment</span>
        </div>

        <ul className="nav-menu">
          {isLoggedIn && (
            <li onClick={handleLogout} className="nav-item">
                <Link to="/">Log out</Link>
            </li>
          )}

          {!isLoggedIn &&  (
            <li className="nav-item">
              <Link to="/">Login</Link>
            </li>
          )}

        
          {!isLoggedIn && (
            <li className="nav-item">
              <Link to="/signup">Signup</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

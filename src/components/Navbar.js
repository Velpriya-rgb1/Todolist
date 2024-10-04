import React from 'react';
import './Navbar.css'; // Import your CSS file for the Navbar
import taskpro from "../image/taskpro.svg"; // Import the image for the navbar icon

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={taskpro} alt="icon" className="navbar-icon" />
        <span className="navbar-text">
          Task
          <br />
          Pro
        </span>
      </div>
      
    </nav>
  );
};
export default Navbar;

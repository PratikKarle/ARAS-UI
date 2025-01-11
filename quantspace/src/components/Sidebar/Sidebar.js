import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Sidebar.css"; // Sidebar styles

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens, user data)
    navigate("/"); // Redirect to home page
    onClose(); // Close the sidebar
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h3>User Menu</h3>
        <button onClick={onClose} className="close-btn">
          ✖
        </button>
      </div>
      <div className="sidebar-content">
        {/* Sidebar content goes here */}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

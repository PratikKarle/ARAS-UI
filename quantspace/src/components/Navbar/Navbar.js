import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/qs1.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    // Clear auth token from storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');

    // Navigate to the login page
    navigate('/');
  }

  return (
    <header className="navbar">
      <Link to="/home" className="logo">
        <div style={{ width: '30px' }}>
          QuantSpace
        </div>
      </Link>
      <input
        type="text"
        className="large-search"
        placeholder="Search for projects, teams, or tasks..."
      />
      {/* Logout Icon */}
      <div className="profile-icon" onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6" />
          <polyline points="10 9 15 4 20 9" />
          <line x1="15" y1="4" x2="15" y2="14" />
        </svg>
      </div>
    </header>
  );
};

export default Navbar;

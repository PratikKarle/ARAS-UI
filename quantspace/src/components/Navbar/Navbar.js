import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">QuantSpace</div>
      <input
        type="text"
        className="large-search"
        placeholder="Search for projects, teams, or tasks..."
      />
      <div className="profile-icon">👤</div>
    </header>
  );
};

export default Navbar;

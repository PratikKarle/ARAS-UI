import {React, useState} from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        onSearch(value); // Pass the search term to the parent component for filtering
      };

      
  return (
    <header className="navbar">
       <Link to="/home" className="logo">QuantSpace</Link>
      <input
        type="text"
        className="large-search"
        placeholder="Search for projects, teams, or tasks..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="profile-icon"><svg
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
        <circle cx="12" cy="8" r="4" />
        <path d="M12 14c-4.418 0-8 2.686-8 6v2h16v-2c0-3.314-3.582-6-8-6z" />
    </svg></div>
    </header>
  );
};

export default Navbar;
import {React, useState} from "react";
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
      <div className="logo">QuantSpace</div>
      <input
        type="text"
        className="large-search"
        placeholder="Search for projects, teams, or tasks..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="profile-icon">👤</div>
    </header>
  );
};

export default Navbar;

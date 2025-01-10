// Install dependencies if needed: npm install react-icons
import React from "react";
import "./HomePage.css";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <header className="header">
        <div className="logo">QuantSpace</div>
        <input
          type="text"
          className="quick-search"
          placeholder="Quick Search..."
        />
        <div className="profile-icon">👤</div>
      </header>

      <div className="content">
        <section className="section">
          <h2>Project Management</h2>
          <div className="card-container">
            <div className="card">Projects</div>
            <div className="card">Project Template</div>
            <div className="card">Demand</div>
            <div className="card">PB</div>
          </div>
        </section>

        <section className="section">
          <h2>Change Management</h2>
          <div className="card-container">
            <div className="card">ECO</div>
            <div className="card">MCO</div>
            <div className="card">DCO</div>
            <div className="card">PECO</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SplashScreen;
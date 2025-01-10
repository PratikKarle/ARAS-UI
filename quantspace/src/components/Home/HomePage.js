import React, { useState } from "react";
import "./HomePage.css";

const SplashScreen = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="splash-screen">
      <header className="header">
        <div className="logo">QuantSpace</div>
        <input
          type="text"
          className="large-search"
          placeholder="Search for projects, teams, or tasks..."
        />
        <div className="profile-icon">👤</div>
      </header>

      <div className="content">
      <section className="section administrator">
          <h2 className="section-header">Administrator</h2>
          <div className="scroll-container">
            <div className="card" onClick={() => toggleCard("projects")}>
              <h2>Projects</h2>
              <img src="./assets/Project.svg" alt="Projects Icon" className="card-icon" />
              <div className="hover-message">Manage all your projects here.</div>
            </div>
            <div className="card" onClick={() => toggleCard("template")}>
              <h2>Templates</h2>
              <img src="./assets/ProjectTemplate.svg" alt="Template Icon" className="card-icon" />        
              <div className="hover-message">Create and manage Project templates.</div>
            </div>
            <div className="card" onClick={() => toggleCard("demand")}>
              <h2>Demand</h2>
              <img src="./assets/demand-icon.svg" alt="Demand Icon" className="card-icon" />
              <div className="hover-message">Manage project demands.</div>
            </div>
            <div className="card" onClick={() => toggleCard("pb")}>
              <h2>PB</h2>
              <img src="./assets/pb-icon.svg" alt="PB Icon" className="card-icon" />
              <div className="hover-message">Manage product backlog items.</div>
            </div>
          </div>
        </section>

        <section className="section project-management">
          <h2 className="section-header">Project Management</h2>
          <div className="scroll-container">
            <div className="card" onClick={() => toggleCard("projects")}>
              <h2>Projects</h2>
              <img src="./assets/Project.svg" alt="Projects Icon" className="card-icon" />
              <div className="hover-message">Manage all your projects here.</div>
            </div>
            <div className="card" onClick={() => toggleCard("template")}>
              <h2>Templates</h2>
              <img src="./assets/ProjectTemplate.svg" alt="Template Icon" className="card-icon" />        
              <div className="hover-message">Create and manage Project templates.</div>
            </div>
            <div className="card" onClick={() => toggleCard("demand")}>
              <h2>Demand</h2>
              <img src="./assets/demand-icon.svg" alt="Demand Icon" className="card-icon" />
              <div className="hover-message">Manage project demands.</div>
            </div>
            <div className="card" onClick={() => toggleCard("pb")}>
              <h2>PB</h2>
              <img src="./assets/pb-icon.svg" alt="PB Icon" className="card-icon" />
              <div className="hover-message">Manage product backlog items.</div>
            </div>
          </div>
        </section>

        <section className="section change-management">
          <h2 className="section-header">Change Management</h2>
          <div className="scroll-container">
            <div className="card" onClick={() => toggleCard("eco")}>
              <h2>ECO</h2>
              <img src="./assets/ExpressECO.svg" alt="ECO Icon" className="card-icon" />
              <div className="hover-message">Manage Engineering Change Orders.</div>
            </div>
            <div className="card" onClick={() => toggleCard("ecn")}>
              <h2>ECN</h2>
              <img src="./assets/ECN.svg" alt="ECN Icon" className="card-icon" />
              <div className="hover-message">Manage Engineering Change Notices.</div>
            </div>
            <div className="card" onClick={() => toggleCard("dco")}>
              <h2>DCO</h2>
              <img src="./assets/ExpressDCO.svg" alt="DCO Icon" className="card-icon" />
              <div className="hover-message">Manage Design Change Orders.</div>
            </div>
            <div className="card" onClick={() => toggleCard("peco")}>
              <h2>PECO</h2>
              <img src="./assets/Product.svg" alt="PECO Icon" className="card-icon" />
              <div className="hover-message">Manage Product Engineering Change Orders.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SplashScreen;

import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./EditForm.css";

const EditForm = () => {
  const { itemType } = useParams(); // Dynamically get itemType from the route
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isEditable, setIsEditable] = useState(false); // Tracks whether the fields are editable
  const [openAccordion, setOpenAccordion] = useState("details");

  useEffect(() => {
    // If data is passed via state, populate formData
    if (location.state?.data) {
      setFormData(location.state.data);
    }
  }, [location.state]);

  const handleAccordionToggle = (section) => {
    setOpenAccordion((prevState) => (prevState === section ? "" : section));
  };

  const handleEditClick = () => {
    setIsEditable(true); // Allow fields to be edited
  };

  const handleDoneClick = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `http://27.107.8.194:86//Aras28New/server/odata/${itemType}('${formData.id}')`;

      // Save the updated data to the server
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      alert("Data saved successfully!");

      // Disable editing
      setIsEditable(false);

      // Update the search grid data
      navigate(`/grid/${itemType}`, { state: { updatedData: formData } });
    } catch (error) {
      alert(`Error saving data: ${error.message}`);
    }
  };

  const renderFields = () => {
    // Dynamically render form fields based on formData keys
    return Object.keys(formData)
      .filter((key) => !key.includes("@") && !key.toLowerCase().includes("odata"))
      .map((field) => (
        <div key={field} className="form-group">
          <label htmlFor={field} className="form-label">
            {field}
          </label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            className="form-input"
            disabled={!isEditable} // Disable the field if editing is not enabled
          />
        </div>
      ));
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <div className="form-header">
          <h1>Edit {itemType}</h1>
        </div>

        <div className="form-body">
          <div
            className={`accordion ${
              openAccordion === "details" ? "open" : ""
            }`}
          >
            <div
              className="accordion-header"
              onClick={() => handleAccordionToggle("details")}
            >
              <h2>Details</h2>
              <button className="accordion-toggle-button">
                {openAccordion === "details" ? "▲" : "▼"}
              </button>
            </div>
            {openAccordion === "details" && (
              <div className="accordion-content details-section">
                {Object.keys(formData).length > 0 ? (
                  <div className="form-fields">{renderFields()}</div>
                ) : (
                  <p>No data to display!</p>
                )}
              </div>
            )}
          </div>

          {/* Edit and Done Buttons */}
          <div className="submit-section">
            {!isEditable ? (
              <button
                type="button"
                className="edit-button"
                onClick={handleEditClick}
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                className="done-button"
                onClick={handleDoneClick}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;

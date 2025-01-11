import React, { useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../../config/config";
import "./CreateForm.css";

const CreateForm = () => {
  const { itemType } = useParams();
  const [activeTab, setActiveTab] = useState("Details");
  const [formData, setFormData] = useState({});
  const [isAccordionOpen, setIsAccordionOpen] = useState({
    details: true,
    files: false,
    documents: false,
  });

  // Dynamically fetch fields for the given itemType from the config
  const fields = config[itemType] || []; // Fallback to an empty array if itemType doesn't exist

  const renderFields = (fields) => {
    return fields.map(({ headerName, field }) => (
      <div key={field} className="form-group">
        <label htmlFor={field} className="form-label">
          {headerName}
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
        />
      </div>
    ));
  };

  const handleAccordionToggle = (section) => {
    setIsAccordionOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Create {itemType}</h1>
      </div>

      <div className="form-body">
        {/* Accordion for the Details Section */}
        <div className={`accordion ${isAccordionOpen.details ? "open" : ""}`}>
          <div
            className="accordion-header"
            onClick={() => handleAccordionToggle("details")}
          >
            <h2>Details</h2>
            <button className="accordion-toggle-button">
              {isAccordionOpen.details ? "▲" : "▼"}
            </button>
          </div>
          {isAccordionOpen.details && (
            <div className="accordion-content details-section">
              {fields.length > 0 ? (
                <div className="form-fields">{renderFields(fields)}</div>
              ) : (
                <p>No fields available for {itemType}!</p>
              )}
            </div>
          )}
        </div>

        {/* Accordion for File Upload Section */}
        <div className={`accordion ${isAccordionOpen.files ? "open" : ""}`}>
          <div
            className="accordion-header"
            onClick={() => handleAccordionToggle("files")}
          >
            <h2>File Upload</h2>
            <button className="accordion-toggle-button">
              {isAccordionOpen.files ? "▲" : "▼"}
            </button>
          </div>
          {isAccordionOpen.files && (
            <div className="accordion-content file-section">
              <div className="file-upload">
                <p>Drag and Drop files here or click to upload</p>
                <input type="file" className="file-input" />
              </div>
            </div>
          )}
        </div>

        {/* Accordion for Documents Section */}
        <div className={`accordion ${isAccordionOpen.documents ? "open" : ""}`}>
          <div
            className="accordion-header"
            onClick={() => handleAccordionToggle("documents")}
          >
            <h2>Documents</h2>
            <button className="accordion-toggle-button">
              {isAccordionOpen.documents ? "▲" : "▼"}
            </button>
          </div>
          {isAccordionOpen.documents && (
            <div className="accordion-content documents-section">
              <p>No documents added yet!</p>
            </div>
          )}
        </div>

        {/* Submit Button Section */}
        <div className="submit-section">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;

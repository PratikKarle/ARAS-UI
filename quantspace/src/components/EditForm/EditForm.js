import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./EditForm.css";
import LifeCycleMap from "../LifeCycle/LifeCycleMap";

const EditForm = () => {
  const { itemType } = useParams(); // Dynamically get itemType from the route
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [isEditable, setIsEditable] = useState(false); // Tracks whether the fields are editable
  const [openAccordion, setOpenAccordion] = useState("details");
  const [odataInfo, setOdataInfo] = useState(null); // Store dynamic `itemId`

  useEffect(() => {
    // If data is passed via state, populate formData
    if (location.state?.data) {
      setFormData(location.state.data);

      // Extract `itemId` from `@odata.id`
      const odataId = location.state.data["@odata.id"];
      if (odataId) {
        const match = odataId.match(/([^/]+)\('([^']+)'\)$/);
        if (match) {
          const [_, extractedItemType, itemId] = match;
          setOdataInfo({ itemType: extractedItemType, itemId });
        }
      }
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
      const odataId = formData["@odata.id"];

      if (!odataId) throw new Error("Missing @odata.id in formData.");

      // Extract itemtype and id from the @odata.id
      const match = odataId.match(/([^/]+)\('([^']+)'\)$/);
      if (!match) throw new Error("Invalid @odata.id format.");
      const [_, itemtype, id] = match;

      // Construct the URL for the PATCH request
      const url = `/Aras28New/server/odata/${itemtype}('${id}')`;
      // Prepare the payload by filtering out keys starting with "@"
      const payload = Object.fromEntries(
        Object.entries(formData).filter(([key]) => !key.startsWith("@"))
      );

      // Make the PATCH request
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Failed to save data: ${response.status}`);
      }

      alert("Data saved successfully!");
      setIsEditable(false);
    } catch (error) {
      alert(`Error saving data: ${error.message}`);
    }
  };

  const renderFields = () => {
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
            disabled={!isEditable}
          />
        </div>
      ));
  };

  const renderLifeCycleMap = () => {
    if (!odataInfo || !["Life Cycle Map", "Part"].includes(itemType)) {
      return null;
    }
    const lifeCycleItemId = itemType === "Part" ? "E337EBF706FA4172B2CD1A6487E00875" : odataInfo.itemId;
    return (
      <div className="lifecycle-map">
        <h2>Life Cycle Map</h2>
        <div className="state-section">
          <LifeCycleMap
            baseUrl="/Aras28New"
            itemId={lifeCycleItemId}
            expandState="Life Cycle State"
            expandTransition="Life Cycle Transition"
          />
        </div>
      </div>
    );
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
            className={`accordion ${openAccordion === "details" ? "open" : ""}`}
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

          {renderLifeCycleMap()}

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

import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './GridView.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { themeAlpine } from 'ag-grid-community';
import Navbar from "../Navbar/Navbar";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const myTheme = themeAlpine.withParams({
  spacing: 12,
  accentColor: 'red',
});

const columnDefs = [
  { headerName: "ID", field: "id" },
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "Body", field: "body", flex: 1 },
];

const defaultColDef = {
  filter: "agTextColumnFilter",
  floatingFilter: true,
};

export const Grid = () => {
  const [data, setData] = useState([]); // Use state to store the grid data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data on component mount
  const fetchData = async () => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage (or use cookies/session)
    const url = "http://localhost/Aras28New/server/odata/Part"; // API URL

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      // Handle response status
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result.value); // assuming response has a 'value' key with the array of data
      setLoading(false); // Data fetched, set loading to false
    } catch (err) {
      setError(err.message); // Set error state
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to call fetchData once on component mount
console.log(data);
  // onGridReady is for grid-specific operations  
  const onGridReady = (params) => {
    console.log("grid is ready");
    fetch(data)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        params.api.applyTransaction({ add: resp }); // Apply fetched data to grid
      });
  };

  // Display loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Navbar />
      <AgGridReact
        className="custom-theme"
        columnDefs={columnDefs}
        rowData={data} // Bind the fetched data to the grid
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        onGridReady={onGridReady} // onGridReady callback
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        theme={myTheme}
      />
    </div>
  );
};

export default Grid;

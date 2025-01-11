import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import './GridView.css';
import config from '../../config/config';
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
  const [columnDefs, setColumnDefs] = useState([]); // State to store column definitions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { itemType } = useParams();

  // Fetch data on component mount
  const fetchData = async () => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage (or use cookies/session)
    const fieldHeaderMap = config[itemType];
 
    const fieldNames = fieldHeaderMap.map((column) => column.field);
  
      // Construct the $select query string with the field names
      const selectQuery = `$select=${fieldNames.join(',')}`; // Join the field names with commas
    
      const urlBase = `http://27.107.8.194:86//Aras28New/server/odata/${itemType}`; // API URL
      // Construct the full URL with the $select query
      const url = `${urlBase}?${selectQuery}`;
      console.log(url)

    // const url = `http://27.107.8.194:86//Aras28New/server/odata/${itemType}`; // API URL

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
      if (result.value && result.value.length > 0) {
        const keys = Object.keys(result.value[0]); // Extract keys from the first object
        const dynamicColumns = keys
        .filter((key) => key !== '@odata.id').map((key) => ({
          headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header name
          field: key,
          flex: 1,
        }));
        setColumnDefs(dynamicColumns); // Set dynamic column definitions
      }
      setData(result.value); // assuming response has a 'value' key with the array of data
      setLoading(false); // Data fetched, set loading to false
    } catch (err) {
      setError(err.message); // Set error state
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemType]);// Empty dependency array to call fetchData once on component mount
  console.log(data);

 const onGridReady = (params) => {
};
  // Display loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Navbar />
      <div
        style={{
          width: "100%",
          height: "100%", // Enable horizontal scrolling for wide tables
        }}
      >
      <AgGridReact
        className="custom-theme"
        columnDefs={columnDefs}
        rowData={data} // Bind the fetched data to the grid
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        onGridReady={onGridReady} 
        domLayout="autoHeight" 
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        theme={myTheme}
      />
    </div>
    </div>
  );
};

export default Grid;
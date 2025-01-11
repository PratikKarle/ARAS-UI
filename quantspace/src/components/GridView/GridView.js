import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import './GridView.css';
import config from '../../config/config';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Navbar from '../Navbar/Navbar';
import ShimmerUI from '../Shimmer';

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef = {
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  resizable: true, // Columns are resizable
  sortable: true,  // Columns are sortable
  width: 150,
  minWidth: 150,
};

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const Grid = () => {
  const [data, setData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { itemType } = useParams();

  const fetchData = async () => {
    const token = localStorage.getItem('authToken');
    const fieldHeaderMap = config[itemType];
    const fieldNames = fieldHeaderMap.map((column) => column.field);
    const selectQuery = `$select=${fieldNames.join(',')}`;
    const urlBase = `http://27.107.8.194:86//Aras28New/server/odata/${itemType}`;
    const url = `${urlBase}?${selectQuery}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      if (result.value && result.value.length > 0) {
        const keys = Object.keys(result.value[0]);
        const dynamicColumns = keys
        .filter((key) => !key.includes('@') && !key.toLowerCase().includes('odata'))
          .map((key) => ({
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            field: key,
            // width: 180, // Set a default column width
            // maxWidth: 200, // Ensure columns don't exceed this width
            flex: 1,
          }));
        setColumnDefs(dynamicColumns);
      }
      setData(result.value);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemType]);

  if (loading) {
    return (
      <div className="loading-container">
        (<ShimmerUI/>)
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid-page">
      <Navbar />
      <div className="grid-container">
        <h1>{itemType} Data</h1>
        <div className="ag-grid-wrapper">
          <AgGridReact
            className="custom-grid"
            columnDefs={columnDefs}
            rowData={data}
            defaultColDef={defaultColDef}
            rowSelection={rowSelection}
            domLayout="autoHeight"
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default Grid;

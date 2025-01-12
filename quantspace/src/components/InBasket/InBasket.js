import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './InBasket.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Navbar from '../Navbar/Navbar';

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef = {
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  resizable: true,
  sortable: true,
};

export const InBasket = () => {
  const [data, setData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const  itemType  = 'InBasket Task'

  const fetchData = async () => {
    const username = localStorage.getItem('username');

    const url = `http://localhost:5258/api/login/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Required for JSON body
        },
        body: JSON.stringify({ username: username }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      if (result.value && result.value.length > 0) {
        const keys = Object.keys(result.value[0]);
        const dynamicColumns = keys
          .filter((key) => key !== '@odata.id')
          .map((key) => ({
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            field: key,
            width: 150,
            flex: 1,
          }));
        setColumnDefs(dynamicColumns);
        setData(result.value);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemType]);

  const onRowSelected = (event) => {
    setSelectedItem(event.data);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading data, please wait...</p>
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
      <div className="grid-content">
        <div className="grid-container">
          <AgGridReact
            className="custom-grid"
            columnDefs={columnDefs}
            rowData={data}
            defaultColDef={defaultColDef}
            rowSelection="single"
            onRowClicked={onRowSelected}
            domLayout="autoHeight"
            pagination={true}
            paginationPageSize={10}
          />
        </div>
        <div className="details-panel">
          {selectedItem ? (
            <>
              <div className="details-header">
                <h2>{'InBasket Task'}</h2>
              </div>
              <div className="details-content">
                {Object.keys(selectedItem).map((key) => (
                  key.toLowerCase().includes('image') ? (
                    <img
                      key={key}
                      src={selectedItem[key] || 'placeholder.png'}
                      alt="Preview"
                      className="preview-image"
                    />
                  ) : (
                    <p key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {selectedItem[key] || 'N/A'}
                    </p>
                  )
                ))}
              </div>
            </>
          ) : (
            <p>Select an item to view its details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InBasket;
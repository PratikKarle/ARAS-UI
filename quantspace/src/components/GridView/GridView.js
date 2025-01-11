import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import './GridView.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { themeBalham,themeQuartz,themeAlpine } from 'ag-grid-community';
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

const columnDefs= [
  { headerName: "ID", field: "id",},
  { headerName: "Name", field: "name",}, 
  {headerName: "Email",field: "email",},
  { headerName: "Body", field: "body" ,flex: 1},
  ]
const rowData= [
  { name: "Rahul", id: 19, email: 9876543210, body:2001}, 
  { name: "David", id: 17, email: 9827654310,body:2003}, 
  { name: "Dan", id: 25, email: 9765438210,body:1995 }]

const defaultColDef={
  filter: "agTextColumnFilter",
  floatingFilter:true
}

const onGridReady=(params)=>{
  console.log("grid is ready")
  fetch("https://jsonplaceholder.typicode.com/comments").then(resp=>resp.json())
  .then(resp=>{console.log(resp)
    params.api.applyTransaction({add:resp})})
}

export const Grid=()=>{
 
  return (
      <div style={{ height: 647, width: "100%" }} >
        <Navbar/>
        <AgGridReact
            className="custom-theme"
            columnDefs={columnDefs}
            // rowData={rowData}
            defaultColDef={defaultColDef}
            rowSelection={rowSelection}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
            theme={myTheme}
            >
        </AgGridReact>
      </div>
  );
}

export default Grid;
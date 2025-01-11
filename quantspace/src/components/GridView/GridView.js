import React from 'react';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { themeBalham,themeQuartz,themeAlpine } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const myTheme = themeQuartz.withParams({
  spacing: 12,
  accentColor: 'red',
});

const columnDefs= [
  { headerName: "ID", field: "id",},
  { headerName: "Name", field: "name",}, 
  {headerName: "Email",field: "email",},
  { headerName: "Body", field: "body" },
  ]
const rowData= [
  { name: "Rahul", age: 19, phoneNumber: 9876543210, birthYear:2001}, 
  { name: "David", age: 17, phoneNumber: 9827654310,birthYear:2003}, 
  { name: "Dan", age: 25, phoneNumber: 9765438210,birthYear:1995 }]

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
      <div style={{ height: 500 }}>
        <div style={{height: 50}}></div>
        <AgGridReact
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
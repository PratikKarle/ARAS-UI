const config = {
    token_url: "http://27.107.8.194:86/Aras28New/",
    ECN: [
        { headerName: "ECN Number", field: "item_number" },
        { headerName: "Title", field: "title" },
        { headerName: "Priority", field: "priority" },
        { headerName: "Status", field: "state" },
        { headerName: "Release Date", field: "release_date" },
        { headerName: "Created On", field: "created_on" },
    ],
    ItemType : [
        { headerName: "Name", field: "name" },
        { headerName: "Singular Label", field: "label" },
        { headerName: "Plural Label", field: "label_plural" },
        { headerName: "Allow Private Permissions", field: "allow_private_permission" },
        { headerName: "Core", field: "core" },
        { headerName: "Description", field: "description" },
        { headerName: "Help Item", field: "help_item" },
        { headerName: "Help Url", field: "help_url" },
        { headerName: "History Template", field: "history_template" },
        { headerName: "Dependent", field: "is_dependent" },
        { headerName: "Relationship", field: "is_relationship" },
        { headerName: "Versionable", field: "is_versionable" },
        { headerName: "MaxRecords", field: "maxrecords" },
        { headerName: "Use Src Access", field: "use_src_access" },
      ],
      Part : [
        { headerName: "Name", field: "name" },
        { headerName: "Singular Label", field: "label" },
        { headerName: "Plural Label", field: "label_plural" },
        { headerName: "Allow Private Permissions", field: "allow_private_permission" },
        { headerName: "Item Number", field: "item_number" },
        { headerName: "Description", field: "description" },
        { headerName: "Current State", field: "current_state" },
        { headerName: "Relationship", field: "is_relationship" },
        { headerName: "Versionable", field: "is_versionable" },
        { headerName: "MaxRecords", field: "maxrecords" },
      ],  
      
  };
  
  export default config;
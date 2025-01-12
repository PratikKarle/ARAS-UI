const config = {
    token_url: "http://27.107.8.194:86/Aras28New/",
    "ECN": [
        { headerName: "ECN Number", field: "item_number" },
        { headerName: "Title", field: "title" },
        { headerName: "Priority", field: "priority" },
        { headerName: "Status", field: "state" },
        { headerName: "Release Date", field: "release_date" },
        { headerName: "Created On", field: "created_on" },
    ],
    "Express ECO": [
        { headerName: "Item Number", field: "item_number" },
        { headerName: "Title", field: "title" },
        { headerName: "Description", field: "description" },
        { headerName: "State", field: "state" },
        { headerName: "Change Reason", field: "change_reason" },
    ],
    "Express DCO": [
        { headerName: "Item Number", field: "item_number" },
        { headerName: "Title", field: "title" },
        { headerName: "Description", field: "description" },
        { headerName: "State", field: "state" },
        { headerName: "Change Reason", field: "change_reason" },
    ],
    "ItemType" : [
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
    "Life Cycle Map": [
        { headerName: "Name", field: "name" },
        { headerName: "Description", field: "description" },
    ],
    "User": [
        { headerName: "Login Name", field: "login_name" },
        { headerName: "First Name", field: "first_name" },
        { headerName: "Last Name", field: "last_name" },
    ],
    "Part": [
        { headerName: "Item Number", field: "item_number" },
        { headerName: "Name", field: "name" },
        { headerName: "Description", field: "description" },
        { headerName: "State", field: "state" },
        { headerName: "Classification", field: "classification" },
    ],
    "Product": [
        { headerName: "Item Number", field: "item_number" },
        { headerName: "Name", field: "name" },
        { headerName: "Description", field: "description" },
        { headerName: "State", field: "current_state" },
    ],
    "Project": [
        { headerName: "Project Number", field: "project_number" },
        { headerName: "Name", field: "name" },
        { headerName: "Scheduled Start", field: "date_start_sched" },
        { headerName: "Scheduled Due", field: "date_due_sched" },
    ],
    InBasketTask: [
        { headerName: "Assigned To", field: "assigned_to" },
        { headerName: "Source Item", field: "container" },
        { headerName: "Due Date", field: "due_date" },
        { headerName: "Instructions", field: "instructions" },
        { headerName: "Work Item", field: "item" },
        { headerName: "Type", field: "itemtype" },
        { headerName: "My Assignment", field: "my_assignment" },
        { headerName: "Activity", field: "name" },
        { headerName: "Start Date", field: "start_date" },
        { headerName: "Status", field: "status" },
    ],
    "Identity": [
    ],
    "cui_Dashboard": [
    ],
    "Project Template": [
    ],
    "xPropertyContainerItem": [
    ],
  };
  
  export default config;
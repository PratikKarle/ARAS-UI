import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import { tableData as defaultTableData } from './data.js';

const BOM = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]); 

  useEffect(() => {
    // Extract columns dynamically from the `related_id` keys
    const relationships = defaultTableData.Item.Relationships.Item;
    if (relationships.length > 0) {
      const relatedKeys = Object.keys(relationships[0].related_id.Item); // Keys of related parts
      // Exclude specific keys
      const excludedKeys = ['@aras.type', '@aras.typeId', '@aras.id', 'id', 'itemtype'];

      const dynamicColumns = relatedKeys
      .filter((key) => !excludedKeys.includes(key)) // Filter out excluded keys
      .map((key) => ({
        title: key.replace(/_/g, ' ').toUpperCase(),
        dataIndex: key,
        key: key,
        render: (text) => text || 'N/A', // Render `N/A` for null/undefined values
      }));

      // Add Quantity column
      dynamicColumns.push({
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (text) => text || 'N/A',
      });

      const itemNumberColumn = dynamicColumns.find(column => column.dataIndex === 'item_number');
      if (itemNumberColumn) {
        // Remove item_number column from original position and add it to the front
        const filteredColumns = dynamicColumns.filter(column => column.dataIndex !== 'item_number');
        filteredColumns.unshift(itemNumberColumn);
  
        setColumns(filteredColumns);
      }
    }

    // Build the tree structure for dataSource
    const buildTreeData = (items) => {
      return items.map((bomItem) => {
        const relatedPart = bomItem.related_id?.Item; // Safely access related_id.Item
        if (!relatedPart) {
          // console.warn('Skipping item due to missing related_id or Item:', bomItem);
          return null; // Skip if relatedPart is undefined
        }
    
        const children = relatedPart.Relationships?.Item && Array.isArray(relatedPart.Relationships.Item)
        ? buildTreeData(relatedPart.Relationships.Item) // Recursive call for valid children
        : [];
        console.log('Processing BOM Item:', bomItem);
        console.log('Related Part:', relatedPart);
        return {
          ...relatedPart, // Include all related part properties
          quantity: bomItem.quantity || 'N/A', // Add quantity field, default to 'N/A'
          key: relatedPart.id?.['#text'] || `key-${Math.random()}`, // Unique key with fallback
          children, // Attach children if any
        };
      }).filter(Boolean); // Remove null entries from the array
    };
    

    const treeData = buildTreeData(relationships);
    console.log('Final Tree Data:', treeData);
    setDataSource(treeData);

    // // Automatically expand all rows by default
    // const allKeys = getAllKeys(treeData);
    // setExpandedRowKeys(allKeys);
  }, []);

  // Function to get all keys recursively for "Expand All"
  const getAllKeys = (items) => {
    const keys = [];
    items.forEach((item) => {
      keys.push(item.key);
      if (item.children && item.children.length > 0) {
        keys.push(...getAllKeys(item.children));
      }
    });
    return keys;
  };

  // Expand all rows
  const handleExpandAll = () => {
    const allKeys = getAllKeys(dataSource);
    setExpandedRowKeys(allKeys);
  };

  // Collapse all rows
  const handleCollapseAll = () => {
    setExpandedRowKeys([]);
  };

  return (
    <div className="bom-container">
      <div className="button-container">
        <Space>
          <Button type="primary" onClick={handleExpandAll}>
            Expand All
          </Button>
          <Button onClick={handleCollapseAll}>Collapse All</Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{
          indentSize: 24, // Set the indentation for nested rows
          expandedRowKeys: expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        pagination={false} // Disable pagination for a nested structure
        rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')} // Add row classes for styling
        bordered
        size="small" 
      />
    </div>
  );
};

export default BOM;

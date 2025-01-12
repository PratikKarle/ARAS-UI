import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';

const BOM = ({ partId, itemtype }) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  console.log("partId:::",partId);
  useEffect(() => {
    // Fetch data from the API using the provided ID
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const match = partId.match(/([^/]+)\('([^']+)'\)$/);
        if (!match) throw new Error("Invalid @odata.id format.");
        const [_, itemtype, id] = match;
        console.log("match:::",match);
        console.log("partId:::",partId);
        console.log("id:::",id);
        const response = await fetch(`/Aras28New/server/odata/method.sg_PartBOM`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        console.log("response>>>>",data);

        // Process the API response and set dataSource, columns
        const relationships = data.Item.Relationships.Item;
        const relatedKeys = Object.keys(relationships[0].related_id.Item);
        const excludedKeys = ['@aras.type', '@aras.typeId', '@aras.id', 'id', 'itemtype'];

        const dynamicColumns = relatedKeys
          .filter((key) => !excludedKeys.includes(key))
          .map((key) => ({
            title: key.replace(/_/g, ' ').toUpperCase(),
            dataIndex: key,
            key: key,
            render: (text) => text || 'N/A',
          }));

        dynamicColumns.push({
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (text) => text || 'N/A',
        });

        const itemNumberColumn = dynamicColumns.find((column) => column.dataIndex === 'item_number');
        if (itemNumberColumn) {
          const filteredColumns = dynamicColumns.filter((column) => column.dataIndex !== 'item_number');
          filteredColumns.unshift(itemNumberColumn);
          setColumns(filteredColumns);
        }

        // Build the tree data structure for BOM items
        const buildTreeData = (items) => {
          return items.map((bomItem) => {
            const relatedPart = bomItem.related_id?.Item;
            if (!relatedPart) return null;

            const children = relatedPart.Relationships?.Item && Array.isArray(relatedPart.Relationships.Item)
            ? buildTreeData(relatedPart.Relationships.Item) // Recursive call for valid children
            : [];

            return {
              ...relatedPart,
              quantity: bomItem.quantity || 'N/A',
              key: relatedPart.id?.['#text'] || `key-${Math.random()}`,
              children,
            };
          }).filter(Boolean);
        };

        const treeData = buildTreeData(relationships);
        setDataSource(treeData);

      } catch (error) {
        console.error('Error fetching BOM data:', error);
      }
    };

    if (partId) {
      fetchData();
    }
  }, [partId]);

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

  const handleExpandAll = () => {
    const allKeys = getAllKeys(dataSource);
    setExpandedRowKeys(allKeys);
  };

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
          indentSize: 24,
          expandedRowKeys: expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        pagination={false}
        rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
        bordered
        size="small"
      />
    </div>
  );
};

export default BOM;

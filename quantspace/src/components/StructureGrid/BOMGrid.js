// App.js
import React, { useState } from 'react';
import './BOMGrid.css';

const BOMData = [
  {
    id: 1,
    name: 'Product A',
    children: [
      {
        id: 2,
        name: 'Part A1',
        children: [
          { id: 3, name: 'Component A1a', children: [] },
          { id: 4, name: 'Component A1b', children: [] },
        ],
      },
      { id: 5, name: 'Part A2', children: [] },
    ],
  },
  {
    id: 6,
    name: 'Product B',
    children: [
      { id: 7, name: 'Part B1', children: [] },
    ],
  },
];

const BOMRow = ({ item, level, toggleExpand, expandedRows }) => {
  const isExpanded = expandedRows.includes(item.id);

  return (
    <>
      <div
        className="bom-row"
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => toggleExpand(item.id)}
      >
        {item.children.length > 0 && (
          <span className="toggle-icon">{isExpanded ? '-' : '+'}</span>
        )}
        {item.name}
      </div>
      {isExpanded &&
        item.children.map((child) => (
          <BOMRow
            key={child.id}
            item={child}
            level={level + 1}
            toggleExpand={toggleExpand}
            expandedRows={expandedRows}
          />
        ))}
    </>
  );
};

const BOM = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bom-container">
      {BOMData.map((item) => (
        <BOMRow
          key={item.id}
          item={item}
          level={0}
          toggleExpand={toggleExpand}
          expandedRows={expandedRows}
        />
      ))}
    </div>
  );
};

export default BOM;

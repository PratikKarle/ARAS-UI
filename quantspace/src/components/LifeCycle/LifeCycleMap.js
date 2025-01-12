import React, { useState, useEffect } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

const LifeCycleMap = ({ baseUrl, itemId, expandState, expandTransition }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const fetchLifecycleData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch Life Cycle State data
        const stateUrl = `/Aras28New/server/odata/Life Cycle Map('${itemId}')?$expand=${expandState}`;
        const stateResponse = await fetch(stateUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!stateResponse.ok) {
          throw new Error(`Failed to fetch lifecycle state data: ${stateResponse.status}`);
        }

        const stateData = await stateResponse.json();
        const states = stateData[expandState] || [];

        // Map states to nodes
        const mappedNodes = states.map((state) => ({
          id: state.id,
          data: { label: state.label || state.name },
          position: { x: state.x, y: state.y },
        }));

        // Fetch Life Cycle Transition data
        const transitionUrl = `/Aras28New/server/odata/Life Cycle Map('${itemId}')?$expand=${expandTransition}`;
        console.log(transitionUrl);
        const transitionResponse = await fetch(transitionUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!transitionResponse.ok) {
          throw new Error(`Failed to fetch lifecycle transition data: ${transitionResponse.status}`);
        }

        const transitionData = await transitionResponse.json();
        const transitions = transitionData[expandTransition] || [];

        // Map transitions to edges
        const mappedEdges = transitions.map((transition) => ({
          id: `e${transition.id}`,
          source: transition.sourceStateId,
          target: transition.targetStateId,
          animated: true,
          label: transition.keyed_name, // Optionally, add transition label
        }));

        // Set the fetched nodes and edges
        setNodes(mappedNodes);
        setEdges(mappedEdges);
      } catch (error) {
        console.error("Error fetching lifecycle data:", error);
      }
    };

    fetchLifecycleData();
  }, [baseUrl, itemId, expandState, expandTransition]);

  const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ height: "400px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default LifeCycleMap;

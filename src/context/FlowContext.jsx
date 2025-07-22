import { useEffect, createContext, useContext, useState } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";

const initialNodes = [];

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [saveError, setSaveError] = useState(null);
  const [id, setId] = useState(0);

  useEffect(() => {
    const savedFlow = localStorage.getItem("flow-data");
    if (savedFlow) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedFlow);
      setId(savedNodes.length);
      setNodes(savedNodes || []);
      setEdges(savedEdges || []);
    }
  }, []);

  const saveFlow = () => {
    const targetIds = new Set(edges.map((edge) => edge.target));
    const nodesWithoutIncoming = nodes.filter((node) => !targetIds.has(node.id));
    if (nodes.length > 1 && nodesWithoutIncoming.length > 1) {
      console.log("Cannot save flow: Multiple nodes without incoming edges");
      setSaveError("Cannot save flow");
      setTimeout(() => {
        setSaveError(null);
      }, 3000);
      return;
    }

    const flowData = { nodes, edges };
    localStorage.setItem("flow-data", JSON.stringify(flowData));
    console.log("Flow saved to localStorage", flowData);
    setSaveError(null);
  };

  return <FlowContext.Provider value={{ nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, saveFlow, id, setId, saveError }}>{children}</FlowContext.Provider>;
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
};

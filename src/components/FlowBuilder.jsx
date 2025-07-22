import { useState, useEffect, useCallback, useRef } from "react";
import { ReactFlow, addEdge, useReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TextNode from "./TextNode";
import ImageNode from "./ImageNode";
import SettingsPanel from "./SettingsPanel";
import { useFlow, FlowContext } from "../context/FlowContext";

const nodeTypes = {
  textNode: TextNode,
  imageNode: ImageNode,
};

let id = 0;
const savedFlow = localStorage.getItem("flow-data");
if (savedFlow) {
  const { nodes: savedNodes } = JSON.parse(savedFlow);
  id = savedNodes.length || 0;
}
const getId = () => `node_${id++}`;

const FlowBuilder = () => {
  const { nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange } = useFlow();

  const { screenToFlowPosition } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      const updatedEdges = eds.filter((edge) => edge.source !== params.source);
      return addEdge(params, updatedEdges);
    });
  }, []);
  const onNodesChangeWithSelection = useCallback(
    (changes) => {
      onNodesChange(changes);
      const selected = changes.find((c) => c.selected);
      if (selected) {
        const node = nodes.find((n) => n.id === selected.id);
        if (node) setSelectedNode(node);
      }
    },
    [onNodesChange, nodes]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { content: `text message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  useEffect(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.selected) {
            return {
              ...node,
              data: {
                ...node.data,
                content: selectedNode.data.content || `test message ${node.id}`,
              },
            };
          }
          return node;
        })
      );
    } else {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.selected) {
            return {
              ...node,
              selected: false,
            };
          }
          return node;
        })
      );
    }
  }, [selectedNode]);

  useEffect(() => {
    const savedFlow = localStorage.getItem("flow-data");
    if (savedFlow) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedFlow);
      setNodes(savedNodes || []);
      setEdges(savedEdges || []);
    }
  }, []);

  return (
    <div className="flow-builder">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChangeWithSelection} onEdgesChange={onEdgesChange} onConnect={onConnect} onDrop={onDrop} onDragOver={onDragOver} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
      {selectedNode && <SettingsPanel node={selectedNode} setNode={setSelectedNode} />}
    </div>
  );
};
export default FlowBuilder;

import React from "react";
import { Handle, Position } from "@xyflow/react";

function ImageNode({ data, selected }) {
  return (
    <div className={`text-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Top} />
      <div className="image-content">Image Node</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ImageNode;

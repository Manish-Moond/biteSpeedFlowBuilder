import { MessageCircleMore } from "lucide-react";

export default function NodePanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="node-panel">
      <div className="node-item" draggable onDragStart={(event) => onDragStart(event, "textNode")}>
        <MessageCircleMore color="#4884e5" />
        <p>Text Node</p>
      </div>
    </div>
  );
}

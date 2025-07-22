import { Handle, Position } from "@xyflow/react";
import { MessageCircleMore } from "lucide-react";
import whatsappLogo from "../assets/whatsapp.svg";
import "../App.css";

const TextNode = ({ data, selected }) => {
  console.log(data, selected, "selected nodes");

  return (
    <div className={`text-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Left} />
      <div className="text-node-header">
        <MessageCircleMore color="#4884e5" className="message-icon" />
        <p>Send Message</p>
        <img src={whatsappLogo} alt="WhatsApp Logo" className="whatsapp-logo" />
      </div>
      <div className="text-node-content">
        <p>{data.content}</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TextNode;

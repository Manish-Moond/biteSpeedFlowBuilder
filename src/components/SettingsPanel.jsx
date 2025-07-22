import { ArrowLeft } from "lucide-react";

function SettingsPanel({ node, setNode }) {
  console.log("SettingsPanel for node:", node);

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <ArrowLeft onClick={() => setNode(null)} className="close-button" />
        <p>Message</p>
      </div>
      <div className="settings-content">
        <p>Text</p>
        <textarea
          name="message"
          id=""
          value={node.data.content}
          onChange={(e) => {
            const newContent = e.target.value;
            setNode((prevNode) => ({
              ...prevNode,
              data: {
                ...prevNode.data,
                content: newContent,
              },
            }));
          }}
        />
      </div>
    </div>
  );
}

export default SettingsPanel;

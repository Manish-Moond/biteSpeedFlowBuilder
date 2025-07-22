import FlowBuilder from "./components/FlowBuilder.jsx";
import Header from "./components/Header.jsx";
import NodePanel from "./components/NodePanel.jsx";
import "./App.css";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowProvider } from "./context/FlowContext.jsx";

function App() {
  return (
    <>
      <ReactFlowProvider>
        <FlowProvider>
          <Header />
          <div className="app-container">
            <FlowBuilder className="flow-builder" />
            <NodePanel className="node-panel" />
          </div>
        </FlowProvider>
      </ReactFlowProvider>
    </>
  );
}

export default App;

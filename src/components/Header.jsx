import { useFlow } from "../context/FlowContext";
export default function Header() {
  const { saveFlow, saveError } = useFlow();

  return (
    <header className="header">
      <div className="container">
        {saveError && <h4 className="warning-text">{saveError}</h4>}
        <button className="save-button" onClick={saveFlow}>
          Save changes
        </button>
      </div>
    </header>
  );
}

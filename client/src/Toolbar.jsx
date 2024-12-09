import React from "react";

function Toolbar({ addCard }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <select>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>
      <select>
        <option value="12px">12px</option>
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
      </select>
      <button>B</button>
      <button>I</button>
      <button>U</button>
      <button onClick={addCard}>Add Text</button>
    </div>
  );
}

export default Toolbar;

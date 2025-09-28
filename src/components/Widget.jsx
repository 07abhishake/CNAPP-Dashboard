// src/components/Widget.jsx
import React from "react";

const Widget = ({ widget, onRemove }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "5px 0",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <strong>{widget.name}</strong>: {widget.text}
      </div>
      <button onClick={onRemove}>❌</button>
    </div>
  );
};

export default Widget; // ✅ default export

// src/components/Navbar.jsx
import React from "react";
import { useWidgetStore } from "../store/WidgetContext";

const Navbar = () => {
  const { state, dispatch } = useWidgetStore();

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  };

  return (
    <nav
      style={{
        padding: "10px 20px",
        backgroundColor: "#f6f6f6",
        color: "#06127ecb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Title */}
      <h2 style={{ margin: 0 }}>Dashboard</h2>

      {/* Center: Search bar */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search widgets..."
          value={state.searchQuery}
          onChange={handleSearch}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "none",
            width: "300px",
          }}
        />
      </div>

      {/* Right: optional placeholder (can add icons later) */}
      <div style={{ width: "100px" }}></div>
    </nav>
  );
};

export default Navbar;

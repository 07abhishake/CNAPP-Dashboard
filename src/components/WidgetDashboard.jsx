// src/components/WidgetDashboard.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import AddWidgetForm from "./AddWidgetForm";
import { useWidgetStore } from "../store/WidgetContext";
import Category from "./Category";

Modal.setAppElement("#root");

const WidgetDashboard = () => {
  const { state } = useWidgetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const [timeFilter, setTimeFilter] = useState("Last 2 days");
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const timeOptions = ["24 hrs", "7 days", "30 days"];

  const filteredCategories = state.categories.map((cat) => {
    const filteredWidgets = cat.widgets.filter((w) =>
      w.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
    return { ...cat, filteredWidgets };
  });

  const hasAnyMatch = filteredCategories.some((cat) => cat.filteredWidgets.length > 0);

  // Sections (map to categories by name)
  const sections = [
    { id: 1, label: "CSPM ", Text:"CSPM" },
    { id: 2, label: "CWPP" },
    { id: 3, label: "Images" },
    { id: 4, label: "Ticket" },
  ];

  return (
    
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"  }}>
         <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>CNAPP Dashboard</h2>
        {/* Add Widget Button */}
        <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            right:"0",
            left:"100%",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          + Add Widget
        </button>

        {/* Sync Button */}
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#d5dcd6ff",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => alert("Syncing widgets...")}
        >
          🔄
        </button>

        {/* Vertical Three Dot Options */}
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#d5dcd6ff",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => alert("More options...")}
        >
          ⋮
        </button>

        {/* Time Filter Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0f0f0",
              color: "#000",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setIsTimeOpen(!isTimeOpen)}
          >
            {timeFilter} ▼
          </button>
          {isTimeOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "4px",
                minWidth: "120px",
                zIndex: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              {timeOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setTimeFilter(opt);
                    setIsTimeOpen(false);
                  }}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderBottom: opt !== timeOptions[timeOptions.length - 1] ? "1px solid #eee" : "none",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Add Widget Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setSelectedSection(null);
        }}
        contentLabel="Add Widget"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex: 1000 },
          content: {
            top: "0",
            right: "0",
            left: "50%",
            bottom: "0",
            height: "100%",
            width: "50%",
            position: "fixed",
            borderRadius: "0",
            padding: "0",
            border: "none",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
          },
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            backgroundColor: "#021b36ff",
            color: "#fff",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Add Widget</h3>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setSelectedSection(null);
            }}
            style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
          >
            ✖ Cancel
          </button>
        </div>

        {/* Section Tabs */}
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
            {sections.map((sec) => (
              <div
                key={sec.id}
                onClick={() => setSelectedSection(sec.label)}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderBottom:
                    selectedSection === sec.label
                      ? "3px solid #007bff"
                      : "3px solid transparent",
                  fontWeight: selectedSection === sec.label ? "600" : "400",
                  color: selectedSection === sec.label ? "#007bff" : "#000",
                  transition: "all 0.2s",
                }}
              >
                {sec.label}
              </div>
            ))}
          </div>

          {/* Render AddWidgetForm for selected section */}
          {selectedSection && (
            <div>
              <AddWidgetForm
                onClose={() => {
                  setIsModalOpen(false);
                  setSelectedSection(null);
                }}
                categoryName={selectedSection}
              />
            </div>
          )}
          
        </div>
      </Modal>

      {/* Render Categories */}
      {!hasAnyMatch ? (
        <p>No results found</p>
      ) : (
        filteredCategories.map((cat) => <Category key={cat.id} category={cat} />)
      )}
    </div>
  );
};

export default WidgetDashboard;

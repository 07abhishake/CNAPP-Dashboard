import React, { useState } from "react";
import { useWidgetStore } from "../store/WidgetContext";

const AddWidgetForm = ({ onClose, categoryName }) => {
  const { dispatch } = useWidgetStore();
  const [widgetData, setWidgetData] = useState({ name: "", text: "" });

  const handleAddWidget = (e) => {
    e.preventDefault();
    if (!widgetData.name.trim() || !widgetData.text.trim()) return;

    dispatch({
      type: "ADD_WIDGET",
      payload: {
        id: Date.now(),
        name: widgetData.name,
        text: widgetData.text,
        categoryName,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleAddWidget}
        className="bg-white p-6 rounded-2xl shadow-xl w-96 max-w-full flex flex-col h-[400px]" // full height modal
      >
        {/* Inputs */}
        <div className="flex flex-col gap-4 flex-grow">
          <input
            type="text"
            placeholder="Widget Name"
            value={widgetData.name}
            onChange={(e) => setWidgetData({ ...widgetData, name: e.target.value })}
            className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg leading-relaxed"
          />
          <input
            type="text"
            placeholder="Widget Text"
            value={widgetData.text}
            onChange={(e) => setWidgetData({ ...widgetData, text: e.target.value })}
            className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg leading-relaxed"
          />
        </div>

        {/* Buttons always at bottom */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWidgetForm;

import React from "react";
import { useWidgetStore } from "../store/WidgetContext";
import Widget from "./Widget";

const Category = ({ category }) => {
  const { dispatch } = useWidgetStore();

  const handleRemoveWidget = (widgetId) => {
    dispatch({
      type: "REMOVE_WIDGET",
      payload: { categoryId: category.id, widgetId },
    });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
      {category.widgets.length === 0 ? (
        <p className="text-gray-500">No widgets in this category</p>
      ) : (
        category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={() => handleRemoveWidget(widget.id)}
          />
        ))
      )}
    </div>
  );
};

export default Category;

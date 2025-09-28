// src/store/WidgetContext.jsx
import React, { createContext, useReducer, useContext } from "react";
import dashboardData from "../data/dashboard.json";

const WidgetContext = createContext();

const initialState = {
  categories: dashboardData, // categories loaded from JSON
  searchQuery: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_WIDGET":
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.name === action.payload.categoryName
            ? { ...cat, widgets: [...cat.widgets, action.payload] }
            : cat
        ),
      };

    case "REMOVE_WIDGET":
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                widgets: cat.widgets.filter((w) => w.id !== action.payload.widgetId),
              }
            : cat
        ),
      };

    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}

export const WidgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WidgetContext.Provider value={{ state, dispatch }}>
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidgetStore = () => useContext(WidgetContext);

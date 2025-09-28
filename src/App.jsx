import React from "react"; // remove useState
import { WidgetProvider } from "./store/WidgetContext";
import Navbar from "./components/Navbar";
import WidgetDashboard from "./components/WidgetDashboard";
// import WidgetList from "./components/WidgetList"; // Uncomment if you have WidgetList.jsx

function App() {
  return (
    <WidgetProvider>
      
      <Navbar />
      <WidgetDashboard />
    </WidgetProvider>
  );
}

export default App;

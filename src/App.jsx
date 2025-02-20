import React, { useState } from "react";
import Translator from "./Translator";
import Summarizer from "./Summarizer";
import "./App.css";

function App() {
  // Translator remains the default view.
  const [activeView, setActiveView] = useState("translator");

  return (
    <div className="app-container">
      {/* Toggle Buttons (swapped order: Translator first, then Summarizer) */}
      <div className="toggle-container">
        <button
          className={activeView === "translator" ? "active" : ""}
          onClick={() => setActiveView("translator")}
        >
          Translator
        </button>
        <button
          className={activeView === "summarizer" ? "active" : ""}
          onClick={() => setActiveView("summarizer")}
        >
          Summarizer
        </button>
      </div>

      {/* Render component based on active view */}
      <div className="component-container">
        {activeView === "translator" && <Translator />}
        {activeView === "summarizer" && <Summarizer />}
      </div>
    </div>
  );
}

export default App;

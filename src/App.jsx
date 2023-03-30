import React from "react";
import "./App.css";
import { Canvas, ElementPanel, Topbar } from "./components";

const App = () => {
  return (
    <div className="app">
      <Topbar />
      <div className="container">
        <Canvas />
        <ElementPanel />
      </div>
    </div>
  );
};

export default App;

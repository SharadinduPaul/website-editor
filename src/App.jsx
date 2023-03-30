import React from "react";
import "./App.css";
import { Canvas, ElementPanel, Topbar } from "./components";
import { ElementContext } from "./utils/context";
import { elementReducer } from "./utils/reducer";

const App = () => {
  const [elements, dispatch] = React.useReducer(elementReducer, []);

  React.useEffect(() => {
    console.log(elements);
  }, [elements]);
  return (
    <ElementContext.Provider value={{ elements, dispatch }}>
      <div className="app">
        <Topbar />
        <div className="container">
          <Canvas />
          <ElementPanel />
        </div>
      </div>
    </ElementContext.Provider>
  );
};

export default App;

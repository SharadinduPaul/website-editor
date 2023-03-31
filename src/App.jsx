import React from "react";
import "./App.css";
import { Canvas, ElementPanel, Topbar } from "./components";
import { ElementContext } from "./utils/context";
import { debounce } from "./utils/debounce";
import { elementReducer } from "./utils/reducer";
import { getLocalData, setLocalData } from "./utils/storageProvider";

const App = () => {
  const [elements, dispatch] = React.useReducer(
    elementReducer,
    getLocalData() ?? []
  );

  //debouncing the expensive localStorage action
  const debouncedSaveData = React.useCallback(
    debounce((e) => setLocalData(e), 1000),
    []
  );

  //this will save the element data to local storage
  React.useEffect(() => {
    debouncedSaveData(elements);
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

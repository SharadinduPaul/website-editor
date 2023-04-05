import React from "react";
import { Element } from "..";
import { ElementContext } from "../../utils/context";
import "./styles.css";

export const Canvas = () => {
  const { elements, dispatch } = React.useContext(ElementContext);

  const canvasRef = React.useRef(null);
  return (
    <div className={`canvas-main`} ref={canvasRef}>
      <div className="element-container">
        {elements?.map((item, index) => (
          <Element
            key={item?.id}
            id={item?.id}
            varient={item?.type?.toLowerCase()}
            top={item?.top}
            left={item?.left}
            zIndex={index + 1}
            ref={canvasRef}
          />
        ))}
      </div>
    </div>
  );
};

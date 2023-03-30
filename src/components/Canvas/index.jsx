import React from "react";
import { Element } from "..";
import { ElementContext } from "../../utils/context";
import "./styles.css";

export const Canvas = () => {
  const { elements, dispatch } = React.useContext(ElementContext);

  return (
    <div className={`canvas-main`}>
      <div className="box"></div>
      {elements?.map((item, index) => (
        <Element
          key={index}
          id={item?.id}
          varient={item?.type?.toLowerCase()}
          top={item?.top}
          left={item?.left}
          zIndex={index + 1}
        />
      ))}
    </div>
  );
};

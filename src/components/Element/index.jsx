import React from "react";
import { ElementContext } from "../../utils/context";
import { throttle } from "../../utils/throttle";
import "./styles.css";

const blockSize = 25;

export const Element = ({
  id,
  varient = "button",
  top = "0",
  left = "0",
  zIndex = "1"
}) => {
  const [position, setPosition] = React.useState({ x: left, y: top });

  const { elements, dispatch } = React.useContext(ElementContext);

  const elementRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    dispatch({
      type: "CHANGE_ELEMENT",
      payload: {
        id: id,
        top:
          ((e.clientY - 60 - offsetRef.current.y) / blockSize).toFixed(0) *
          blockSize,
        left:
          ((e.clientX - offsetRef.current.x) / blockSize).toFixed(0) * blockSize
      }
    });
  };

  const debouncedHandleMouseMove = throttle((e) => handleMouseMove(e), 100);
  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.addEventListener("mousedown", (e) => {
        //this determines if element is being resized
        if (
          elementRef.current.clientHeight - e.offsetY < 10 &&
          elementRef.current.clientWidth - e.offsetX < 10
        )
          return;
        //this stores the co-ordinated from where the element is grabbed
        offsetRef.current = {
          x: e.offsetX,
          y: e.offsetY
        };
        window.addEventListener("mousemove", debouncedHandleMouseMove);
      });
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", debouncedHandleMouseMove);
      });
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("mousedown", function () {});
      }
    };
  }, []);

  var Y =
    ((position.y - 60 - offsetRef.current.y) / blockSize).toFixed(0) *
    blockSize;
  var X =
    ((position.x - offsetRef.current.x) / blockSize).toFixed(0) * blockSize;

  const style = {
    top: Y + "px",
    left: X + "px",
    zIndex: zIndex
  };

  return varient === "button" ? (
    <button ref={elementRef} className="element" style={style}>
      Button
    </button>
  ) : varient === "text input" ? (
    <input
      ref={elementRef}
      placeholder="Type here"
      className="element"
      type="text"
      style={style}
    />
  ) : null;
};

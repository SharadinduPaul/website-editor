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
  zIndex = "1",
  options = ["first", "second", "third"]
}) => {
  const [position, setPosition] = React.useState({ x: left, y: top });
  const [option, setOption] = React.useState("");

  const { dispatch } = React.useContext(ElementContext);

  const elementRef = React.useRef(null);

  //this keeps track of the position where the element was grabbed from
  const offsetRef = React.useRef({ x: 0, y: 0 });

  //this runs each time a mousemove event is fired
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    dispatch({
      type: "CHANGE_ELEMENT",
      payload: {
        id: id,
        top:
          ((e.clientY - offsetRef.current.y) / blockSize).toFixed(0) *
          blockSize,
        left:
          ((e.clientX - offsetRef.current.x) / blockSize).toFixed(0) * blockSize
      }
    });
  };

  //throttled version of the handleMouseMove function
  const throttledMouseMove = throttle((e) => handleMouseMove(e), 200);

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
        //event: mousemove while mousedown
        window.addEventListener("mousemove", throttledMouseMove);
      });
      //event: mouseup
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", throttledMouseMove);
      });
    }

    //to remove the event listener when unmounted
    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("mousedown", function () {});
      }
    };
  }, []);

  // cannot explain these... too much
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

  return (
    <div className="element" style={style}>
      {varient === "button" ? (
        <button ref={elementRef}>Button</button>
      ) : varient === "text input" ? (
        <input ref={elementRef} placeholder="Type here" type="text" />
      ) : varient == "dropdown" ? (
        <>
          <div className="dropdown" ref={elementRef}>
            {option ? option : "Select an option"}
          </div>
          <div className="options">
            {options.map((option, index) => {
              return (
                <button key={index} onClick={() => setOption(option)}>
                  {option}
                </button>
              );
            })}
          </div>
        </>
      ) : varient === "table" ? (
        <div className="table" ref={elementRef}>
          <p className="head">Name</p>
          <p className="head">Age</p>
          <p className="cell">Sharadindu Paul</p>
          <p className="cell">21</p>
          <p className="cell">Narendra Modi</p>
          <p className="cell">72</p>
        </div>
      ) : null}
      <div
        className="close"
        onClick={() =>
          dispatch({
            type: "REMOVE_ELEMENT",
            payload: { id: id }
          })
        }
      >
        X
      </div>
    </div>
  );
};

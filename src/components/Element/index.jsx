import React, { useMemo } from "react";
import { ElementContext } from "../../utils/context";
import { throttle } from "../../utils/throttle";
import "./styles.css";
import { debounce } from "../../utils/debounce";

const blockSize = 25;

export const Element = React.forwardRef(
  (
    {
      id,
      varient = "button",
      top = "0",
      left = "0",
      zIndex = "1",
      options = ["first", "second", "third"]
    },
    ref
  ) => {
    const [position, setPosition] = React.useState({ x: left, y: top });
    const [option, setOption] = React.useState("");
    const [headerName, setHeaderName] = React.useState("");
    const [headerKey, setHeaderKey] = React.useState("");

    const [tableData, setTableData] = React.useState([
      {
        name: "John",
        age: "25"
      },
      {
        name: "Sharadindu Paul",
        age: "25"
      }
    ]);
    const [tableHeadData, setTableHeadData] = React.useState({
      name: "Name",
      age: "Age"
    });

    const table_headers = React.useMemo(
      () => Object.keys(tableHeadData),
      [tableHeadData]
    );

    const { dispatch, setCssProps, cssProps } =
      React.useContext(ElementContext);

    const elementRef = React.useRef(null);

    //this keeps track of the position where the element was grabbed from
    const offsetRef = React.useRef({ x: 0, y: 0 });

    const canvasSize = React.useRef({ x: 0, y: 0 });

    const addHeader = (data) => {
      setTableHeadData((prev) => ({ ...prev, ...data }));
    };

    const addRow = () => {
      const newRow = new Object();
      table_headers.map((key) => (newRow[key] = ""));
      setTableData((prev) => [...prev, newRow]);
    };

    //this runs each time a mousemove event is fired
    const handleMouseMove = (e) => {
      // if (e.clientX > canvasSize.current.x) {
      //   console.log("mouse going out");
      // }
      setPosition({ x: e.clientX, y: e.clientY });
      dispatch({
        type: "CHANGE_ELEMENT",
        payload: {
          id: id,
          top:
            ((e.clientY - offsetRef.current.y) / blockSize).toFixed(0) *
            blockSize,
          left:
            ((e.clientX - offsetRef.current.x) / blockSize).toFixed(0) *
            blockSize
        }
      });
    };

    //throttled version of the handleMouseMove function
    const throttledMouseMove = throttle((e) => handleMouseMove(e), 200);

    const setCssPropsCallback = debounce((e) => setCssProps(e), 600);

    React.useEffect(() => {
      if (elementRef.current) {
        // if (ref.current) {
        //   console.log(ref.current.clientHeight);
        //   canvasSize.current.x = ref.current.clientWidth;
        //   canvasSize.current.y = ref.current.clientHeight;
        // }
        elementRef.current.addEventListener("mousedown", (e) => {
          // setCssProps(getComputedStyle(elementRef.current));
          // console.log(getComputedStyle(elementRef.current)["background-color"]);
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
      <div
        className="element"
        style={style}
        onMouseOverCapture={() =>
          setTimeout(() => {
            setCssProps(getComputedStyle(elementRef.current));
          }, 1000)
        }
      >
        {varient === "button" ? (
          <button ref={elementRef}>Button</button>
        ) : varient === "text input" ? (
          <input
            ref={elementRef}
            className="input"
            placeholder="Type here"
            type="text"
          />
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
          <>
            <div
              className="table"
              ref={elementRef}
              style={{
                gridTemplateColumns: `repeat(${table_headers.length}, auto)`
              }}
            >
              {table_headers.map((key, index) => {
                return (
                  <input
                    type="text"
                    className="head"
                    key={index}
                    value={tableHeadData[key]}
                    onChange={(e) =>
                      setTableHeadData((prev) => ({
                        ...prev,
                        [key]: e.target.value
                      }))
                    }
                  />
                );
              })}
              {tableData.map((item, index) => {
                return table_headers.map((key) => (
                  <input
                    type="text"
                    className="cell"
                    key={index + key}
                    value={item[key]}
                    onChange={(e) =>
                      setTableData((prev) => {
                        const updated = prev.map((item, index2) => {
                          if (index2 === index) {
                            return {
                              ...item,
                              [key]: e.target.value
                            };
                          } else {
                            return item;
                          }
                        });
                        return updated;
                      })
                    }
                  />
                ));
              })}
            </div>
            <form
              className="add-column"
              onSubmit={(e) => {
                e.preventDefault();
                addHeader({ [headerKey]: headerName });
              }}
            >
              <input
                type="text"
                placeholder="Key"
                onChange={(e) => setHeaderKey(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Header Name"
                onChange={(e) => setHeaderName(e.target.value)}
                required
              />
              <button className="span-button" type="submit">
                Add col
              </button>
              <button className="span-button" type="button" onClick={addRow}>
                Add row
              </button>
            </form>
          </>
        ) : varient === "searchbar" ? (
          <input type="search" ref={elementRef} />
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
  }
);

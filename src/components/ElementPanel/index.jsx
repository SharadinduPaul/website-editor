import React from "react";
import { ElementButton, Text } from "..";
import { ElementContext } from "../../utils/context";
import "./styles.css";

const button_data = [
  {
    image_url: "https://cdn-icons-png.flaticon.com/512/4865/4865098.png",
    title: "Text Input",
    subTitle: "Supports Markdown or HTML"
  },
  {
    image_url: "https://cdn-icons-png.flaticon.com/512/5199/5199965.png",
    title: "Button",
    subTitle: "Trigger actions like run queries, export data etc."
  },
  {
    image_url: "https://cdn-icons-png.flaticon.com/512/8669/8669111.png",
    title: "Dropdown",
    subTitle: "Select from a set of options, with a dropdown."
  },
  {
    image_url: "https://cdn-icons-png.flaticon.com/512/4598/4598376.png",
    title: "Table",
    subTitle: "Display tabular data with pagination."
  }
];

export const ElementPanel = () => {
  const { elements, dispatch, cssProps } = React.useContext(ElementContext);
  const [showCss, setShowCss] = React.useState(false);

  const date = new Date();
  return (
    <div className="elementpanel-main">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text varient="header2" faded>
          Components
        </Text>
        <button
          className="cssToggle"
          onClick={() => setShowCss((prev) => !prev)}
        >
          {!showCss ? "CSS" : "Elements"}
        </button>
      </div>
      {showCss ? (
        <>
          <div className="cssProps">
            <Text>Background color:</Text>
            <Text>{cssProps["background-color"]}</Text>
          </div>
          <div className="cssProps">
            <Text>Color:</Text>
            <Text>{cssProps["color"]}</Text>
          </div>
          <div className="cssProps">
            <Text>Height</Text>
            <Text>{cssProps["height"]}</Text>
          </div>
          <div className="cssProps">
            <Text>Width</Text>
            <Text>{cssProps["width"]}</Text>
          </div>
        </>
      ) : (
        button_data?.map((item, index) => {
          const _id = date.getTime().toString();
          return (
            <ElementButton
              key={index}
              onClick={() =>
                dispatch({
                  type: "ADD_ELEMENT",
                  payload: {
                    id: _id,
                    type: item.title,
                    top: 60,
                    left: 0
                  }
                })
              }
              {...item}
            />
          );
        })
      )}
    </div>
  );
};

import React from "react";
import { ElementButton, Text } from "..";
import { ElementContext } from "../../utils/context";
import "./styles.css";

const button_data = [
  {
    image_url: "https://picsum.photos/200",
    title: "Text Input",
    subTitle: "Supports Markdown or HTML"
  },
  {
    image_url: "https://picsum.photos/201",
    title: "Button",
    subTitle: "Trigger actions like run queries, export data etc."
  },
  {
    image_url: "https://picsum.photos/202",
    title: "Dropdown",
    subTitle: "Select from a set of options, with a dropdown."
  },
  {
    image_url: "https://picsum.photos/203",
    title: "Table",
    subTitle: "Display tabular data with pagination."
  }
];

export const ElementPanel = () => {
  const { elements, dispatch } = React.useContext(ElementContext);

  const date = new Date();

  return (
    <div className="elementpanel-main">
      <Text varient="header2" faded>
        Components
      </Text>
      {button_data?.map((item, index) => {
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
      })}
    </div>
  );
};

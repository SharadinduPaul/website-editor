import React from "react";
import { Text } from "..";
import "./styles.css";

export const ElementButton = ({
  image_url,
  title,
  subTitle,
  onClick,
  className,
  style
}) => {
  return (
    <div
      onClick={onClick}
      className={`element-button ${className}`}
      style={style}
    >
      <img src={image_url} alt={title} />
      <div className="content">
        <Text varient="header2">{title}</Text>
        <Text faded>{subTitle}</Text>
      </div>
    </div>
  );
};

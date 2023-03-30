import React from "react";
import "./styles.css";

export const Text = ({
  varient = "content1",
  faded,
  children,
  className,
  style
}) => {
  const classString = `text-main ${faded ? "faded" : ""} ${className}`;

  return varient === "header1" ? (
    <h1 className={classString} style={style}>
      {children}
    </h1>
  ) : varient === "header2" ? (
    <h6 className={classString} style={style}>
      {children}
    </h6>
  ) : (
    <p className={classString} style={style}>
      {children}
    </p>
  );
};

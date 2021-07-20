import React from "react";
import Menu from "../Menu";
import "../coreStyle.css"

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "base-child",
  children
}) => (
  <div>
    <Menu />
    <div className="base-container">
      <div className="base-heading">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>

  </div>
);

export default Base;


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
    <footer className="footer bg-dark mt-auto py-3" id="footer">
      <h4 className="text-info text-center">TopShop.com</h4>
      <div className="footer-contents-row">
        <div className="footer-contents-col-1">
          <ul>
            <li className="text-white">About us</li>
            <li className="text-white">important links</li>
            <li className="text-white">Contact us</li>
            <li className="text-white">Job application</li>
            <li className="text-white">people behind topshop.com</li>
          </ul>
        </div>
        <div className="footer-contents-col-2">
        <ul>
            <li className="text-white">Our services</li>
            <li className="text-white">Business model</li>
            <li className="text-white">Our investors</li>
            <li className="text-white">Our presence</li>
            <li className="text-white">life at topshop.com</li>
          </ul>
        </div>
        <div className="footer-contents-col-3">
        <ul>
            <li className="text-white">head office Delhi, India</li>
            <li className="text-white">London Office</li>
            <li className="text-white">Dubai office</li>
            <li className="text-white">Canada office</li>
            <li className="text-white">Singapore office</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);

export default Base;


import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/helper/Base";
import "./userDashBoardStyle.css"
const UserDashBoard = () => {
  const userDetails = () => {
    return <div className="user-details">
      <ul>
        <li><span>Name:</span> {isAuthenticated().user.name}</li>
        <li><span>Email:</span> {isAuthenticated().user.email}</li>
      </ul>
    </div>
  }
  const myOrders = () => {
    return <div className="my-orders user-details">
      <Link style={{ textDecoration: "none", color: "black" }} to="/orders/current">
        My Orders
      </Link>
    </div>
  }
  const orderTimeline = () => {
    return <div className="my-history user-details">
      <Link style={{ textDecoration: "none", color: "black" }} to="/orders/history">
        Order history
      </Link>
    </div>
  }

  return (
    <Base title="" description={`Hello! ${isAuthenticated().user.name}`}>
      <div className="top-body">
        {userDetails()}
        {myOrders()}
        {orderTimeline()}
      </div>
    </Base>
  );
};

export default UserDashBoard;

// import { load } from 'dotenv/types';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import "./adminStyle.css";
import { getAllOrders } from "./helper/AdminOrderApiCall";
import CardForManageOrder from "./helper/CardForManageOrder";
function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    setLoading(true);
    getAllOrders(user._id, token).then((Response) => {
      setOrders(Response);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <div className="manage-orders">
      <div className="manage-orders-head">
        <Link to="/admin/dashboard">
          <button className="back-button">Back to admin home</button>
        </Link>
        <h3>Manage all the orders here</h3>
      </div>
      <div className="row bg-warning p-1">
        <div className="col-1">SL No.</div>
        <div className="col-3">Name</div>
        <div className="col-3">Email</div>
        <div className="col-2">Price</div>
        <div className="col-1">Qty</div>
        <div className="col-2">Details</div>
      </div>
      {orders.map((order, i) => {
        let l = order.products.length;
        return (
          <CardForManageOrder
            index={i + 1}
            name={order.userName}
            email={order.userEmail}
            cost={order.cost}
            qty={l}
            orderId={order._id}
            address={order.address}
            productIds={order.products}
          />
        );
      })}
    </div>
  );
}

export default ManageOrders;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { getSingleOrder } from "./AdminOrderApiCall";
import EditOrder from "./EditOrder";

const CardForManageOrder = ({ index, name, email, cost, qty, orderId, address, productIds }) => {
  const [order, setOrder] = useState({});

  const { user, token } = isAuthenticated();



  return (
    <div className="row bg-success text-white p-1">
      <div className="col-1">{index}</div>
      <div className="col-3">{name}</div>

      <div className="col-3">{email}</div>
      <div className="col-2">{cost}</div>
      <div className="col-1">{qty}</div>
      {console.log("---------" + productIds)}
      <button className="col-1 bg-info border-0 text-white hover-shadow">
        <Link to={`/admin/order/edit/${orderId}`}>edit</Link>
      </button>

    </div>
  );
}


export default CardForManageOrder;

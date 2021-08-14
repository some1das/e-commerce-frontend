import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth/helper'
import { changeOrderStatus, getSingleOrder } from './AdminOrderApiCall'
import "./styles/editOrderStyle.css"
import { Link } from "react-router-dom"



function EditOrder() {
  const [loading, setLoading] = useState(true)
  const [orderId, setOrderId] = useState("")
  const [orderDetails, setOrderDetails] = useState({})
  const showUrl = (cb) => {
    let k = window.location.href
    let Id = k.substring(k.length - 24, k.length)
    // console.log(id)
    cb(Id);
  }

  useEffect(() => {
    showUrl((id) => {
      setOrderId(id);

    })
  }, [])
  useEffect(() => {
    getSingleOrder(isAuthenticated().user._id, orderId, isAuthenticated().token).then((res) => {
      setOrderDetails(res)
      setTimeout(() => {
        setLoading(false)
      }, 500)

    });
  }, [orderId])
  if (loading) {
    return (
      <div>

        <h1>Loading...</h1>
      </div>
    )
  }
  else if (loading == false && orderDetails != null) {
    let dateObj = new Date(orderDetails.createdAt)
    let date = `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()} -${dateObj.getHours()}:${dateObj.getMinutes()}`
    return (
      <div className="edit-order-body">
        <span className="back-to-manage-order"><Link to="/admin/orders">Back to manage order</Link></span>
        <div className="user-detail">
          <div className="details-line">Name:{orderDetails.userName}</div>
          <div className="details-line">Email:{orderDetails.userEmail}</div>
          <div className="details-line">Total:{orderDetails.cost}</div>
          <div className="details-line">Order date:{date}</div>
          <div className="address">
            <div className="address-line">House Number: {orderDetails.address.houseNumber}</div>
            <div className="address-line">Street: {orderDetails.address.street}</div>
            <div className="address-line">City: {orderDetails.address.city}</div>
            <div className="address-line">District: {orderDetails.address.district}</div>
            <div className="address-line">PIN: {orderDetails.address.PIN}</div>
            <div className="address-line">state: {orderDetails.address.state}</div>
          </div>
        </div>
        <div className="order-status">
          <div>
            Current status:
            <span>
              {orderDetails.status == 0 && "placed"}
              {orderDetails.status == 1 && "shiped"}
              {orderDetails.status == 2 && "delivered"}
            </span>
            <div className="status-control">
              change status to:
              <span onClick={() => { changeOrderStatus(orderDetails._id, isAuthenticated().token, isAuthenticated().user._id, 2).then((res) => console.log(res)) }}>delevered</span>
              <span onClick={() => { changeOrderStatus(orderDetails._id, isAuthenticated().token, isAuthenticated().user._id, 1).then((res) => console.log(res)) }}>shiped</span>
              <span onClick={() => { changeOrderStatus(orderDetails._id, isAuthenticated().token, isAuthenticated().user._id, 0).then((res) => console.log(res)) }}>placed</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>No orders available...</h1>
      </div>
    )
  }

}

export default EditOrder

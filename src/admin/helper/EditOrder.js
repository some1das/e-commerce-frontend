import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth/helper'
import { getSingleOrder } from './AdminOrderApiCall'


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
  else if (loading == false) {
    return (
      <div>
        <h1>{orderDetails.userName}</h1>
      </div>
    )
  }

}

export default EditOrder

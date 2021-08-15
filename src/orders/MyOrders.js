import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/helper/Base'
import { cancelOrderAPICall, getOrdersByUserId, getProductsByIds } from './Helper'
import "./orderStyle.css"
function MyOrders() {
    const [myOrders, setMyOrders] = useState([])
    const [clickedOrder, setClickedOrder] = useState({})
    const [isClicked, setIsClicked] = useState(false)
    const [popup, setPopup] = useState(false)
    const [products, setProducts] = useState([])
    useEffect(() => {
        getOrdersByUserId(isAuthenticated().user._id).then((res) => {
            setMyOrders(res)
        })
    }, [])
    const cancelOrder = (orderId) => {
        cancelOrderAPICall(isAuthenticated().user._id, isAuthenticated().token, clickedOrder._id)
            .then((res) => {
                console.log(res)
            })
    }
    const areYouSurePopup = (orderId) => {
        return (
            <div className="pop-up">
                <div className="question">Are you sure?</div>
                <div className="options">
                    <div className="yes" onClick={(orderId) => { cancelOrder(orderId) }}>Yes</div>
                    <div className="no" onClick={() => { setPopup(false) }}>No</div>
                </div>

            </div>
        )
    }
    const showOrdersCartwise = () => {
        return <div className="order-section">
            {
                myOrders.map((e) => {
                    let dt = new Date(e.createdAt)
                    return (
                        <div onClick={() => {
                            setClickedOrder(e)
                            setIsClicked(true)
                        }} className="order-card">
                            <div className="col">
                                {e.products.length} items
                            </div>
                            <div className="col">
                                ₹{e.cost}
                            </div>
                            <div className="col">
                                {
                                    `${dt.toDateString()} ${dt.getHours()}:${dt.getMinutes()}`
                                }
                            </div>
                            <div className="col">
                                status:
                                <span>
                                    {
                                        e.status == 0 ? "Placed" : (e.status == 1 ? "shiped" : "delevered")
                                    }
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    }

    const countOccurance = (pro, cb) => {
        let len = pro.length
        let freq = {}
        for (let i = 0; i < len; i++) {
            freq[pro[i]] = 0;
        }
        for (let i = 0; i < len; i++) {
            freq[pro[i]]++;
        }
        return cb(freq);

    }
    const showSingleOrderDetails = (e) => {
        var dt, freqArray
        countOccurance(e.products, (freq) => {
            getProductsByIds(e.products).then((res) => {
                setProducts(res)

            })
            dt = new Date(e.createdAt)
            freqArray = freq
        })
        return <div className="single-order-body">
            <div
                className="order-card">
                <div className="col">
                    {e.products.length} items
                </div>
                <div className="col">
                    ₹{e.cost}
                </div>
                <div className="col">
                    {
                        `${dt.toDateString()} ${dt.getHours()}:${dt.getMinutes()}`
                    }
                </div>
                <div className="col">
                    status:
                    <span>
                        {
                            e.status == 0 ? "Placed" : (e.status == 1 ? "shiped" : "delevered")
                        }
                    </span>
                </div>
                <div className="col">
                    <span className="cancel-order" onClick={() => { setPopup(true) }}>
                        Cancel
                    </span>
                </div>
            </div>
            <div className="single-order-products">
                {
                    products && products.map((p) => {
                        return <div className="card">
                            <div className="name">{p.name}</div>
                            <div className="price">₹{p.price}</div>
                            <div className="count">count:{freqArray[p._id]}</div>


                        </div>
                    })
                }
            </div>
        </div>
    }
    return (
        <Base title="" description="">
            {
                popup && areYouSurePopup(clickedOrder._id)
            }
            {
                !popup && isClicked == false && myOrders && showOrdersCartwise()

            }
            {
                !popup && isClicked == true && showSingleOrderDetails(clickedOrder)
            }
        </Base>
    )
}

export default MyOrders

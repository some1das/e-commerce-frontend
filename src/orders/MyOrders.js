import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/helper/Base'
import { getOrdersByUserId, getProductsByIds } from './Helper'
import "./orderStyle.css"
function MyOrders() {
    const [myOrders, setMyOrders] = useState([])
    const [clickedOrder, setClickedOrder] = useState({})
    const [isClicked, setIsClicked] = useState(false)
    const [products, setProducts] = useState([])
    useEffect(() => {
        getOrdersByUserId(isAuthenticated().user._id).then((res) => {
            setMyOrders(res)
        })
    }, [])
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
                isClicked == false && myOrders && showOrdersCartwise()

            }
            {
                isClicked == true && showSingleOrderDetails(clickedOrder)
            }
        </Base>
    )
}

export default MyOrders

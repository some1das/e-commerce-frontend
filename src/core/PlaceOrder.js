import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { isAuthenticated } from "../auth/helper";
import { createOrder } from "./helper/OrderHelper";

import "./coreStyle.css"

function PlaceOrder() {
  const [error, setError] = useState("");
  const [isRedirect,setIsRedirect]=useState(false)
  const [success,setSuccess]=useState(false)
  const [yourOrders, setYourOrders] = useState({
    products: [],
    address: {},
    cost: 0,
    userId: "",
    userName:"",
    userEmail:""
  });
  const { user, token } = isAuthenticated();
  const [isProceed, setIsProceed] = useState(false);
  const [yourAddress, setYourAddress] = useState({
    houseNumber: "",
    street: "",
    city: "",
    district: "",
    PIN: "",
    state: "",
    landMark: "",
  });
  const setFilds = (type) => (event) => {
    const value = event.target.value; 
    setYourAddress({ ...yourAddress, [type]: value, });
  };
  const placeFinalOrder=()=>{
    createOrder(user._id,token,yourOrders).then((response)=>{
      if(response.error)
      {
        console.log(response.error)
      }
      else{
        localStorage.removeItem("cart")
        localStorage.removeItem("cost");
        setSuccess(true);
       
        
        // console.log(response)

      }
    })
  }
  const setDataToOrder = () => {
    if (typeof window != undefined) {
      let cost = localStorage.getItem("cost");
      let products = JSON.parse(localStorage.getItem("cart"));
      let PI = [];
      products.forEach((element) => {
        PI.push(element._id);
      });
      setYourOrders({
        ...yourOrders,
        address: yourAddress,
        cost: cost,
        products: PI,
        userId: user._id,
        userName:user.name,
        userEmail:user.email
      });
    } else {
      setError("something went wrong");
    }
  };
  const addressInput = () => {
    return (
      <div className="form-for-address">
        <h3 className="text-center">Enter your address</h3>
        <div className="row">
          <div className="col">House Number:</div>
          <div className="col">
            <input
              type="text"
              onChange={setFilds("houseNumber")}
              class="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">street:</div>
          <div className="col">
            <input onChange={setFilds("street")} class="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">city:</div>
          <div className="col">
            <input onChange={setFilds("city")} class="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">District:</div>
          <div className="col">
            <input onChange={setFilds("district")} class="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">State:</div>
          <div className="col">
            <input onChange={setFilds("state")} class="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">PIN:</div>
          <div className="col">
            <input onChange={setFilds("PIN")} class="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">Land mark:</div>
          <div className="col">
            <input onChange={setFilds("landMark")} class="form-control" />
          </div>
        </div>
        <button
          onClick={() => {
            setDataToOrder();
            setIsProceed(true);
          }}
        >
          Proceed
        </button>
      </div>
    );
  };
  const afterProceed = () => {
    return (
      <div className="after-proceed">
        <div className="address">
          <h3>Address entered by you</h3>
          <h4>
            {user.name}, {yourOrders.address.houseNumber},
            {yourOrders.address.street},district:{yourOrders.address.district},({yourOrders.address.state}), PIN: {yourOrders.address.PIN},Land mark :{yourOrders.address.landMark}
          </h4>
        </div>
        <button onClick={()=>{placeFinalOrder()}}>confirm order</button>
      </div>
    );
  };
  const redirectHandaler=()=>{
    
    if(isRedirect===true)
    {
      return <Redirect to="/" />
    }
  }
  const successMessage=()=>{
    setTimeout(()=>{
      setIsRedirect(true)
    },1000)
    return <>
    <h4>Order has been successfully placed!!</h4>
    <h5>You are redirected to home page</h5>
    </>
  }
  return (
    <div className="place-order-body">
      {!success && !isProceed && addressInput()}
      {!success && isProceed && afterProceed()}
      
      {success && successMessage() }
      {redirectHandaler()}
    </div>
  );
}

export default PlaceOrder;

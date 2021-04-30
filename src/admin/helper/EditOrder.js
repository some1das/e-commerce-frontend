import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../adminStyle.css";
import { getProductDetails } from "./AdminOrderApiCall";
function EditOrder({ setEdit, orderId, address, products }) {
  const [productDetails, setProductDetails] = useState([]);
  const d = [];
  const insertDataToProductDetails = () => {
    const l = products.length;
    for (let i = 0; i < l; i++) {
      getProductDetails(products[i]).then((data) => {
        d.push(data);
      });
    }

    
    setTimeout(() => {
      setProductDetails(d);
      console.log(productDetails);
    }, 500);
  };
  useEffect(() => {
    insertDataToProductDetails();
  }, []);
  return (
    <>
       <div className="edit-order-body">
       <div className="edit-order-address">
         <button className="btn-info br-0" onClick={()=>{setEdit(false)}}>hide</button>
         
         <h6>House number:{address.houseNumber}</h6>
         <h6>City: {address.city}</h6>
         <h6>State : {address.state}</h6>
         <h6>PIN: {address.PIN}</h6>

       </div>
       <div className="edit-ordre-product-details">
          {
            productDetails.map((pro)=>{
              return (
                <div className="box">
                  <h6>{pro.name}</h6>
                  <h6>price: {pro.price}</h6>
                  <h6>stock {pro.stock}</h6>
                </div>
              )
            })
          }
       </div>
       </div>
    </>
  )
  
}

export default EditOrder;

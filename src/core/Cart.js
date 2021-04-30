import React, { useState, useEffect } from "react";

import Card from "./Card";
import Base from "../core/helper/Base";
import { loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";

function Cart() {
  const [products, setProducts] = useState([]);
  const [force, setForce] = useState(1);
  const [cost, setCost] = useState(0);

  const costCalculator = () => {
    let price = 0;
    products.forEach((product) => {
      price = price + product.price;
      console.log(price + "------------------");
    });
    setCost(price);
  };
  useEffect(() => {
    setProducts(loadCart());
    costCalculator();
  }, [force]);

  const loadAllProducts = () => {
   
    return (
      <div className="cart-product-container">
        {/* <h2>your products</h2> */}
        {products.map((product, index) => {
          return (
            <div className="card-in-cart">
              <Card
                product={product}
                key={index}
                addToCart={false}
                removeFromCart={true}
                force={force}
                setForce={setForce}
                hidePhoto={true}
                hideDescription={true}
              />
            </div>
          );
        })}
      </div>
    );
  };
  const setTheCost = () => {
    if (typeof window != undefined) {
      localStorage.setItem("cost", cost);
    }
  };
  const loadCheckouts = () => {
    return (
      <>
        <div className="row">
          <h2>Billing details</h2>
          {products.map((product, index) => {
            return (
              <>
                <div className="col-9">
                  <h4>{product.name}</h4>
                </div>
                <div className="col-3">
                  <h4>{product.price}</h4>
                </div>
              </>
            );
          })}
        </div>

        {cost !== 0 && (
          <div className="bg-danger row">
            <h5 className="col-9">Total cost is</h5>
            <h5 className="col-3">{cost}</h5>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <Base title="Cart page" description="Ready to check out">
        <div className="row" id="custom-cart">
          <div className="" id="custom-cart-details">
            {loadCheckouts()}
            <button
              className="btn-info"
              onClick={() => {
                costCalculator();
              }}
            >
              calculate total cost
            </button>
            <div>{loadAllProducts()}</div>
            {products && (
              <button
                onClick={() => {
                  
                  setTheCost();
                }}
                className="btn-success text-white"
              >
                <Link className="text-white" to="/order/place">
                  Place order
                </Link>
              </button>
            )}
          </div>
        </div>
      </Base>
    </div>
  );
}

export default Cart;

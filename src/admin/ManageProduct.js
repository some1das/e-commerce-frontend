import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/helper/Base";
import { deleteProduct, getAllTheProducts } from "./helper/AdminApiCall";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const { token, user } = isAuthenticated();

  const preload = () => {
    getAllTheProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteaProduct=(productId)=>{
     deleteProduct(user._id,token,productId).then(data=>{
       if(data.error){
         console.log(data.error)
       }
       else{
         preload()
       }
     })
  }
  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          

          {
            products.map((product,index)=>{

             return <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-black text-left">{product.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteaProduct(product._id)}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
            })
          }
        </div>
      </div>
    </Base>
  );
};

export default ManageProduct;

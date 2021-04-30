import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router';
import { addItemToCart, removeOneItem } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper'
import "./coreStyle.css"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
const Card = ({product,
addToCart=true,
removeFromCart=false,
force,
setForce,
hidePhoto=false,
hideDescription=false
}) => {

  const [redirect,setRedirect]=useState(false)
  const [count,setCount]=useState(product.count)
  const [refresh,setRefresh]=useState(false)


  const cartTitle=product?product.name:"title is not found"
  const cartDescription=product?product.description:"description not found"
  const price=product?product.price:"price is not defined"

  const addToCartLocal=()=>{
     addItemToCart(product,()=>{
       setRedirect(true)
     })
  }

  const getARedirect=(redirect)=>{
    if(redirect){
      return <Redirect to="/cart"/>
    }
  }
    return (
      <div className="product-card">
        <div className="product-card-title">{cartTitle}</div>
        <div className="card-body">
          {
            !hidePhoto && <div className="rounded border border-success p-2">
            {getARedirect(redirect)}
            <ImageHelper product={product} />
          </div>
          }
          {
            !hideDescription &&  <p className="lead bg-success text-white text-center font-weight-normal text-wrap">
            {cartDescription}
          </p>
          }
          <p className="btn btn-success rounded  btn-sm px-4">${price}</p>
          <div className="row">
            <div className="col-12">
              {
                addToCart && (<button
                  onClick={addToCartLocal}
                  className="btn btn-block btn-outline-success mt-2 mb-2"
                  
                >
                  <AddShoppingCartIcon />
                </button>)
              }
            </div>
            <div className="col-12">
             {
               removeFromCart && ( <button
                onClick={() => {removeOneItem(product._id);
                  if(refresh===true)
                  {
                    setRefresh(false)
                    setForce(force+1)
                    console.log(force)

                  }
                  else
                  {
                    setRefresh(true)
                    setForce(force+1)
                    console.log(force)

                  }
               
                console.log(refresh)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                <RemoveShoppingCartIcon />
              </button>)
             }
            </div>
          </div>
        </div>
      </div>
    );
  };


export default Card


import React,{useState,useEffect} from "react";
import { API } from "../../backend";
import "../../Styles.css";
import Card from "../Card";
import Base from "./Base";
import "../coreStyle.css"
import { getAllProducts } from "./CoreApiCall";
import { isAuthenticated } from "../../auth/helper";

function Home() {
  const [products, setProducts] = useState([])
  const [error,setError]=useState(false)
  const [load,setLoad]=useState(true)
  const [showAddToCart,setShowAddToCart]=useState(false)
  const loadAllProducts=()=>{
    getAllProducts().then(data=>{
      if(data.error){
        setError(data.error)
      }
      else{
        setProducts(data)
      }
    })
  }
  useEffect(()=>{
    if(isAuthenticated().user!==undefined)
    {
      setShowAddToCart(true)
    }
    loadAllProducts()
    setTimeout(()=>{
      setLoad(false)
    },1000)
  },[])
  const loader=()=>{
    return <><div class="text-center" id="home-loader">
    <div class="spinner-border" role="status" id="home-loader-inside">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div></>
  }
  return (
    <div>
      {
        load && loader()
      }
      {
        !load && <Base title="TopShop.com" description="An e-commerce website">
        <div className="home-product-container">
          <h1 className="text-white">All of t-shirts</h1>
          <div className="row">
              
             {products.map((product,index)=>{
               return (
                 <div key={index} className="products-at-home">
                   <Card product={product} addToCart={showAddToCart} />
                 </div>
               )
             })}
          </div>
        </div>
      </Base>
      }
      
    </div>
  );
}

export default Home;

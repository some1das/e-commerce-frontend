import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/helper/Base";
import { createaProduct, getAllCategory } from "./helper/AdminApiCall";

function CreateProduct() {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categoties: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getAllCategory().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: "error" });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log("categ=" + categories);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
const successMessage=()=>{
    return <div className="alert alert-success mt-3"
    style={{display:createdProduct?"":"none"}}
    >
      <h4>{createaProduct} created successfully</h4>
    </div>
}

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values,error:"",loading:true})
    createaProduct(user._id,token,formData).then(data=>{
      if(data.error)
      {
        setValues({...values,error:data.error})
      }
      else
      {
        setValues({...values,name:"",description:"",price:"",photo:"",stock:"",loading:false,createdProduct:data.name})
      }
    })
  };
  const handleChange = (name) => (event) => {
    const value=name==="photo"?event.target.files[0]:event.target.value;
    formData.set(name,value);
    setValues({...values,[name]:value})
  };
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          {categories &&
            categories.map((cate) => (
              <option key={cate._id} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <div>
      <Base
        title="Add product here"
        description="  "
        className="container bg-info p-4"
      >
        <h1 className="text-white">Create product</h1>
        <Link to="/admin/dashboard" className="btn btn-dark">
          Admin home
        </Link>
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {createProductForm()}</div>
        </div>
      </Base>
    </div>
  );
}

export default CreateProduct;

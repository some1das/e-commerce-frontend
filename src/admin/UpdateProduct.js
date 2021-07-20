import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/helper/Base";
import {
 
  updateProduct,
  getProduct,
  getAllCategory,
} from "./helper/AdminApiCall";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
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

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: "error" });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
          stock: data.stock,
          formData: new FormData(),
        });
        preloadCategories();
        console.log("categ=" + categories);
      }
    });

  };
  const preloadCategories = () => {
    getAllCategory().then((data) => {
      if (data.error) {
        setValues({ ...values, error: "error" });
      } else {
        console.log("This is--------****************"+data)
        setValues({
          categories: data,
          formData: new FormData(),
        });
        
      }
    });
  };
  useEffect(() => {
    preload(match.params.productId);
  }, []);
  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>updated successfully</h4>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId ,user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
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
            categories.map((cate) => {
                return (
                    <option key={cate._id} value={cate._id}>
                      {cate.name}
                    </option>
                  )
            })}
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
        Update Product
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
        <h1 className="text-white">Update product</h1>
        <Link to="/admin/dashboard" className="btn btn-dark">
          Admin home
        </Link>
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {createProductForm()}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default UpdateProduct;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/helper/Base";
import { createCategory } from "./helper/AdminApiCall";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">failed to create category</h4>;
    }
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
        setSuccess(false)
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };
  const myCategoryForm = () => {
    return (
      <div className="form-group">
        <p className="lead">Enter Category</p>
        <input
          type="text"
          className="form-control my-3"
          value={name}
          onChange={handleChange}
          autoFocus
          required
        />
        <button className="btn btn-outline-info" onClick={onSubmit}>
          Create category
        </button>
      </div>
    );
  };
  const goBack = () => {
    return (
      <Link to="/admin/dashboard">
        <button className="btn btn-danger">Go back</button>
      </Link>
    );
  };
  return (
    <Base
      title="Create category here"
      description=""
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        {warningMessage()}
        {successMessage()}
        {goBack()}
        <div className="col-md-8 offset-md-2">{myCategoryForm()}</div>
      </div>
    </Base>
  );
};

export default CreateCategory;

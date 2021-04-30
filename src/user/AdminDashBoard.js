import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/helper/Base";
const AdminDashBoard = () => {
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">manage business</h4>
        <ul className="list-group">
        <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create category
            </Link>
          </li>
        <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/product" className="nav-link text-success">
              Manage product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item bg-white">
            <span className="badge badge-success bg-success mr-1">Name: </span>{name}
          </li>
          <li className="list-group-item bg-white">
            <span className="badge badge-success bg-success mr-1">email: </span>{email}
          </li>
          <li className="list-group-item bg-white">
            <span className="badge badge-success bg-success mr-1">Admin Area </span>
          </li>
        </ul>
      </div>
    );
  };
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <Base
      className="container bg-light p-0"
      title="AdminDashBoard page"
      description="manage all orders here"
    >
      <div className="admin-home">
      <div className="admin-home-right">{adminRightSide()}</div>
        <div className="admin-home-left">{adminLeftSide()}</div>
        
      </div>
    </Base>
  );
};

export default AdminDashBoard;

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { preSignup, signup } from "../auth/helper";
import Base from "../core/helper/Base";
import "./userStyle.css";

function Signup() {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;
  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: false });
    preSignup({ name, email, password })
      .then((data) => {
        console.log("ye data hai" + data);
        if (data.error) {
          setvalues({
            ...values,
            error: JSON.stringify(data.error),
            success: false,
          });
        } else {
          let preReg = {
            name: data.name,
            email: data.email,
            password: data.password,
          };
          preReg = JSON.stringify(preReg);
          if (typeof window != undefined) {
            localStorage.setItem("preReg", preReg);
          }
          setvalues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
          });
          setTimeout(() => {
            setvalues({ ...values, success: true });
            
          }, 2000);
        }
      })
      .catch((err) => console.log("error in signup " + err));
  };
  const handleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };
  const redirectToVerify=()=>{
    return <Redirect to="/otp/verification" />
  }
  // ................email verification Selection.......................


  
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            new account is created. please login here{" "}
            <Link to="/signin">login</Link>
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const signUpForm = () => {
    return (
      <div className="row" id="signup-form">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark"> Name</label>
              <input
                className="form-control"
                value={values.name}
                onChange={handleChange("name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                value={values.email}
                onChange={handleChange("email")}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                className="form-control"
                value={values.password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
    return (
      <div>
        <Base
          title="Sign up page"
          description="please enter valid informations"
        >
          {errorMessage()}
          {success && redirectToVerify()}
          {signUpForm()}
        </Base>
      </div>
    );
  } 


export default Signup;

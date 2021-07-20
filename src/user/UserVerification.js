import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import "./userStyle.css"

function UserVerification() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    code: "",
    success: false,
  });
  useEffect(() => {
    if (typeof window !== undefined) {
      let user = JSON.parse(localStorage.getItem("preReg"));
      setData({
        ...data,
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  }, []);
  const setCode = (Name) => (event) => {
    setData({ ...data, [Name]: event.target.value });
  };
  const done = () => {
    signup(data)
      .then((Response) => {
        setData({ ...data, success: true });
        return console.log(Response);
      })
      .catch((err) => {
        return console.log(err);
      });
  };
  const codeForm = () => {
    return (
      <div className="user-verification-form-body">
        <div className="user-verifiction-form">
          <h5 className="text-black">We have sent OTP to your email </h5>
          <h5 className="text-black">Please verify it </h5>
          <input
            onChange={setCode("code")}
            type="text"
            placeholder="enter 4 digit OTP"
          />
          <button
            onClick={() => {
              done();
            }}
          >
            submit
          </button>
        </div>
      </div>
    );
  };
  const successMessage = () => {
    localStorage.removeItem("preReg");
    return (
      <div className="success-message-user-verification">
        <h1>Successfully signed up</h1>
        <h3>You are redirected to login page</h3>
        <h3>
          Please click here to <Link to="/signin">login</Link>
        </h3>
      </div>
    );
  };

  return (
    <div className="user-verification-component">
      <div>{!data.success && codeForm()}</div>
      <div>{data.success && successMessage()}</div>
    </div>
  );
}

export default UserVerification;

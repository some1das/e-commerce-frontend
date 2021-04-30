import React, { useState } from "react";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/helper/Base";
import "./userStyle.css"
import {Redirect} from "react-router-dom"
function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
const {user}=isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values,error:false,loading:true})
    signin({email,password})
    .then(data=>{
        if(data.error!=undefined){
    setValues({...values,error:data.error,loading:false})

        }
        else{
            authenticate(data,()=>{
                setValues({...values ,didRedirect:true})
            })
        }
    })
    .catch(console.log("signin request failed...."))
  };
  
  const performRedirect=()=>{
      if(didRedirect){
        if(user && user.role===1){
          return <Redirect to="/admin/dashboard" />
        }
        else{
          return <Redirect to="/admin/dashboard" />
        }
      }
      if(isAuthenticated()){
        return <Redirect to="/" />
      }
  }
  const loadingMessage=()=>{
    return (
        loading && (
            <div className="alert alert-info">
                <h2>loading...</h2>
            </div>
        )
    )
}
const errorMessage=()=>{
    return (
     <div className="row">
     <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-danger"
     style={{display:error ? "":"none"}}
     >
         {error}
     </div>
     </div>
     </div>
    )
 }
  const signInForm = () => {
    return (
      <div className="row" id="signin-form">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                onChange={handleChange("email")}
                value={values.email}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                onChange={handleChange("password")}
                value={values.password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Base title="Signin page" description="please enter valid informations">
          {loadingMessage()}
          {errorMessage()}
        {signInForm()}
        {performRedirect()}
        
      </Base>
    </div>
  );
}

export default Signin;

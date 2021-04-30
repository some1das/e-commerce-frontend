import { API } from "../../backend";

export const signup=(data)=>{
  return fetch(`${API}/signup`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }).then((response)=>{
    return response.json()
  }).catch((err)=>{
    console.log(err)
  })
}

export const preSignup = (user) => {
  return fetch(`${API}/preSignup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
        
      return response.json();
    })
    .catch((err) => {
        console.log("err--->> "+err)
        return console.log(err)});
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        return console.log("Success sign out")
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated=()=>{
    if(typeof window ==="undefined")
    {
        return false;
    }
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false
    }
}
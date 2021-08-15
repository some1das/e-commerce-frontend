import { API } from "../../backend";

//Category calls--------------------------------------------------------------------

//Create category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((Response) => {
      return Response.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};
//get all categories
export const getAllCategory = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Product call--------------------------------------------------------------------------------------
//Create product
export const createaProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all the products
export const getAllTheProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete a products

export const deleteProduct = (userId, token, productId) => {
  return fetch(`${API}/product/${productId}/${userId}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },

  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


//get a product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Update  a products
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllUsers = (userId, token) => {
  return fetch(`${API}/users/all/${userId}`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    }
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    console.log(err)
  })
}
export const changeRoleAPI = (userId, token, adminId, role) => {
  return fetch(`${API}/user/changeRole/${adminId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      role: role,
      userId: userId
    })
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    return console.log(err)
  })
}

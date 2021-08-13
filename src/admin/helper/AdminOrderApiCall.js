import { API } from "../../backend";

export const getAllOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        return console.log(err)
    })

}

export const getSingleOrder = (userId, orderId, token) => {
    console.log(orderId)
    return fetch(`${API}/order/${userId}/${orderId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        return console.log(err)
    })
}

export const getProductDetails = (productId) => {
    return fetch(`${API}/singleProduct/${productId}`, {
        method: "GET"
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        return console.log(err)
    })
}
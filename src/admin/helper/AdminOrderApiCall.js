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
    // console.log(orderId)
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

export const changeOrderStatus = (orderId, token, userId, status) => {
    console.log(token)
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify({
            status: status,
            orderId: orderId
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return console.log(err)
    })

}
export const getAllTheProductsByIdArray = (IdArray) => {
    return fetch(`${API}/products/IdArray`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(IdArray)
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

// delete an order 
export const deleteOrderById = (orderId, userId, token) => {
    return fetch(`${API}/order/delete/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        body: JSON.stringify({
            orderId: orderId
        })
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err)
    })
}
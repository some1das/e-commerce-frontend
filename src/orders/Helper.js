import { API } from "../backend"

export const getOrdersByUserId = (userId) => {
    return fetch(`${API}/orders/${userId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

export const getProductsByIds = (ids) => {

    return fetch(`${API}/products/ids`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ids: ids
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}
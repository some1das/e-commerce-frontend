import { API } from "../../backend";

export const getAllProducts=()=>{
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    }).catch((err)=>{
        return console.log(err)
    })
}
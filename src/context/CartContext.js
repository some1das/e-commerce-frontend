import { useState, createContext } from "react"

export const CartContext = createContext()

export const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([])
    return <CartContext.Provider value={[cartItems, setCartItems]}>
        {props.children}
    </CartContext.Provider>

}

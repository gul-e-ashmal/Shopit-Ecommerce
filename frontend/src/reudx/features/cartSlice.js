import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : []
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setCartItems(state, action) {
            const item = action.payload;
            const itemExits = state.cartItems.find((i) => i.id === item.id)
            if (itemExits) {
                state.cartItems = state.cartItems.map((i) => i.id === item.id ? item : i)
            }
            else {
                state.cartItems = [...state.cartItems, item];
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart(state,action){
            localStorage.removeItem("cartItems");
            state.cartItems=[]
        },
        removeCartItems(state, action) {
            console.log("hello");
            state.cartItems = state.cartItems.filter((i) => i.id !== action.payload)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        saveShippingInfo(state, action) {
           state.shippingInfo=action.payload
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
        }
    }
})

export default cartSlice.reducer
export const { setCartItems, removeCartItems,saveShippingInfo,clearCart } = cartSlice.actions
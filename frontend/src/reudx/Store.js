import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./API/productApi";
import { authApi } from "./API/authApi"
import { userApi } from "./API/userApi";
import userReducer from './features/userSlice'
import cartReducer from "./features/cartSlice"
import { orderApi } from "./API/orderApi";


export const Store = configureStore({
    reducer: {
        auth: userReducer,
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productApi.middleware, authApi.middleware, userApi.middleware, orderApi.middleware]),
},

)
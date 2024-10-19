import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./API/productApi";
import { authApi } from "./API/authApi"
import { userApi } from "./API/userApi";
import userReducer from './features/userSlice'


export const Store = configureStore({
    reducer: {
        auth: userReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productApi.middleware, authApi.middleware, userApi.middleware]),
},

)
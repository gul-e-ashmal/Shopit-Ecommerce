import React from 'react'
import {  Route } from "react-router-dom";
import Home from '../Home';
import ProductDetail from '../product/ProductDetail';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from '../user/Profile';
import Update_Profile from '../user/Update_Profile';
import ErrorHandler from '../user/ErrorHandler';
import Update_Avatar from "../user/Update_Avatar"
import Update_Password from '../user/Update_Password';
import Forget_Password from '../auth/Forget_Password';
import Reset_Password from '../auth/Reset_Password';
import Cart from '../cart/cart';
import Shipping from '../cart/Shipping';
import Confirm_Order from '../cart/Confirm_Order';
import Payment_Method from '../cart/Payment_Method';
import MyOrder from '../order/MyOrder';
import OrderDetail from '../order/OrderDetail';
import Invoice from '../invoice/Invoice';

const UserRoute = () => {
    return (
        <>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/password/forget' element={<Forget_Password />} />
            <Route path='/password/reset/:token' element={<Reset_Password />} />

            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<ErrorHandler><Shipping /></ErrorHandler>} />
            <Route path='/confirm_order' element={<ErrorHandler><Confirm_Order /></ErrorHandler>} />
            <Route path='/payment_method' element={<ErrorHandler><Payment_Method /></ErrorHandler>} />
            <Route path='/me/orders' element={<ErrorHandler><MyOrder /></ErrorHandler>} />
            <Route path='/me/order/:id' element={<ErrorHandler><OrderDetail /></ErrorHandler>} />
            <Route path='/invoice/order/:id' element={<ErrorHandler><Invoice /></ErrorHandler>} />


            <Route path='/me/profile' element={<ErrorHandler><Profile /></ErrorHandler>} />
            <Route path='/me/update_profile' element={<ErrorHandler><Update_Profile /></ErrorHandler>} />
            <Route path='/me/update_avatar' element={<ErrorHandler><Update_Avatar /></ErrorHandler>} />
            <Route path='/me/update_password' element={<ErrorHandler><Update_Password /></ErrorHandler>} />
        </>
    )
}

export default UserRoute
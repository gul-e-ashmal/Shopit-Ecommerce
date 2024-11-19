import React from 'react'
import { Route } from "react-router-dom";
import Dashboard from '../admin/Dashboard';
import ErrorHandler from '../user/ErrorHandler';
import ListOrders from '../admin/ListOrders';
import ProcessOrder from '../admin/ProcessOrder';
import ListUsers from '../admin/ListUsers';
import UpdateUser from '../admin/UpdateUser';
import ProductReviews from '../admin/ProductReviews';
import ListProducts from '../admin/ListProducts';
import UpdateProduct from '../admin/UpdateProduct';
import UploadProductImages from '../admin/UploadProductImages';
import NewProduct from '../admin/NewProduct';

const AdminRoute = () => {
  return (
    <>
      <Route path='/admin/dashboard' element={<ErrorHandler admin={true}><Dashboard /></ErrorHandler>} />
      <Route path='/admin/orders' element={<ErrorHandler admin={true}><ListOrders /></ErrorHandler>} />
      <Route path='/admin/order/:id' element={<ErrorHandler admin={true}><ProcessOrder /></ErrorHandler>} />

      <Route path='/admin/products' element={<ErrorHandler admin={true}><ListProducts /></ErrorHandler>} />
      <Route path='/admin/product/new' element={<ErrorHandler admin={true}><NewProduct /></ErrorHandler>} />
      <Route path='/admin/products/:id' element={<ErrorHandler admin={true}><UpdateProduct /></ErrorHandler>} />
      <Route path='/admin/products/:id/uploadImages' element={<ErrorHandler admin={true}><UploadProductImages /></ErrorHandler>} />

      <Route path='/admin/users' element={<ErrorHandler admin={true}><ListUsers /></ErrorHandler>} />
      <Route path='/admin/users/:id' element={<ErrorHandler admin={true}><UpdateUser /></ErrorHandler>} />

      <Route path='/admin/reviews' element={<ErrorHandler admin={true}><ProductReviews /></ErrorHandler>} />
    </>
  )
}

export default AdminRoute
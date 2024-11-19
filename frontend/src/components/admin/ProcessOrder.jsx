import React, { useEffect, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { useOrderDetailQuery, useUpdateOrderMutation } from '../../reudx/API/orderApi'
import Loader from "../layouts/Loader";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom"

const ProcessOrder = () => {

    const [status, setStatus] = useState("")
    const params = useParams();

    const { data, isLoading } = useOrderDetailQuery(params?.id);
    const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

    const order = data?.order;

    useEffect(() => {
        setStatus(order?.orderStatus)

    }, [order])

    useEffect(() => {
        if (error) {
            toast?.error(error?.data?.message);
        }
        if (isSuccess) {
            toast?.success("Order status updated");
        }
    }, [error, isSuccess])

    if (isLoading) return <Loader />

    const handleStatus = (e) => {
        e.preventDefault();
        updateOrder({ id: order?._id, status })
    }

    return (
        <AdminLayout>
            <div><div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-9  order-details">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mt-5 mb-4">Your Order Details</h3>
                    </div>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td>{order?._id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td className={`greenColor`}>
                                    <b>{order?.orderStatus}</b>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Date</th>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-5 mb-4">Shipping Info</h3>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{order?.user.name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Phone No</th>
                                <td>{order?.shippingInfo.phoneNo}</td>
                            </tr>
                            <tr>
                                <th scope="row">Address</th>
                                <td>{order?.shippingInfo.address}, {order?.shippingInfo.city}, {order?.shippingInfo.postalCode}, {order?.shippingInfo.country}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-5 mb-4">Payment Info</h3>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">Status</th>
                                <td className="greenColor">
                                    <b>{order?.paymentInfo?.status ? order?.paymentInfo?.status : "NOT PAID"}</b>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Method</th>
                                <td>{order?.paymentMethod}</td>
                            </tr>
                            <tr>
                                <th scope="row">Stripe ID</th>
                                <td>stripe-id</td>
                            </tr>
                            <tr>
                                <th scope="row">Amount Paid</th>
                                <td>${order?.totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-5 my-4">Order Items:</h3>

                    <hr />

                    {
                        order?.orderItems?.map((item, index) => (
                            <div className="cart-item my-1" key={index}>
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        {/* <img
                                        src="../images/product.jpg"
                                        alt="Product Name"
                                        height="45"
                                        width="65"
                                    /> */}
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <a href="/products/product-id">{item.name}</a>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>${item.price}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{item.quantity} Piece(s)</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <hr />
                </div>
                <div class="col-12 col-lg-3 mt-5">
                    <h4 class="my-4">Status</h4>

                    <div class="mb-3">
                        <select class="form-select" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>

                    <button onClick={handleStatus} class="btn btn-primary w-100">Update Status</button>

                    <h4 class="mt-5 mb-3">Order Invoice</h4>
                    <Link to={`/invoice/order/${order?._id}`} class="btn btn-success w-100">
                        {/* <Link  class="fa fa-print"> */}
                        Generate Invoice
                        {/* </Link>  */}
                    </Link>
                </div>
            </div>
            </div>



        </AdminLayout >
    )
}

export default ProcessOrder

import React, { useEffect } from 'react'
import { useMyOrdersQuery } from '../../reudx/API/orderApi'
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../layouts/Loader";
import toast from 'react-hot-toast';
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaEye, FaPrint } from "react-icons/fa6";
import { clearCart } from '../../reudx/features/cartSlice';

const MyOrder = () => {

    const { isAuthenticated } = useSelector((state) => state.auth)
    const { data, isError, isLoading, error, isSuccess } = useMyOrdersQuery();
  

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderSuccess = searchParams.get("order_success")

    useEffect(() => {
        if (error) {
            toast?.error(error?.data?.message);
        }
        if (orderSuccess) {
            dispatch(clearCart());
            navigate("/me/orders")
        }

    }, [error, orderSuccess])

    if (isLoading) return <Loader />

    const setData = () => {

        const orders = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Amount Paid",
                    field: "amount",
                    sort: "asc"
                },
                {
                    label: "Payment Status",
                    field: "status",
                    sort: "asc"
                },
                {
                    label: "Order Status",
                    field: "orderStatus",
                    sort: "asc"
                }, {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        }

        data?.order?.map((item) => {
            orders.rows.push({
                id: item._id,
                amount: `$${item.totalPrice}`,
                status: item?.paymentInfo?.status ? item?.paymentInfo?.status.toUpperCase() : "NOT PAID",
                orderStatus: item.orderStatus,
                actions: <>
                    <Link to={`/me/order/${item._id}`} className="btn btn-primary ">
                        <FaEye /></Link>
                    <Link to={`/invoice/order/${item._id}`} className="btn btn-success mx-1 ">
                        <FaPrint /></Link>
                </>

            })

        })

        return orders
    }

    return (
        <div>
            <h2 className="my-5">{data?.order?.length} Orders</h2>
            <MDBDataTable
                data={setData()}
                className=" px-3"
                bordered
                striped
                hover
            />
        </div>
    )
}

export default MyOrder
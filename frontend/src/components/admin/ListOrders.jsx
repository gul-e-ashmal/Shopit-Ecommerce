import React, { useEffect } from 'react'
import AdminLayout from '../layouts/AdminLayout';
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from '../../reudx/API/orderApi'
// import { useDispatch, useSelector } from 'react-redux';
import Loader from "../layouts/Loader";
import toast from 'react-hot-toast';
import { MDBDataTable } from "mdbreact";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const ListOrders = () => {

    const { data, isLoading, error } = useGetAdminOrdersQuery();
    const [deleteOrder, { error: deleteError, isSuccess }] = useDeleteOrderMutation();

    useEffect(() => {
        if (error) {
            toast?.error(error?.data?.message);
        }
        if (deleteError) {
            toast?.error(deleteError?.data?.message);
        }
        if (isSuccess) {
            toast?.success("Order deleted succcessfully");
        }

    }, [error, deleteError, isSuccess])

    if (isLoading) return <Loader />

    const handleDeleteButton = (e, id) => {
        e.preventDefault();
        deleteOrder({ id })
    }

    const setData = () => {

        const orders = {
            columns: [
                {
                    label: "ID",
                    field: "id",
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
                status: item?.paymentInfo?.status ? item?.paymentInfo?.status.toUpperCase() : "NOT PAID",
                orderStatus: item.orderStatus,
                actions: <>
                    <Link to={`/admin/order/${item._id}`} className="btn btn-primary ">
                        <FaEdit /></Link>
                    <Link onClick={(e) => handleDeleteButton(e, item._id)} className="btn btn-success mx-1 ">
                        <MdDelete /></Link>
                </>

            })

        })

        return orders
    }


    return (
        <AdminLayout>
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
        </AdminLayout>

    )
}

export default ListOrders
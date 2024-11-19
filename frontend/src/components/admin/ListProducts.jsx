import React, { useEffect } from 'react'
import AdminLayout from '../layouts/AdminLayout';
import Loader from "../layouts/Loader";
import toast from 'react-hot-toast';
import { MDBDataTable } from "mdbreact";
import { Link } from 'react-router-dom';
import { FaEdit, FaImage } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDeleteProductsMutation, useGetAdminProductsQuery } from '../../reudx/API/productApi';

const ListProducts = () => {
    const { data, isLoading, error } = useGetAdminProductsQuery();
    const [deleteProducts, { error: deleteError, isSuccess }] = useDeleteProductsMutation();

    useEffect(() => {
        if (error) {
            toast?.error(error?.data?.message);
        }
        if (deleteError) {
            toast?.error(deleteError?.data?.message);
        }
        if (isSuccess) {
            toast?.success("Product deleted succcessfully");
        }

    }, [error,deleteError, isSuccess
    ])

    if (isLoading) return <Loader />

    const handleDeleteButton = (e, id) => {
        e.preventDefault();
        deleteProducts({ id })
    }

    const setData = () => {

        const products = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Stock",
                    field: "stock",
                    sort: "asc"
                }, {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        }

        data?.products?.map((item) => {
            products.rows.push({
                id: `${item._id}`,
                name: `${item.name.substring(0, 20)}...`,
                stock: item.stock,
                role: item.role,
                actions: <>
                    <Link to={`/admin/products/${item._id}`} className="btn btn-outline-primary ">
                        <FaEdit /></Link>
                    <Link to={`/admin/products/${item._id}/uploadImages`} className="btn btn-outline-success ">
                        <FaImage /></Link>
                    <Link
                        onClick={(e) => handleDeleteButton(e, item._id)}
                        className="btn btn-outline-danger  ">
                        <MdDelete /></Link>
                </>
            })
        })

        return products
    }
    // 
    return (
        <AdminLayout>
            <div className=' '>
                <h2 className="my-5">{data?.products?.length} Products</h2>
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

export default ListProducts
import React, { useEffect } from 'react'
import AdminLayout from '../layouts/AdminLayout';
import { useDeleteUserMutation, useGetAdminUserQuery } from '../../reudx/API/userApi';
import Loader from "../layouts/Loader";
import toast from 'react-hot-toast';
import { MDBDataTable } from "mdbreact";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ListUsers = () => {
    const { data, isLoading, error } = useGetAdminUserQuery();
    const [deleteOrder, { error: deleteError, isSuccess }] = useDeleteUserMutation();

    useEffect(() => {
        if (error) {
            toast?.error(error?.data?.message);
        }
        if (deleteError) {
            toast?.error(deleteError?.data?.message);
        }
        if (isSuccess) {
            toast?.success("User deleted succcessfully");
        }

    }, [error, deleteError, isSuccess
    ])

    if (isLoading) return <Loader />

    const handleDeleteButton = (e, id) => {
        e.preventDefault();
        deleteOrder({ id })
    }

    const setData = () => {

        const users = {
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
                    label: "Email",
                    field: "email",
                    sort: "asc"
                }, {
                    label: "Role",
                    field: "role",
                    sort: "asc"
                }, {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        }

        data?.user?.map((item) => {
            users.rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                actions: <>
                    <Link to={`/admin/users/${item._id}`} className="btn btn-primary ">
                        <FaEdit /></Link>
                    <Link
                        onClick={(e) => handleDeleteButton(e, item._id)}
                        className="btn btn-success  ">
                        <MdDelete /></Link>
                </>
            })
        })

        return users
    }
    // 
    return (
        <AdminLayout>
            <div className=' '>
                <h2 className="my-5">{data?.user?.length} Users</h2>
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

export default ListUsers
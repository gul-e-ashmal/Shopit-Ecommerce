import React, { useState, useEffect } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { useGetAdminSingleUserQuery, useUpdateUserMutation } from '../../reudx/API/userApi';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';


const UpdateUser = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const param = useParams();


    const { data, error: getUserError } = useGetAdminSingleUserQuery(param.id);
    const [updateUser, { error, isSuccess }] = useUpdateUserMutation()

    useEffect(() => {
        if (data) {
            setName(data?.user?.name);
            setEmail(data?.user?.email);
            setRole(data?.user?.role);
        }

    }, [data])

    useEffect(() => {

        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Update Successfully");
        }
        if (getUserError) {
            toast.error(getUserError?.data?.message);
        }

    }, [error, isSuccess, getUserError])

    const handleSubmit = (e) => {

        e.preventDefault();

        updateUser({ id: data?.user?._id, newData: { name, email, role } })
    }

    return (
        <AdminLayout> <div class="row wrapper">
            <div class="col-10 col-lg-8">
                <form class="shadow-lg" onSubmit={handleSubmit}>
                    <h2 class="mb-4">Update User</h2>

                    <div class="mb-3">
                        <label for="name_field" class="form-label">Name</label>
                        <input
                            type="name"
                            id="name_field"
                            class="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div class="mb-3">
                        <label for="email_field" class="form-label">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            class="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div class="mb-3">
                        <label for="role_field" class="form-label">Role</label>
                        <select id="role_field" class="form-select" name="role" value={role}
                            onChange={(e) => setRole(e.target.value)}>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <button type="submit" class="btn update-btn w-100 py-2">
                        Update
                    </button>
                </form>
            </div>
        </div></AdminLayout>
    )
}

export default UpdateUser
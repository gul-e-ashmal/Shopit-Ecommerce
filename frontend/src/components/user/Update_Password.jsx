import React, { useState, useEffect } from 'react'
import UserLayout from '../layouts/UserLayout'
import { useUpdatePasswordMutation } from '../../reudx/API/userApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Update_Password = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate()

    const [updatePassword, { isLoading, isSuccess, error }] = useUpdatePasswordMutation();

    useEffect(() => {

        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Update Successfully");
            navigate("/me/profile")
        }

    }, [error, isSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();

        updatePassword({ oldpassword: oldPassword, password: newPassword })

    }

    return (
        <UserLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form className="shadow rounded bg-body" action="#" method="post" onSubmit={handleSubmit}>
                        <h2 className="mb-4">Update Password</h2>
                        <div className="mb-3">
                            <label htmlFor="old_password_field" className="form-label">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="new_password_field" className="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
                            {isLoading ? "Updating ..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>

    )
}

export default Update_Password
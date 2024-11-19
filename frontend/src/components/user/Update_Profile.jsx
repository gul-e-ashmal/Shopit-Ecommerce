import React, { useState, useEffect } from 'react'
import UserLayout from '../layouts/UserLayout'
import { useUpdateProfileMutation } from '../../reudx/API/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Update_Profile = () => {

    const { user } = useSelector((state) => state.auth);

    const [email, setEmail] = useState(user?.email);
    const [name, setName] = useState(user?.name);

    const navigate = useNavigate();

    const [updateProfile, { data, isLoading, isSuccess, error }] = useUpdateProfileMutation();


    useEffect(() => {

        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Update Successfully");
            navigate("/me/profile")
        }

    }, [isLoading, isSuccess])

    const handleSubmit = (e) => {

        e.preventDefault();

        updateProfile({ name, email });
    }


    return (
        <UserLayout >
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form
                        className="shadow rounded bg-body"
                        action="#"
                        method="post"
                        enctype="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="mb-4">Update Profile</h2>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label"> Name </label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label"> Email </label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn w-100">{isLoading ? "Updating" : "Update"}</button>
                    </form>
                </div>
            </div>
        </UserLayout >
    )
}

export default Update_Profile
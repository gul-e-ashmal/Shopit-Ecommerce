import React, { useState, useEffect } from 'react'
import UserLayout from '../layouts/UserLayout'
import { useUpdateAvatarMutation } from '../../reudx/API/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Update_Avatar = () => {

    const { user } = useSelector((state) => state.auth);

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar ? user?.avatar : "../../public/images/default_avatar.jpg");
    const navigate = useNavigate()

    const [updateAvatar, { isLoading, isSuccess, error }] = useUpdateAvatarMutation();

    useEffect(() => {

        if (error) {
            toast.error(error?.data);
        }

        if (isSuccess) {
            toast.success("Update Successfully");
            navigate("/me/profile")
        }

    }, [error, isSuccess])


    const handleSubmit = (e) => {
        e.preventDefault();
        updateAvatar({ avatar} )
    }

    const onChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                setAvatarPreview(reader.result);
                console.log(reader.result)

            }
        }

        reader.readAsDataURL(e.target.files[0])
    }


    return (
        <UserLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form
                        className="shadow rounded bg-body"
                        // action="#"
                        method="post"
                        enctype="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="mb-4">Upload Avatar</h2>

                        <div className="mb-3">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <figure className="avatar item-rtl">
                                        <img src={avatarPreview} className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="input-foam">
                                    <label className="form-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="form-control"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn w-100 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating" : "Update Avatar"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default Update_Avatar
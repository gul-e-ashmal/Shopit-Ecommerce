import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useResetPasswordMutation } from '../../reudx/API/authApi';


const Reset_Password = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (error) {
            console.log(error.data);
            toast.error(error?.data?.message)
        };
        if (isSuccess) {
            toast.success("Password reset sucessfully");
            navigate("/login")
        }
    }, [error, isSuccess])

    const handleSubmit = (e) => {

        e.preventDefault();

        const userData = { password, confirmPassword };

        console.log(userData);

        resetPassword({ token: param?.token, password, confirmPassword });
    }


    return (
        <div className="row wrapper mt-5">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    action="your_submit_url_here"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <h2 className="mb-4">New Password</h2>

                    <div className="mb-3">
                        <label htmlFor="password_field" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirm_password_field" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button id="new_password_button" type="submit" className="btn w-100 py-2">
                        Set Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Reset_Password;
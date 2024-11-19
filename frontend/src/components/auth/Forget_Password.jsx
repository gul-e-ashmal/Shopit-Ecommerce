import React, { useEffect, useState } from 'react'
import { useForgetPasswordMutation } from '../../reudx/API/authApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Forget_Password = () => {

    const [email, setMail] = useState("");

    const [forgetPassword, { isLoading, data, error, isSuccess }] = useForgetPasswordMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);
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
            toast.success("Check you mail");
        }
    }, [error, isSuccess])


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email);


        forgetPassword({email});
    }
    return (
        <div>
            <div class="row wrapper mt-5">
                <div class="col-10 col-lg-5">
                    <form
                        class="shadow rounded bg-body"
                        action="your_submit_url_here"
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        <h2 class="mb-4">Forgot Password</h2>
                        <div class="mt-3">
                            <label for="email_field" class="form-label">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                class="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            class="btn w-100 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending" : "Send Email"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forget_Password
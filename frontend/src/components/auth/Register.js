import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRegisterMutation } from '../../reudx/API/authApi'

const Register = () => {

  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const [register, { isLoading, isError, error, data }] = useRegisterMutation();


  console.log(data);
  useEffect(() => {

    if (error) {
      toast.error(error?.data?.message);
    }

  }, [isError])


  const handleSubmit = (e) => {

    e.preventDefault();

    register(user);
  }
  return (

    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          method="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading} >
            {isLoading ? "LOADING..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
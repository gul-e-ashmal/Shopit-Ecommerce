import React from 'react'
import UserLayout from '../layouts/UserLayout'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {user}=useSelector((state)=> state.auth)
  
  return (
    <UserLayout >
      <div class="row justify-content-around mt-5 user-info">

        <div class="col-12 col-md-3">
          <figure class="avatar avatar-profile">
            <img
              class="rounded-circle img-fluid"
              src={user?.avatar ? user?.avatar.url :"../images/default_avatar.jpg"}
              alt=""
            />
          </figure>
        </div>

        <div class="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{user?.name}</p>

          <h4>Email Address</h4>
          <p>{user?.email}</p>

          <h4>Joined On</h4>
          <p>{user?.createdAt.toString().substring(0, 10)}</p>
        </div>
      </div>
    </UserLayout>
  )
}

export default Profile
import React from 'react'
import SideMenu from './SideMenu'
import { FaUser, FaUserCircle, FaLock } from 'react-icons/fa'

const UserLayout = ({children}) => {
    const menu = [
        { name: "Profile", url: "/me/profile", icon: <FaUser /> },
        { name: "Update Profile", url: "/me/update_profile", icon: <FaUser /> },
        { name: "Update Avatar", url: "/me/update_avatar", icon: <FaUserCircle /> },
        { name: "Update Password", url: "/me/update_password", icon: <FaLock /> }
    ]
    return (
        <div>
            <div className=' text-center py-3 my-2'>
                <h3>User's Setting</h3>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <SideMenu menu={menu} />
                    </div>
                    <div className=' col-lg-7'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout
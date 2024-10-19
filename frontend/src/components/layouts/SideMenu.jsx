import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser,FaUserCircle,FaLock } from 'react-icons/fa'

const SideMenu = () => {

    const menu = [
        { name: "Profile", url: "/me/profile", icon: <FaUser /> },
        { name: "Update Profile", url: "", icon: <FaUser /> },
        { name: "Update Avatar", url: "", icon:<FaUserCircle /> },
        { name: "Update Password", url: "", icon: <FaLock /> }
    ]

    return (
        <div>
            <ul className=' list-unstyled'>
                {
                    menu.map((item, index) => (
                    // <li className=' fw-bold list-group-item list-group-item-action active'> <Link to={`${item.url}`} className=' text-decoration-none text-dark py-3'> {item?.icon} {item?.name}</Link></li>
                    <Link
                    to={`${item.url}`}
                    // href="menu-item-url-2"
                    class="fw-bold list-group-item list-group-item-action active p-2 ,m-1"
                    aria-current="true"
                  >
                    {/* <i class="menu-item-icon-2 fa-fw pe-2"></i> */}
                    {item?.icon} <span className=' p-1'>{item?.name}</span>
                  </Link>    
                ))
                }

            </ul>
        </div>
    )
}

export default SideMenu
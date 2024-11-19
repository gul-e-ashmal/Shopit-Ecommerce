import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { FaUser, FaUserCircle, FaLock } from 'react-icons/fa'
import "../../App.css"

const SideMenu = ({menu}) => {

    // const menu = [
    //     { name: "Profile", url: "/me/profile", icon: <FaUser /> },
    //     { name: "Update Profile", url: "/me/update_profile", icon: <FaUser /> },
    //     { name: "Update Avatar", url: "/me/update_avatar", icon: <FaUserCircle /> },
    //     { name: "Update Password", url: "/me/update_password", icon: <FaLock /> }
    // ]

    const location = useLocation();
    const [ActiveSetting, setActiveSetting] = useState(location.pathname);

    const handleClickSetting = (url) => {
        setActiveSetting(url);
    }

    return (
        <div className=' mt-5'>
            <ul className='list-group list-unstyled'>
                {
                    menu.map((item, index) => (
                        <Link
                            to={`${item.url}`}
                            key={index}
                            className={`fw-bold list-group-item list-group-item-action  p-2 ,m-1 ${ActiveSetting.toString() == item.url ? `active` : ``}`}
                            aria-current={ActiveSetting.toString() == item.url ? `true` : `false`}
                            onClick={() => handleClickSetting(item.url)}
                        >
                            {/* <i className="menu-item-icon-2 fa-fw pe-2"></i> */}
                            {item?.icon} <span className={` p-1`}>{item?.name}</span>
                        </Link>
                    ))
                }

            </ul>
        </div>
    )
}

export default SideMenu
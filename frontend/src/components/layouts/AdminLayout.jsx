import React from 'react'
import SideMenu from './SideMenu'
import { FaTachometerAlt, FaPlus, FaProductHunt, FaReceipt, FaUser, FaStar } from "react-icons/fa";

const AdminLayout = ({ children }) => {

    const menu = [
        { name: "Dashboard", url: "/admin/dashboard", icon: <FaTachometerAlt /> },
        { name: "New Products", url: "/admin/product/new", icon: <FaPlus /> },
        { name: "Products", url: "/admin/products", icon: <FaProductHunt /> },
        { name: "Order", url: "/admin/orders", icon: <FaReceipt /> },
        { name: "Users", url: "/admin/users", icon: <FaUser /> },
        { name: "Reviews", url: "/admin/reviews", icon: <FaStar /> }
    ]
    return (
        <div>
            <div className=' text-center py-3 my-2'>
                <h3>Admin's Setting</h3>
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

export default AdminLayout
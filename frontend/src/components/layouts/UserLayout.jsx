import React from 'react'
import SideMenu from './SideMenu'

const UserLayout = ({children}) => {
    return (
        <div>
            <div className=' text-center py-3 my-2'>
                <h3>User's Setting</h3>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lag-3'>
                        <SideMenu />
                    </div>
                    <div className=' col-lg-8'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout
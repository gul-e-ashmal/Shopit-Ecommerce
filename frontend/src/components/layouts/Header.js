import React, { Fragment } from 'react'
import "../../App.css"
import Search from './Search'
import { useGetMeQuery } from '../../reudx/API/userApi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLazyLogoutQuery } from '../../reudx/API/authApi'

const Header = () => {

  const { isLoading, isError, error } = useGetMeQuery();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [logout, { data }] = useLazyLogoutQuery();

  const logoutHandle = async () => {
    await logout();
    navigate(0);

  }

  return (
    <header >
      <nav className=' nav navbar container d-flex justify-content-between'>
        <div className=' logo'></div>
        <Search />
        <div className=' cartInfo'></div>
        <div className=' userInfo'></div>

        <div className=' userInfo'>
          {
            user ? (<div className='dropdown ms-4'>
              <button className=' d-flex btn  text-light text-center' data-bs-toggle='dropdown' aria-expanded="false">
                <img className="rounded-circle " height={40} width={40} src={require('../../images/default_avatar.jpg')} />
                <p className='dropdown-toggle p-1'>{user?.name}</p>
              </button>
              <ul className=' dropdown-menu p-2'>
               <li> <Link className=' dropdown-list text-decoration-none text-dark'>Dashboard </Link></li>
               <li><Link  to={`/me/profile`} className=' dropdown-list text-decoration-none text-dark'>Profile </Link></li> 
                <li><Link className=' dropdown-list text-decoration-none text-dark'>Orders </Link></li>
                <Link onClick={logoutHandle} className=' dropdown-list text-danger'>
                  {/* <Link  > */}
                  Logout
                  {/* </Link>  */}
                </Link>
              </ul>
            </div>) : !isLoading && (<Link to={'/login'} className='login-btn'>Login</Link>)
          }
        </div>



      </nav>
    </header>
  )
}

export default Header
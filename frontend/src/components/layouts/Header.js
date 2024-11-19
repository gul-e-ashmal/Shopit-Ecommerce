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
  const { cartItems } = useSelector((state) => state.cart);
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
        <div className=' cartInfo col-12 col-md-3 mt-4 mt-md-0 text-center'>
          <a href="/cart" className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
            <span id="cart" class="ms-3"> Cart </span>
            <span class="ms-1" id="cart_count">{cartItems.length}</span>
          </a>
        </div>

        <div className=' userInfo'>
          {
            user ? (<div className='dropdown ms-4'>
              <button className=' d-flex btn  text-light text-center' data-bs-toggle='dropdown' aria-expanded="false">
                <img className="rounded-circle " height={40} width={40} src={require('../../images/default_avatar.jpg')} />
                <p className='dropdown-toggle p-1'>{user?.name}</p>
              </button>
              <ul className=' dropdown-menu p-2'>
                {
                  user.role == "admin" && <li> <Link to={`/admin/dashboard`} className=' dropdown-list text-decoration-none text-dark'>Dashboard </Link></li>
                }
                <li><Link to={`/me/profile`} className=' dropdown-list text-decoration-none text-dark'>Profile </Link></li>
                <li><Link to={`/me/orders`} className=' dropdown-list text-decoration-none text-dark'>Orders </Link></li>
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
import React from 'react'
import logo from '../Logo_v2_bg_black_svg.svg'
import {Link, useLocation} from 'react-router'

function Sidebar() {

  const location = useLocation()

  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <img src={logo} alt='logo'></img>
      </div>
      <div className='sidebar-items'>
        <Link to={'home'} className={`${location.pathname.includes('home')?'active-nav-item': ''} sidebar-item`}><i className="fa-solid fa-house"></i>Home</Link>
        <Link to={'admin'} className={`${location.pathname.includes('admin')?'active-nav-item': ''} sidebar-item`}><i className="fa-solid fa-star"></i>Admin</Link>
        <Link to={'/login'} className='sidebar-item'><i className="fa-solid fa-right-from-bracket"></i>Log out</Link>
      </div>
    </div>
  )
}

export default Sidebar

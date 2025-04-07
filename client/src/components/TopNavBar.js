import React from 'react'
import { NavLink, useLocation } from "react-router";

function TopNavBar() {

    const location = useLocation()
    
    const handleLinks = () => {
        if (location.pathname === '/login') {
            return <NavLink to={"/"}>Home</NavLink>
        } else {
            return <NavLink to={"/login"}>Login</NavLink>
        }
    }

  return (
    <div>
        <div className='top-navbar'>
            <div className='logo'>
                <h1>SyncHR.</h1>
            </div>
            {handleLinks()}
        </div>
    </div>
  )
}

export default TopNavBar

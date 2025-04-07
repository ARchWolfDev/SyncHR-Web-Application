import React from 'react'
import {Outlet} from 'react-router'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

function ApplicationLayout() {
  return (
    <div>
        <Sidebar />
        <Header />
        <div className='content'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default ApplicationLayout

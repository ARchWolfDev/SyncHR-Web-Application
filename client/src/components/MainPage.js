import React from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
  return (
    <div>
        <h5>Welcome</h5>
        <nav>
            <Link to={'/login'}>Go to app</Link>
        </nav>
    </div>
  )
}

export default MainPage

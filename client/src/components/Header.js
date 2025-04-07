import React from 'react'
import Avatar from './Avatar'

function Header() {
  return (
    <div className='header'>
      <div className='prompt'>
        <h1>Welcome Andrei!</h1>
        <p>Role</p>
      </div>
      <Avatar name='Andrei Rachieru' size={100}/>
    </div>
  )
}

export default Header

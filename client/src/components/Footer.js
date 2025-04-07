import React from 'react'

function Footer() {

    const year = new Date()

  return (
    <div className='footer'>
      <p>© Copyright {year.getFullYear()} SyncHR.</p>
      <p>Designed and build by ARch DEV Team.</p>
    </div>
  )
}

export default Footer

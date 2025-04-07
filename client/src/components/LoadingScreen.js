import React from 'react'

function LoadingScreen() {
  return (
    <div className='loading-screen'>
        <div className='logo'>
            <h1 className='pulse'>SyncHR.</h1>
        </div>
        <div className='created-by'>
            <h6>Crated By</h6>
            <h4><strong>ARch</strong><span className='brand'>DEV</span></h4>
        </div>
    </div>
  )
}

export default LoadingScreen

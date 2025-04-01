import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from './UserProvider'
import LoadingPage from './LoadingPage'
import { useToastContext } from './ToastMessageBoxProvider'
import secureLocalStorage from 'react-secure-storage'

function ProtectedRoute() {

  const {currentUser, setCurrentUser, userVerifyed} = useUserContext()
  const {handleToastMessageBox} = useToastContext()
  const navigate = useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/refreshToken')
        const data = await response.json()

        if (!response.ok) {
          navigate('/login')
          handleToastMessageBox(true, data.message)
          localStorage.removeItem('token')
          secureLocalStorage.removeItem('uics')
        }
      } catch (error) {
        console.error(error)
      }
    }
    const interval = setInterval(() => {
      checkToken()
    }, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [handleToastMessageBox, navigate])

  useEffect(() => {
    const onLoginConfig = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/preferences', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          setCurrentUser(data.data)
        } else {
          console.log(data.message)
          navigate('/login')
          handleToastMessageBox(true, data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (!currentUser) {
      onLoginConfig()
      console.log("Fetching the Configuration")
    }
  }, [handleToastMessageBox, navigate, currentUser, setCurrentUser])

  if (!userVerifyed) {
    return <LoadingPage />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute

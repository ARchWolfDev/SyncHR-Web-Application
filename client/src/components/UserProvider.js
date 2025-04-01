import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const UserContext = createContext()

export const UserProvider = ({children}) => {

    // uics - user interface config settings

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = secureLocalStorage.getItem('uics')
        return storedUser? storedUser : null
    })
    const userVerifyed = currentUser !== null

    const handleLogoutUser = () => {
        setCurrentUser(null)
        secureLocalStorage.removeItem('uics')
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
        if (currentUser) {
            secureLocalStorage.setItem('uics', currentUser)
        } else {
            secureLocalStorage.removeItem('uics')
        }
    }, [currentUser])

    console.log(currentUser)
    
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, userVerifyed, handleLogoutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)

import React, { createContext, useContext, useState } from 'react'
import { CloseButton } from 'react-bootstrap'

const ToastContext = createContext()

export const ToastMessageBoxProvider = ({children}) => {

    const [visibility, setVisibility] = useState(false)
    const [error, setError] = useState('')
    const [icon, setIcon] = useState(<i className="fa-solid fa-circle-check"></i>)
    const [message, setMessage] = useState('')

    const handleToastMessageBox = (error, text) => {
      // set error as 'true' or 'false' if exist, set message that you want to appear on the Toast Box
        if (error) {
            setError('error')
            setIcon(<i className="fa-solid fa-triangle-exclamation"></i>)
            if (text) {setMessage(text)} else {setMessage('Something is Wrong!')}
        } else {
            setError('')
            setIcon(<i className="fa-solid fa-circle-check"></i>)
            if (text) {setMessage(text)} else {setMessage('Request submited successfully')}
        }
        setVisibility(true)
        if (visibility === false) {
          const timer = setTimeout(() => {
            setVisibility(false)
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
    
      const handleButtonFromToast = () => {
        setVisibility(false)
      }

  return (
    <ToastContext.Provider value={{handleToastMessageBox}}>
        {children}
        <div className={`${error} ${visibility? 'show-toast': ''} toast-message-box`}>
            <p className='toast-message' >{icon} {message}</p>
            <CloseButton onClick={handleButtonFromToast}/>
        </div>
    </ToastContext.Provider>
  )
}

export const useToastContext = () => useContext(ToastContext)

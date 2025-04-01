import React, { useState } from 'react'
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useToastContext } from './ToastMessageBoxProvider'
import { useUserContext } from './UserProvider'


function LoginPage() {

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [backgroundAnimation, setBackgroundAnimation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {handleToastMessageBox} = useToastContext()

    const handleEmailAddress = (e) => {setEmailAddress(e.target.value)}
    const handlePassword = (e) => {setPassword(e.target.value)}
    const handleShowPassword = () => {setShowPassword(!showPassword)     }

    const handleLoginButton = async (e) => {
        e.preventDefault()
        setBackgroundAnimation(true)
        setIsLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({emailAddress, password})
            })

            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('token', data.token)
                handleToastMessageBox(false, data.message)
                navigate('/home')
            } else {
                handleToastMessageBox(true, data.message)
            }
        } catch (error) {
            alert(`Login not possible. Please try again later`)
            console.error(error)
        } finally {
            setBackgroundAnimation(false)
            setIsLoading(false)
        }
    }

  return (
    <div className={`login-page ${backgroundAnimation?'animate-background': ''}`}>
      <Navbar expand="lg"  style={{padding: '30px'}}>
        <Container>
            <Navbar.Brand>
                {/* <img src={logo}></img> */}
                <h1 className='logo'>Sync.</h1></Navbar.Brand>
            <Nav className='nav-bar-links'>  
                <Nav.Link style={{textDecoration: 'none'}}>Home</Nav.Link>
                <Nav.Link >Arch DEV</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <div className='login-box'>
        <h3 style={{marginBottom: 20}}>Login</h3>
        <Form onSubmit={handleLoginButton}>
            <Form.Group className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control placeholder='Email' type="email" onChange={handleEmailAddress}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control placeholder='Password' type={showPassword? 'text': 'password'} onChange={handlePassword}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Check 
                    type="checkbox" 
                    label="Show Password" 
                    checked={showPassword}
                    onChange={handleShowPassword}
                />
            </Form.Group>
            <Button type='submit' style={{float: 'right'}} disabled={isLoading}>{isLoading? 'Loading...': 'Login'}</Button>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage

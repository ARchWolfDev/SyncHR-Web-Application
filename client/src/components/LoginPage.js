import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { Button, Form } from "react-bootstrap"
import TopNavBar from './TopNavBar';

function LoginPage() {

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [backgroundAnimation, setBackgroundAnimation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailAddress = (e) => {setEmailAddress(e.target.value)}
  const handlePassword = (e) => {setPassword(e.target.value)}
  const handleShowPassword = () => {setShowPassword(!showPassword)}
  const handleLoginButton = async (e) => {
    e.preventDefault()
    setBackgroundAnimation(true)
    setIsLoading(true)
    try {
        const respone = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({emailAddress, password})
      })
      const data = await respone.json()
      if (respone.ok) {
        localStorage.setItem('token', data.token)
        navigate('/app/home')
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert(error)
      console.error(error)
    } finally {
      setBackgroundAnimation(false)
      setIsLoading(false)
    }
  }

  return (
    <div className={`login-page ${backgroundAnimation?'animate-background': ''}`}>
      <TopNavBar />
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

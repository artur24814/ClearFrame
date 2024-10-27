import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterForm } from './components/registerForm.js'

export default function Register() {
  const navigate = useNavigate()
  
  const handleLoginRedirect = () => {
    navigate('/login')
  }
  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onLogin={handleLoginRedirect} />
    </div>
  )
}
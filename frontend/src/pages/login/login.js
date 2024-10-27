import React from 'react'
import { LoginForm } from "./components/loginForm"

export const Login = ({ onLogin }) => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={onLogin} />
    </div>
  )
}
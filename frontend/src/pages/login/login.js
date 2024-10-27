import React from 'react'
import { LoginForm } from "./components/loginForm"

export const Login = ({ redirectPath = '/' }) => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={redirectPath} />
    </div>
  )
}
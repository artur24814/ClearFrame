import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/autContext.js'
import LoginPage from '../../pages/login/login.js'

export const WithAuth = (Component) => {
  return (props) => {
    const {isAuthenticated} = useAuth()
    const location = useLocation()

    useEffect(() => {
      if (isAuthenticated) {
        // Save user data in localStorage if authenticated
        // localStorage.setItem('user', JSON.stringify(user))

        console.log('User logged in')
      }
    }, [isAuthenticated])

    if (!isAuthenticated) {
      return <LoginPage redirectPath={location.pathname} />;
    }

    return <Component {...props} />
  }
}
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/autContext.js'
import Login from '../../pages/login/login.js'

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    useEffect(() => {
      if (isAuthenticated) {
        console.log('User logged in')
        // Here you can save user data to localStorage if you want
        // localStorage.setItem('user', JSON.stringify(user)); // Uncomment and use as needed
      }
    }, [isAuthenticated])

    if (!isAuthenticated) {
      return <Login redirectPath={location.pathname} />
    }

    // If authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth
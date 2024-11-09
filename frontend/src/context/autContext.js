import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AutProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [expiretime, setExpiretime] = useState(localStorage.getItem('expiretime'))

  const login = (response, expireTokenTime) => {
    setIsAuthenticated(true)
    setUser(response.user)
    setToken(response.token)
    setExpiretime(expireTokenTime)
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', response.user)
    localStorage.setItem('expiretime', expireTokenTime)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
    setExpiretime(null)

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('expiretime')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token, expiretime }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
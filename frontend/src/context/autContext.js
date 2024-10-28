import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AutProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const login = (response) => {
    setIsAuthenticated(true)
    setUser(response.user)
    setToken(response.token)

    localStorage.setItem('token', response.token)
    localStorage.setItem('user', response.user)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
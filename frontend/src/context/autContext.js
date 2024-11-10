import React, { createContext, useContext, useState } from 'react'
import { MAX_TOKEN_LIFE_TIME } from '../conf/tokenConf.js'

const AuthContext = createContext()

export const AutProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [expiretime, setExpiretime] = useState(localStorage.getItem('expiretime'))

  const login = (response) => {
    const currentTime = Date.now()
    const newExpiretime = currentTime + MAX_TOKEN_LIFE_TIME
    setIsAuthenticated(true)
    setUser(response.user)
    setToken(response.token)
    setExpiretime(newExpiretime)
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', response.user)
    localStorage.setItem('expiretime', newExpiretime)
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
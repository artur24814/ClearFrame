import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar ({ isAuthenticated, onLogout}){
  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <Link to="/register">Register</Link>
      )}
    </nav>
  )
}
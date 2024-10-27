
import './App.css';
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home.js'
import Register from './pages/register/register.js'
import { Login } from './pages/login/login.js'
import NavbarComponent from './components/navbar.js'
import { AutProvider } from './context/autContext.js';

const queryClient = new QueryClient()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogout = () => setIsAuthenticated(false)

  return (
    <AutProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <NavbarComponent isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </AutProvider>
  )
}

export default App;

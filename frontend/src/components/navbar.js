import React, { useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/autContext'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import '../styles/navbar.css'
import api from '../conf/axiosConf.js'
import { MAX_TOKEN_LIFE_TIME } from '../conf/tokenConf.js'
import AutheticationError from '../errors/AuthenticationError.js'


export default function NavbarComponent (){
  const navigate = useNavigate()
  const { isAuthenticated, logout, user, expiretime } = useAuth()
  const intervalRef = useRef(null)

  const handleLogout = useCallback(() => {
    logout()
    navigate('/')
  }, [logout, navigate])

  const refreshTokenFunc = useCallback( async () => {
    if (isAuthenticated) {

      if (isTokenExpired(expiretime)) {
        console.log(':: TOKEN EXPIRED')
        try {
          const response = await api.post('/api/auth/refresh',{}, { withCredentials: true })
          if (response.status === 200 && response.data.token) {
            console.log('Set new token')
            localStorage.setItem('token', response.data.token)
          } else {
            throw new AutheticationError()
          }
        } catch (e) {
          console.log('Error via refreshing token....', e)
          handleLogout()
        }
      }
    } 
  }, [isAuthenticated, expiretime, handleLogout])

  const isTokenExpired = (expiretime) => {
    const currentTime = Date.now()
    return currentTime >= expiretime
  }

  useEffect(() => {
    intervalRef.current = setInterval(refreshTokenFunc, MAX_TOKEN_LIFE_TIME);

    return () => clearInterval(intervalRef.current)
  }, [refreshTokenFunc])

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">clearFrame</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/user/image-processing'>Features</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {isAuthenticated ? (
            <Nav>
              <Nav.Link as={Link} to="/" className='mt-1'>
                {user}
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <Button variant="outline-light" onClick={handleLogout} className="me-2">
                  Logout
                </Button>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-light" className="me-2">
                  Login
                </Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                <Button variant="outline-light" className="me-2">
                  Register
                </Button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/autContext'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import '../styles/navbar.css'


export default function NavbarComponent (){
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
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
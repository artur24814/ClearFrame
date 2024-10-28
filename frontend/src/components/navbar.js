import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/autContext'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import '../styles/navbar.css'


export default function NavbarComponent (){
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-custom">
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
              <Nav.Link>
                {user}
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <button onClick={handleLogout}>Logout</button>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/autContext'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'


export default function NavbarComponent (){
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className="ms-1 me-1">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {isAuthenticated ? (
            <Nav.Link as={Link} to={isAuthenticated ? "/" : "/register"}>
              <button onClick={handleLogout}>Logout</button>
            </Nav.Link>
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
    // <Navbar bg="dark" variant="dark" expand="lg" className="bg-body-tertiary justify-content-between">
    //   <Container>
    //     <Navbar.Brand href="#home">clearFrame</Navbar.Brand>
    //       <Nav>
    //         <Nav.Link><Link to="/">Home</Link>
    //           {isAuthenticated ? (
    //             <button onClick={handleLogout}>Logout</button>
    //           ) : (
    //             <Link to="/register">Register</Link>
    //           )}
    //         </Nav.Link>
    //       </Nav>
    //   </Container>
    // </Navbar>
  )
}
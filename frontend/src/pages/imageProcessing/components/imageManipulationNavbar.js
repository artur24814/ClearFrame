import React from "react"
import { Navbar, Nav, Button} from 'react-bootstrap'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

function ImageManipulationNavbar () {
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand>Image Manipulation</Navbar.Brand>
      <Nav>
        <Button variant="outline-light" className="me-2">
          <BsPencil /> Edit
        </Button>
        <Button variant="outline-light" className="me-2">
          <BsFillTrashFill /> Delete
        </Button>
      </Nav>
    </Navbar>
  )
}

export default ImageManipulationNavbar
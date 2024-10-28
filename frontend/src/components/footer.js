import React from 'react'
import { Container } from 'react-bootstrap'
import '../styles/footer.css'

export default function Footer () {
  return (
    <footer id="contact" className="footer-section text-center py-4">
      <Container>
        <p>&copy; {new Date().getFullYear()} clearFrame. All rights reserved.</p>
        <p>Email: support@clearframe.com</p>
      </Container>
    </footer>
  )
}
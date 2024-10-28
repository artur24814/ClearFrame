import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterForm } from './components/registerForm.js'
import { Card, Container, Row, Col } from 'react-bootstrap'

export default function Register() {
  const navigate = useNavigate()
  
  const handleLoginRedirect = () => {
    navigate('/login')
  }
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h3 className="text-center mb-4">Register</h3>
                            <RegisterForm onLogin={handleLoginRedirect} />
                            <p className="text-center mt-3">
                                Already have an account? <a href="/login">Login here</a>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
  )
}
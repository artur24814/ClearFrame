import React from "react"
import { Container, Row, Col, Button, Image} from 'react-bootstrap'
import heroImage from '../../../assets/images/mainImage.webp'

function HeroSection () {
  return (
    <section className="hero-section text-center text-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-3">Discover clearFrame</h1>
            <p className="lead">Transform your photos effortlessly with background removal, filters, and creative tools.</p>
            <Button variant="light" size="lg" className="hero-button" href="#download">Get Started</Button>
          </Col>
          <Col md={6}>
            <Image src={heroImage} alt="Image Editing Example" fluid rounded className="hero-image" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HeroSection
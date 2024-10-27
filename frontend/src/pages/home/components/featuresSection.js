import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

function FeaturesSection () {
  return (
		<section id="features" className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Key Features</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="feature-card shadow-sm">
                <Card.Body>
                  <Card.Title>AI Background Removal</Card.Title>
                  <Card.Text>Remove backgrounds with AI-powered precision.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card shadow-sm">
                <Card.Body>
                  <Card.Title>Custom Filters</Card.Title>
                  <Card.Text>Enhance photos with modern filters and effects.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card shadow-sm">
                <Card.Body>
                  <Card.Title>Creative Drawing Tools</Card.Title>
                  <Card.Text>Use versatile tools to personalize your images.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
	)
}

export default FeaturesSection
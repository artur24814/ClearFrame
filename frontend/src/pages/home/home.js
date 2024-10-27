import React from 'react'
import { Container, Row, Col, Button, Card, Image, Accordion } from 'react-bootstrap'
import './home.css'
import HeroSection from './components/heroSection'
import FeaturesSection from './components/featuresSection'

function Home() {
  return (
    <>
      <HeroSection />

      <FeaturesSection />

      {/* Examples Section */}
      <section id="examples" className="examples-section text-center py-5">
        <Container>
          <h2 className="mb-5">Editing Examples</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Image src="https://via.placeholder.com/300" alt="Example 1" fluid rounded className="example-image" />
              <p className="mt-2">Before and after background removal</p>
            </Col>
            <Col md={4} className="mb-4">
              <Image src="https://via.placeholder.com/300" alt="Example 2" fluid rounded className="example-image" />
              <p className="mt-2">Applying advanced filters</p>
            </Col>
            <Col md={4} className="mb-4">
              <Image src="https://via.placeholder.com/300" alt="Example 3" fluid rounded className="example-image" />
              <p className="mt-2">Creative touch-ups with drawing tools</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">What Our Users Say</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card shadow-sm">
                <Card.Body>
                  <Card.Text>“clearFrame changed my workflow. Background removal is now effortless!”</Card.Text>
                  <p className="mt-3 text-end"><strong>– Sarah L.</strong></p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card shadow-sm">
                <Card.Body>
                  <Card.Text>“The filters are top-notch and add a unique touch to my photos.”</Card.Text>
                  <p className="mt-3 text-end"><strong>– David M.</strong></p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card shadow-sm">
                <Card.Body>
                  <Card.Text>“The drawing tools are exactly what I needed for creative edits.”</Card.Text>
                  <p className="mt-3 text-end"><strong>– Jessica R.</strong></p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section py-5">
        <Container>
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How does background removal work?</Accordion.Header>
              <Accordion.Body>
                Our AI detects objects to remove backgrounds accurately, even in complex images.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Is clearFrame available on all platforms?</Accordion.Header>
              <Accordion.Body>
                Yes, clearFrame is available on iOS, Android, and Windows, ensuring cross-platform accessibility.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What filters are available?</Accordion.Header>
              <Accordion.Body>
                We offer a wide range of filters to enhance your photos, from retro to modern effects.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>

      {/* Download Section */}
      <section id="download" className="download-section text-center py-5">
        <Container>
          <h2 className="mb-4">Download clearFrame Now</h2>
          <p className="mb-4">Available for iOS, Android, and Windows.</p>
          <Button variant="primary" size="lg" href="#download-link">Download</Button>
        </Container>
      </section>
    </>
  )
}

export default Home

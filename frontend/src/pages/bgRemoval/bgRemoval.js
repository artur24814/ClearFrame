import React, { useState } from "react"

import { Container, Row, Col } from 'react-bootstrap'

import ImageDrop from '../../components/imageDrop.js'

function BgRemoval () {
  const [selectedImage, setSelectedImage ] = useState(null)
  const handleDrop = (e) => {
    e.preventDefault()
    const image = e.dataTransfer.file[0]
    if (image) {
      setSelectedImage(image)
    }
  }

  const handleImageUpload = (e) => {
    const image = e.target.files[0]
    if (image) {
      setSelectedImage(image)
    }
  }
  return (
    <Container fluid className="p-0">
      <Row className="m-0" style={{ height: '90vh', backgroundColor: '#f0f0f0' }}>
        <h1 className="text-center p-0 m-0 pt-1">Removing Image background</h1>
        <Col className="p-0 d-flex justify-content-center align-items-center h-100">
          <ImageDrop handleDrop={handleDrop} handleImageUpload={handleImageUpload} />
        </Col>
      </Row>
    </Container>
  )
}

export default BgRemoval
import React, { useState } from "react"
import api from '../../conf/axiosConf.js'

import { Container, Row, Col } from 'react-bootstrap'

import ImageDrop from '../../components/imageDrop.js'

function BgRemoval () {
  const [selectedImage, setSelectedImage ] = useState(null)
  const [processedImage, setprocessedImage] = useState(null)
  const handleDrop = (e) => {
    e.preventDefault()
    const image = e.dataTransfer.file[0]
    if (image) {
      setSelectedImage(image)
      handleSubmit(image)
    }
  }

  const handleImageUpload = (e) => {
    const image = e.target.files[0]
    if (image) {
      setSelectedImage(image)
      handleSubmit(image)
    }
  }

  const handleSubmit = async (image) => {
    const formData = new FormData()
    formData.append('file', image)

    try {
      const response = await api.post('/api/bg-remove/process', formData, {
        headers: {
          ...api.defaults.headers.common,
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })

      const imageUrl = URL.createObjectURL(response.data)
      setprocessedImage(imageUrl)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Container fluid className="p-0">
      <Row className="m-0" style={{ height: '90vh', backgroundColor: '#f0f0f0' }}>
        <h1 className="text-center p-0 m-0 pt-1">Removing Image background</h1>
        <Col className="p-0 d-flex justify-content-center align-items-center h-100">      
          {!processedImage ?(
              <ImageDrop handleDrop={handleDrop} handleImageUpload={handleImageUpload} />
          ) : (
            <div>
              <h3>Processed Image:</h3>
              <img src={processedImage} alt="Processed" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default BgRemoval
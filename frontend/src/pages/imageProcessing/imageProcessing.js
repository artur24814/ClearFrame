import React, { useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap'

import WithAuth from '../../components/hoc/withAuth.js'

import './imageProcessing.css'
import './components/imageManipulationNavbar.js'

import ImageDrop from '../../components/imageDrop.js'

import ImageManipulationNavbar from './components/imageManipulationNavbar.js'
import SidebarForUserProjects from './components/sidebarForUserProjects.js'

const ImageProcessing = () => {
  const [image, setImage] = useState(null)
  const [projects, ] = useState([
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
  ])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target.result)
      }
      reader.readAsDataURL(file);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleImageUpload({ target: { files: [file] } })
  }

  return (
    <Container fluid className="p-0">
      {image && (
        <ImageManipulationNavbar />
      )}

      {/* Main Content */}
      <Row className="m-0">
        {image && (
          <SidebarForUserProjects projects={projects}/>
        )}

        {/* Canvas and Image Upload Area */}
        <Col className="p-0 d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
            {!image ? (
                <ImageDrop handleDrop={handleDrop} handleImageUpload={handleImageUpload} />
            ) : (
                <div className="p-4">
                    <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                </div>
            )}
        </Col>
      </Row>
    </Container>
  )
}

export default WithAuth(ImageProcessing)
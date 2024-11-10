import React, { useState } from 'react'

import { Container, Row, Col, Form } from 'react-bootstrap'
import { BsUpload } from 'react-icons/bs'

import WithAuth from '../../components/hoc/withAuth.js'

import './imageProcessing.css'
import './components/imageManipulationNavbar.js'

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
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="d-flex flex-column align-items-center p-5 border border-secondary rounded"
                    style={{ backgroundColor: '#ffffff' }}
                >
                    <BsUpload size={50} />
                    <h5>Drag & Drop your image here</h5>
                    <p>or</p>
                    <Form.Group>
                        <Form.Control type="file" onChange={handleImageUpload} />
                    </Form.Group>
                </div>
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
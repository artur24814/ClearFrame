import React from "react"
import { BsUpload } from 'react-icons/bs'
import { Form } from 'react-bootstrap'

function ImageDrop ({ handleDrop, handleImageUpload }) {
  return (
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
  )
}

export default ImageDrop
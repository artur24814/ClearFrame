import React from "react"
import { Col, ListGroup } from 'react-bootstrap'

function SidebarForUserProjects ({ projects }) {
  return (
    <Col md={3} lg={2} className="bg-light p-3 border-end">
        <h5>Your Projects</h5>
        <ListGroup variant="flush">
            {projects.map((project) => (
                <ListGroup.Item key={project.id}>{project.name}</ListGroup.Item>
            ))}
        </ListGroup>
    </Col>
  )
}

export default SidebarForUserProjects
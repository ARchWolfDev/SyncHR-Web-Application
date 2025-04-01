import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

function CompanyInfoBox() {
  return (
  <Container>
    <Row>
      <Col>
        <h5><i className="fa-solid fa-building"></i> Company info</h5>
        <div className='br mb-3' ></div>
        <Form>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" value={'ARch DEV Solution SRL'} readOnly/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>Company URL</Form.Label>
            <Form.Control type="text" value={'www.arch-dev-solution.com'} readOnly/>
          </Form.Group>
        </Form>
      </Col>
      <Col>
        <h5><i className="fa-solid fa-location-dot"></i> Locations</h5>
        <div className='br mb-3' ></div>
        <Form>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>Main Location</Form.Label>
            <Form.Control type="text" value={'RO - Iasi'} readOnly/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={'Str. Two, Nr. 2'} readOnly/>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  </Container>
  )
}

export default CompanyInfoBox

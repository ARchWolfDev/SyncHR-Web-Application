import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useModalContext } from './ModalProvider';

function RequestNewRequestModal() {


  const createdBy = 'Andrei Rachieru'

  // const [createdBy, setCreatedBy] = useState('Andrei Rachieru');
  const {setValue} = useModalContext()
  const [requestType, setRequestType] = useState('');
  const [assignedDepartment, setAssignedDepartment] = useState('');
  const [assignedPerson, setAssignedPerson] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [fileSelected, setFileSelected] = useState(null)
  const [fileDescription, setFileDescription] = useState(null)
  const [ticketRequest, setTicketRequest] = useState({
    createdBy: '',
    requestType: '',
    assignedDepartment: '',
    assignedPerson: '',
    summary: '',
    description: '',
    file: {
      file: '',
      fileDescription: ''
    }
  })

  const handleRequestType = (e) => {setRequestType(e.target.value)}
  const handleAssignedDepartment = (e) => {setAssignedDepartment(e.target.value)}
  const handleAssignedPerson = (e) => {setAssignedPerson(e.target.value)}
  const handleSummary = (e) => {setSummary(e.target.value)}
  const handleDescription = (e) => {setDescription(e.target.value)}
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileSelected(file)
      setFileDescription({
        name: file.name,
        size: file.size,
        type: file.type
      })
    }
  }

  useEffect(() => {
    setTicketRequest({
      createdBy: createdBy,
      requestType: requestType,
      assignedDepartment: assignedDepartment,
      assignedPerson: assignedPerson,
      summary: summary,
      description: description,
      file: {
        file: fileSelected,
        fileDescription: fileDescription
      }
    })
  }, [createdBy, requestType, assignedDepartment, assignedPerson, summary, description, fileSelected, fileDescription])

  useEffect(() => {
    setValue(ticketRequest)
  }, [ticketRequest, setValue])


  return (
    <Container>
      <Form>
        <Row>
            <Col className='modal-left-side-info'>
                <Form.Group className='mb-3'>
                  <Form.Label>Created by</Form.Label>
                  <Form.Control readOnly value={createdBy}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Request type</Form.Label>
                  <Form.Select onChange={handleRequestType}>
                    <option value></option>
                    <option value={'Document'}>Document</option>
                    <option value={'Information'}>Information</option>
                    <option value={'Action'}>Action</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Assigne Department</Form.Label>
                  <Form.Select onChange={handleAssignedDepartment}>
                    <option value></option>
                    <option value={'Management'}>Management</option>
                    <option value={'Human Resources'}>Human Resources</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Assigne Person</Form.Label>
                  <Form.Select onChange={handleAssignedPerson}>
                    <option></option>
                    <option value={'x'}>Person X</option>
                    <option value={'y'}>Person Y</option>
                  </Form.Select>
                </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label>Summary</Form.Label>
                <Form.Control onChange={handleSummary}></Form.Control>
              </Form.Group>
              <Form.Group  className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={handleDescription}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>File import</Form.Label>
                <Form.Control type='file' onChange={handleFile}></Form.Control>
              </Form.Group>
            </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default RequestNewRequestModal

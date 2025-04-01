import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useUserContext } from './UserProvider'
import { useModalContext } from './ModalProvider'

function SettingsModalTab1() {

  const {setValue, setRequestType} = useModalContext()
  const {userInformation} = useUserContext()
  const [interfaceInformation, setInterfaceInformation] = useState(userInformation.interfaceConfiguration)

  const handleChanges = (section, field, subField, value) => {
    setInterfaceInformation((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section][field],
          [subField]: value
        }
      }
    }))
  }

  useEffect(() => {
    setValue(interfaceInformation)
    setRequestType('userInformation?section=interfaceConfiguration')
  }, [interfaceInformation, setValue, setRequestType])

  return (
    <Form>
      <Form.Group className='mb-3'>
        <Form.Label>Select propmpt <strong>h1</strong></Form.Label>
        <Row>
          <Col>
            <Form.Control defaultValue={interfaceInformation.header.prompt.h1} onChange={(e) => handleChanges('header', 'prompt', 'h1', e.target.value)}/>
          </Col>
          <Col>
            <Form.Select>
              <option>User First Name</option>
              <option>User Last Name</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Control defaultValue={interfaceInformation.header.prompt.h5} onChange={(e) => handleChanges('header', 'prompt', 'h5', e.target.value)}></Form.Control>
      </Form.Group>
    </Form>
  )
}

export default SettingsModalTab1

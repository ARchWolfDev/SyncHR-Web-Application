import React, {useEffect, useState} from 'react'
import {Form, Row, Col} from 'react-bootstrap'
import { useUserContext } from './UserProvider';

function SettingsModalTab0({setValue, setRequestType}) {

    const {userInformation} = useUserContext()
    const [formData, setFormData] = useState(userInformation.personalInformation)

    const handleFormData = (section, field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value
            }
        }))
    }

    useEffect(() => {
        setValue(formData)
        setRequestType('userInformation?section=personalInformation')
        }, [formData, setRequestType, setValue])

  return (
    <Form>
        <Row><Col><h6><i className="fa-solid fa-map-location"></i> Address Information</h6></Col></Row>
        <div className='br mb-3' ></div>
        <Row className='mb-3'>
            <Col>
                <Form.Group>
                    <Form.Label>Main Address</Form.Label>
                    <Form.Control 
                        value={formData['Address Information']['Main Address']}
                        onChange={(e) => handleFormData('Address Information', 'Main Address', e.target.value)}
                    ></Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row className='mb-3'>
            <Col>
                <Form.Group>
                    <Form.Label>Second Address</Form.Label>
                    <Form.Control
                        value={formData['Address Information']['Second Address']}
                        onChange={(e) => handleFormData('Address Information', 'Second Address', e.target.value)}
                    ></Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row><Col><h6><i className="fa-solid fa-address-book"></i> Contact Information</h6></Col></Row>
        <div className='br mb-3' ></div>
        <Row className='mb-3'>
            <Col>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        value={formData['Contact Information']['Phone Number']}
                        onChange={(e) => handleFormData('Contact Information', 'Phone Number', e.target.value)}
                    ></Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Second Phone Number</Form.Label>
                    <Form.Control
                        value={formData['Contact Information']['2nd Phone Number']}
                        onChange={(e) => handleFormData('Contact Information', '2nd Phone Number', e.target.value)}
                    ></Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row className='mb-3'>
            <Col>
                <Form.Group>
                    <Form.Label>Work Email</Form.Label>
                    <Form.Control
                        value={formData['Contact Information']['Work Email']}
                        onChange={(e) => handleFormData('Contact Information', 'Work Email', e.target.value)}
                        disabled
                    ></Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Personal Email</Form.Label>
                    <Form.Control
                        value={formData['Contact Information']['Personal Email']}
                        onChange={(e) => handleFormData('Contact Information', 'Personal Email', e.target.value)}
                    ></Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row><Col><h6><i className="fa-solid fa-link"></i> Links/Social Media</h6></Col></Row>
        <div className='br mb-3' ></div>
        <Row className='mb-3'>
            <Col>
                <Form.Group>
                    <Form.Label>LinkedIn</Form.Label>
                    <Form.Control 
                        placeholder='Paste URL'
                        value={formData.Links.LinkedIn}
                        onChange={(e) => handleFormData('Links', 'LinkedIn', e.target.value)}
                        ></Form.Control>
                </Form.Group>
            </Col>
        </Row>
    </Form>
  )
}

export default SettingsModalTab0

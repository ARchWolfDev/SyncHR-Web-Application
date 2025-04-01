import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Avatar from './Avatar';
import WhiteBoxList from './WhiteBoxList';

function ProfileComponent() {

  const {id} = useParams();
  const tabLists = [
    {id: 1, name: 'Basic Information'},
    {id: 2, name: 'Timesheets'},
    {id: 3, name: 'Time Off'},
    {id: 4, name: 'Documents'},
  ]

  const [tabData, setTabData] = useState([])

// <Avatar size={150} />
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col className='box' style={{display: 'flex', alignItems: 'center'}}>
              <Avatar size={150} name='Andrei Rachieru'/>
              <div style={{marginLeft: 20}}>
                <h3>Andrei Rachieru - ID: {id}</h3>
                <h4>Manager</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <WhiteBoxList listData={tabLists} returnData={setTabData}/>
            <Col>
              <div className='m0-box'>{tabData.name}</div>
            </Col>
          </Row>
        </Col>
        <Col className='col-3'>
          <div className='m0-box'>
            <h5>User Activity</h5>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileComponent

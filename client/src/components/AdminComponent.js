import React, { useState } from 'react'
import { Col, Container, Nav, Row, Form, Button, Dropdown} from 'react-bootstrap';
import {Link ,Outlet, useLocation } from 'react-router-dom';
// import avatar from '../avatars/dog.png'
import AdminQuickBar from './AdminQuickBar';

function AdminComponent() {

  const employees = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Michael Brown',
    'Emily Davis',
    'William Johnson',
    'Patricia Lee',
    'David Anderson',
    'Linda White',
    'Robert Harris',
    'Jessica Turner',
    'Thomas Thompson'
  ];

  const urlLocation = useLocation().pathname
  const [checked, setChecked] = useState(true)

  const toggleChecked = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const renderRightSideInformation = () => {
    if (checked) {
      return (<AdminQuickBar employees={employees}/>)
    }
  }

  return (
      <Container>
        <Row className='mb-3 align-items-center'>
          <Col xs={9} className='admin-nav-items'>
            <Nav variant="pills align-items-center" defaultActiveKey='link-1'>
              <Nav.Item><Link to='dashboard' className={`nav-link ${urlLocation.endsWith('dashboard')?'active':''}`}>Dashboard</Link></Nav.Item>
              <Nav.Item><Link to='teams' className={`nav-link ${urlLocation.endsWith('employees') || urlLocation.endsWith('departments')?'active':''}`}>Teams</Link></Nav.Item>
              <Nav.Item><Link to='requests' className={`nav-link ${urlLocation.endsWith('timesheets') || urlLocation.endsWith('timeoffs') || urlLocation.endsWith('tickets')?'active':''}`}>Requests</Link></Nav.Item>
              <Nav.Item><Link to='projects' className={`nav-link ${urlLocation.endsWith('projects')?'active':''}`}>Projects</Link></Nav.Item>
              <Nav.Item><Link to='tasks' className={`nav-link ${urlLocation.endsWith('tasks')?'active':''}`}>Tasks</Link></Nav.Item>
              <Nav.Item><Link to='roles' className={`nav-link ${urlLocation.endsWith('roles')?'active':''}`}>Roles</Link></Nav.Item>
              <Nav.Item><Link to='profiles' className={`nav-link ${urlLocation.endsWith('profiles')?'active':''}`}>Profiles</Link></Nav.Item>
              <Dropdown style={{marginLeft: '10px'}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">Create</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Department</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Role</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Project</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">Tasks List</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Add Employee</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="ms-auto">
              <Dropdown autoClose="outside">
                <Dropdown.Toggle variant="light" id="dropdown-basic"><i className="fa-solid fa-gear"></i></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={'button'}>
                    <Form>
                      <Form.Check
                        type='switch'
                        checked={checked}
                        onChange={toggleChecked}
                        label={`${checked? 'Hide': 'Show'} Quick Bar`}
                      />
                    </Form>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
            </Nav>
            {/*  */}
          </Col>
          <Col className='search-col'>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col><Outlet context={{ checked, toggleChecked }}/></Col>
          {renderRightSideInformation()}
        </Row>
      </Container>
  )
}

export default AdminComponent

import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Row, Col, Nav } from 'react-bootstrap'

function AdminTeams() {

    const urlLocation = useLocation().pathname

  return (
    <div>
        <Row>
            <Col>
                <Nav variant="pills" defaultActiveKey={1} className='mb-3'>
                    <Nav.Item>
                        <Link to={'employees'} className={`nav-link ${urlLocation.endsWith('employees')?'active':''}`}>Employees</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={'departments'} className={`nav-link ${urlLocation.endsWith('departments')?'active':''}`}>Departments</Link>
                    </Nav.Item>
                </Nav>
            </Col>
        </Row>
        <Outlet />
    </div>
  )
}

export default AdminTeams

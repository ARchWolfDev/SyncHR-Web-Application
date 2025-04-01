import React from 'react'
import { Col, Nav, Row } from 'react-bootstrap'
import { Link, Outlet, useLocation } from 'react-router-dom'

function AdminRequests() {

  const location = useLocation().pathname

  return (
    <div>
      <Row>
        <Col>
          <Nav variant='pills' defaultActiveKey={1} className='mb-3'>
            <Nav.Item>
              <Link to={'timesheets'} className={`nav-link ${location.endsWith('timesheets')?'active':''}`}>Timesheet</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={'timeoffs'} className={`nav-link ${location.endsWith('timeoffs')?'active':''}`}>Time Off</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={'tickets'} className={`nav-link ${location.endsWith('tickets')?'active':''}`}>Tickets</Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Outlet />
    </div>
  )
}

export default AdminRequests

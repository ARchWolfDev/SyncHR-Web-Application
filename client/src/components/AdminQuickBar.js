import React from 'react'
import Avatar from './Avatar';
import { ListGroup, ListGroupItem, ProgressBar, Col } from 'react-bootstrap';

function AdminQuickBar({employees}) {
  return (
    <Col className={`col-3 admin-quick-bar`}>
        <Col className='m0-box mb-3'>
        add quick action
        <h5><i className="fa-solid fa-hourglass-start"></i> Pending action</h5>
        <div className='br mb-3'></div>
        <div className='white-box m0-box mb-3' >Timesheet requests <strong style={{float: 'right'}}>0</strong></div>
        
        <div className='white-box m0-box mb-3' >Timeoff requests <strong style={{float: 'right'}}>0</strong></div>
        <div className='white-box m0-box mb-3' >Tickets requests <strong style={{float: 'right'}}>0</strong></div>
        </Col>
        <Col className='m0-box mb-3 department-box'>
            <div className='mb-2 avatar-text-div'>
                <Avatar type='department' name={'Sales'} size={30} />
                <h5 style={{marginLeft: 10, marginBottom: 0}} type='button'>Sales</h5>
            </div>
        <h6>Responsible: Alice Smith</h6>
        <h6>Employees in: 5</h6>
        <i className="pin fa-solid fa-thumbtack" style={{color: 'red', opacity: 1}}></i>
        </Col>
        <Col className='m0-box mb-3'>
        <h5><i className="fa-regular fa-calendar-check"></i> Timesheet current month</h5>
        <div className='br mb-3'></div>
        <ListGroup className='scrollable-list' style={{maxHeight: 500}}>
            {employees.map((employee, index) => (
            <ListGroupItem key={index}>
                <div className='avatar-text-div'>
                <Avatar size={50} name={employee} />
                <div style={{flex: 1}}>
                    <h5 className='mb-2'>{employee}</h5>
                    <ProgressBar style={{marginLeft: 10}} now={(Math.floor(Math.random() * employees.length) * 10)}></ProgressBar>
                </div>
                </div>
            </ListGroupItem>
            ))}
        </ListGroup>
        </Col>
        <Col className='m0-box mb-3'>
        <h5><i className="fa-solid fa-business-time"></i> Timeoff planned</h5>
        <div className='br mb-3'></div>
        <ListGroup>
            <ListGroupItem>
                <div className='avatar-text-div'>
                <Avatar size={50} name='John Doe' />
                <div style={{flex: 1}}>
                    <h5 className='mb-2'>John Doe</h5>
                    <span style={{marginLeft: 10}}>Off planned on 3 Days</span>
                </div>
                </div>
            </ListGroupItem>
            <ListGroupItem>
                <div className='avatar-text-div'>
                <Avatar size={50} name='David Anderson' />
                <div style={{flex: 1}}>
                    <h5 className='mb-2'>David Anderson</h5>
                    <span style={{marginLeft: 10}}>Off today</span>
                </div>
                </div>
            </ListGroupItem>
        </ListGroup>
        </Col>
    </Col>
  )
}

export default AdminQuickBar

import React from 'react'
import { Col, ProgressBar, Row } from 'react-bootstrap'
import Calendar from './Calendar'

function Home() {
  return (
    <>
      <Row className='c-gap-20'>
        <Col lg={9}>
            <div >
                <Calendar />
            </div>
        </Col>
        <Col className='flex-column r-gap-20'>
            <div className='w-box'>
                <h4>Completed: <span className='float'>10%</span></h4>
                <ProgressBar now={10} />
            </div>
            <div className='w-box'>
                <h5>This month:</h5>
                <hr></hr>
                <h6>Days completed: <span className='float'>4</span></h6>
                <h6>Total working hours: <span className='float'>16h30</span></h6>
            </div>
            <div className='w-box'>
                <h5>April</h5>
                <hr></hr>
                <h6>Total days: <span className='float'>31</span></h6>
                <h6>Business Days: <span className='float'>0</span></h6>
                <h6>Legal leave days: <span className='float'>0</span></h6>
                <h6>Your leave days: <span className='float'>0</span></h6>
            </div>
        </Col>
      </Row>
    </>
  )
}

export default Home

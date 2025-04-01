import React from 'react'
import Calendar from './Calendar'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

function HomeComponent() {
  
    const renderMostUsedTasks = () => {
      const mostUsedTasks = ['Cras justo odio', 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac']
      const listTasks = mostUsedTasks.map((task, index) => <ListGroup.Item key={index}><i className="fa-regular fa-circle-dot fa-2xs" style={{color: "#b6b9be", marginRight: '10px'}}></i> {task}</ListGroup.Item>)
  
      return listTasks
    }

  return (
    <Container style={{maxWidth: '100%', 'padding': 0}}>
        <Row>
          <Col lg={9} className='calendar-col'><Calendar /></Col>
          <Col style={{paddingRight: 0}} className='traker'>
            <div className='box' style={{textAlign: 'center', height: '45%'}}>
              <h5>Timesheet completed</h5>
              <div className='br'></div>
              <Gauge style={{margin: 'auto'}}
                width={200} 
                height={150} 
                value={60} 
                startAngle={-90} 
                endAngle={90} 
                innerRadius="70%"
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                    transform: 'translate(0px, -10px)',
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: 'green',
                  }
                }}
                text={
                  ({ value }) => `${value}%`
               }
              />
              <p>October bussniss days</p>
            </div>
            <div className='box' style={{height: '55%'}}>
              <h5 style={{textAlign: 'center'}}>Most used tasks</h5>
              <div className='br'></div>
              <ListGroup variant="flush">
                  {renderMostUsedTasks()}
              </ListGroup>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop: '40px'}}>
        </Row>
    </Container>
  )
}

export default HomeComponent

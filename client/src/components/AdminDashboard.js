import React, { useState } from 'react'
// import { useOutletContext } from 'react-router-dom';
import { Row, Col, ListGroup, Badge } from 'react-bootstrap'
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, PieChart, Gauge, gaugeClasses } from '@mui/x-charts';


function AdminDashboard() {

  const [pendingInfo, setPendingInfo] = useState(false)
  const [approvedInfo, setApprovedInfo] = useState(false)
  const [rejectedInfo, setRejectedInfo] = useState(false)
  const [informationContent, setinformationContent] = useState('')
  // const { checked, toggleChecked } = useOutletContext();

  const handleInformationContent = (content) => {
    if (content === 'pending') {
      setPendingInfo(!pendingInfo)
      setApprovedInfo(false)
      setRejectedInfo(false)
    } else if (content === 'approved') {
      setApprovedInfo(!approvedInfo)
      setPendingInfo(false)
      setRejectedInfo(false)
    } else {
      setRejectedInfo(!rejectedInfo)
      setApprovedInfo(false)
      setPendingInfo(false)
    }
    setinformationContent(content)
  }

  const renderTimeSheetStatusInformation = () => {
    if (pendingInfo !== false || approvedInfo !== false || rejectedInfo !== false) {
      // className={open?'show-information': ''}
      return <Row><Col className='white-box box'>Information for {informationContent}</Col></Row>
    }
  }

  const data = [40, 27, 18, 34]
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const list = []

  for (var i = (currentMonth - 3); i <= currentMonth; i++){
    const date = new Date(2024, i)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', {month : 'short'})
    list.push(`${month} ${year}`)
  }

  const renderTimeOffRequestList = () => {
    const timeOffList = {
      Req1: {
        createdBy: 'Andrei Rachieru',
        startDate: '05.11.2024',
        endDate: '06.11.2024'
      },
      Req2: {
        createdBy: 'Andrei Rachieru',
        startDate: '05.11.2024',
        endDate: '06.11.2024'
      },
      Req3: {
        createdBy: 'Andrei Rachieru',
        startDate: '05.11.2024',
        endDate: '06.11.2024'
      }
    }

     var renderTimeOffList = []

    for (const key in timeOffList) {
      renderTimeOffList.push(
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={key}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{timeOffList[key].createdBy}</div>
            {timeOffList[key].startDate} - {timeOffList[key].endDate}
          </div>
          <Badge bg="warning" pill><i className="fa-solid fa-hourglass-start fa-fade"></i></Badge>
        </ListGroup.Item>
      )
    }
    return(renderTimeOffList)
  }

  const seriesA = {
    data: [2, 3, 1, 4, 5],
    label: 'Pending',
  };
  const seriesB = {
    data: [3, 1, 4, 2, 1],
    label: 'Approved',
  };
  const seriesC = {
    data: [3, 2, 4, 5, 0],
    label: 'Rejected',
  };

  return (
    <>
      <Row>
        <Col className='box'>
          <h5>Admin Dashboard Settings</h5>
          {/* <Form>
            <Form.Check
              type='switch'
              checked={checked}
              onChange={toggleChecked}
              label={`${checked? 'Hide': 'Show'} right sidebar`}
            />
          </Form> */}
        </Col>
      </Row>
      <Row className='dashboard-row'>
        <Col className='col-3'>
          <div className='m0-box mb-3' >
            <h5>All employees</h5>
            <h1>0</h1>
            <span>until November 2024</span>
            {/* min-height: 45.2%; */}
          </div>
          <div className='m0-box mb-3' >
            <h5>Hired this month</h5>
            <h1>0</h1>
            <span>employees hired on November 2024</span>
            {/* min-height: 46.5%; */}
          </div>
        </Col>
        <Col className='box col-6'>
          <h5>Employees by role</h5>
          <BarChart 
            yAxis={[{label: 'Employees'}]}
            xAxis={[{
              scaleType: 'band', 
              data: ['Role1', 'Role2', 'Role3', 'Role4', 'Role5', 'Role6', 'Role7', 'Role8', 'Role9', 'Role10', 'Role11', 'Role12'], 
              label: 'Roles',
              labelStyle: {
                transform: 'translateY(12px)'
              }
            }]}
            series={[{data: [4, 2, 5, 7, 3, 12, 6, 7, 3, 5, 2, 12], color: '#5E17EB'}]}
            height={270}
            borderRadius={5}
            bottomAxis={{
              tickLabelStyle: {
                angle: 45,
                textAnchor: 'start'
              }
            }}
          />
        </Col>
        <Col className='box'>
        <h5>Employees by Department</h5>
        <PieChart
          series={[
            {
              data: [
                {id: 0, value: 10, label: "Dep1", color: 'green'},
                {id: 1, value: 15, label: "Dep1", color: 'blue'},
                {id: 2, value: 30, label: "Dep1"}
              ],
              innerRadius: 50,
              cornerRadius: 5
              // cx: '100%',
              // cy: '50%'
            },
          ]}
          slotProps={{legend: {hidden: true}}}
          margin={{right: 5}}
          // width={250}
          height={250}
        />
        </Col>
      </Row>
      <Row className='dashboard-row'>
        <Col className='box'>
        <h5>Employees number over the year</h5>
          <LineChart
            height={270} 
            series={[{data: data, label: 'Employees count', color: 'green'}]}
            xAxis={[{scaleType: 'point', data: list}]}
          />
        </Col>
      </Row>
      <Row className='dashboard-row'>
        <Col className='box justify-items-center'>
            <h5>Timesheet Requests</h5>
            <Row className='timesheet-status-box-row'>
              <Col type='button' onClick={() => handleInformationContent('pending')} className='box hover-box' style={{backgroundColor: '#ffeb99'}}><h6>Pending <strong style={{float: 'right'}}>0</strong></h6></Col>
              <Col type='button' onClick={() => handleInformationContent('approved')} className='box hover-box' style={{backgroundColor: '#99ff99'}}><h6>Approved <strong style={{float: 'right'}}>0</strong></h6></Col>
              <Col type='button' onClick={() => handleInformationContent('rejected')} className='box hover-box' style={{backgroundColor: '#ff9999'}}><h6>Rejected <strong style={{float: 'right'}}>0</strong></h6></Col>
            </Row>
            {renderTimeSheetStatusInformation()}
        </Col>
      </Row>
      <Row className='dashboard-row'>
        <Col className='box'>
          <h5>Timesheet completed by Employees</h5>
          <BarChart
            height={250}
            xAxis={[{
              scaleType: 'band',
              data: ['A', 'B', 'C', 'D', 'E'], label: 'Employees'}]}
            series={[
              {...seriesA, stack: 'total', color: '#ffeb99'},
              {...seriesB, stack: 'total', color: '#99ff99'},
              {...seriesC, stack: 'total', color: '#ff9999'}
            ]}
            slotProps={{
              legend: {
                itemMarkWidth: 20,
                itemMarkHeight: 5,
                markGap: 10
              }
            }}
          />
        </Col>
        <Col className='box col-3'>
          <h5>Average overall</h5>
          <Gauge 
            height={250} 
            value={60}
            innerRadius={'70%'}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202'
              }
            }}
          />
        </Col>
      </Row>
      <Row className='dashboard-row'>
        <Col className='box col-3'>
          <h5>Timeoff Requests</h5>
          <ListGroup as="ol" numbered>
            {renderTimeOffRequestList() || "No new Requests"}
          </ListGroup>
        </Col>
        <Col className='box'>
          Calendar with all employees off
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard

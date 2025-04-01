import React, {useState} from 'react'
import { Row, Col, Button, ProgressBar } from 'react-bootstrap'
import Avatar from './Avatar'
import TableComponent from './TableComponent'

function TimesheetsPendingComponent() {

    const [requests, setRequests] = useState([
        {
            userId: 1,
            userName: 'Andrei Rachieru',
            timesheetRequests: [
                {id: 'REQ-0001', status: 1, date: '2024/10/20', createdDate: '2024/10/20', projectId: 1},
                {id: 'REQ-0002', status: 1, date: '2024/10/20', createdDate: '2024/10/20', projectId: 1},
                {id: 'REQ-0003', status: 1, date: '2024/10/20', createdDate: '2024/10/20', projectId: 1},
            ]
        },
        {
            userId: 2,
            userName: 'Maria Ionescu',
            timesheetRequests: [
                {id: 'REQ-0010', status: 1, date: '2024/10/20', createdDate: '2024/10/20', projectId: 1},
                {id: 'REQ-0020', status: 1, date: '2024/10/20', createdDate: '2024/10/20', projectId: 1},
                {id: 'REQ-0030', status: 1, date: '2024/10/20', createdDate: '2024/10/20', projectId: 1},
            ]
        }
    ])

    const [checkedRows, setCheckedRows] = useState([])
    const [expandedRows, setExpandedRows] = useState({})
    const toggleRow = (userId) => {setExpandedRows((prev) => ({...prev, [userId]: !prev[userId]}))}

    const handleApproveAll = (userId) => {
        setRequests((prev) => 
            prev.map((user) => user.userId === userId? {
                ...user,
                timesheetRequests: user.timesheetRequests.map((req) => ({
                    ...req,
                    status: 2
                }))
            }: user)
        )
    }
    const handleSelectedRows = (btnStatus) => {
        setRequests((prev) => prev.map((user) => ({
            ...user, 
            timesheetRequests: user.timesheetRequests.map((req) => 
                checkedRows.some((row) => row.id === req.id)? 
                    {...req, status: btnStatus}: req)
        })))
        setCheckedRows([])
    }

  return (
    <Row>
        {requests.map((request) => (
            <Col className='box' key={request.userId} style={{flex: '1 1 100%'}}>
                <div className='request-header'>
                    <div className='avatar-text-div'>
                        <Avatar size={50} name={request.userName}/>
                        <h5>{request.userName}</h5>
                    </div>
                    {/* <ProgressBar style={{width: '40%'}}>
                        <ProgressBar variant="success" now={0} key={1} />
                        <ProgressBar variant="warning" now={20} key={2} />
                        <ProgressBar variant="danger" now={0} key={3} />
                    </ProgressBar> */}
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div>
                            <h5>Requests: {request.timesheetRequests.length}</h5>
                            <Button variant='success' onClick={() => handleApproveAll(request.userId)}>Approve all</Button>
                        </div>
                        <i type='button' onClick={() => toggleRow(request.userId)} className={`fa-solid fa-chevron-down arrow ${expandedRows[request.userId]?'rotated': ''}`} style={{padding: '0 10px'}}></i>
                    </div>
                </div>
                <div className={`request-data ${expandedRows[request.userId]?'show-data':''}`}>
                    <Button size='sm'>View Tasks</Button>
                    <div style={{float: 'right'}}>
                        <Button size='sm' variant='success' onClick={() => handleSelectedRows(2)} style={{marginRight: 10}}>Approve ({checkedRows.length})</Button>
                        <Button size='sm' variant='danger' onClick={() => handleSelectedRows(3)}>Reject ({checkedRows.length})</Button>
                    </div>
                    <TableComponent tableData={request.timesheetRequests || []} onCheckedRowsChange={setCheckedRows} />
                </div>
            </Col>
        ))}
    </Row>
  )
}

export default TimesheetsPendingComponent

import React, {useState} from 'react'
import { Col, Row, Button, ProgressBar, Badge } from 'react-bootstrap'
import Avatar from './Avatar'
import TableComponent from './TableComponent'

function AdminRequestsTimesheets() {

    const [requests, setRequests] = useState([
        {
            userId: 1,
            userName: 'Andrei Rachieru',
            timesheetRequests: [
                {id: 'REQ-0001', taskName: 'Blablabla task', status: 'pendinng', project: 'Internal', time: '01:30'},
                {id: 'REQ-0002', taskName: 'Blablabla task', status: 'pendinng', project: 'Internal', time: '01:30'},
                {id: 'REQ-0003', taskName: 'Blablabla task', status: 'pendinng', project: 'Internal', time: '01:30'},
            ]
        },
        {
            userId: 2,
            userName: 'Maria Ionescu',
            timesheetRequests: [
                {id: 'REQ-0010', name: 'Blablabla task', status: 1, projectId: 'Internal'},
                {id: 'REQ-0020', name: 'Blablabla task', status: 1, projectId: 'Internal'},
                {id: 'REQ-0030', name: 'Blablabla task', status: 1, projectId: 'Internal'},
            ]
        }
    ])

    const [checkedRows, setCheckedRows] = useState([])
    const [expandedRows, setExpandedRows] = useState({})
    const [expandAll, setExpandAll] = useState({})
    const toggleRow = (userId) => {setExpandedRows((prev) => ({...prev, [userId]: !prev[userId]}))}
    const handleExpand = (userId) => {setExpandAll((prev) => ({...prev, [userId]: !prev[userId]}))}

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
                    <div className='avatar-text-div' style={{flex: 1}}>
                        <Avatar size={75} name={request.userName}/>
                        <h5>{request.userName}</h5>
                    </div>
                    <ProgressBar style={{width: '40%'}}>
                        <ProgressBar variant="success" now={0} key={1} />
                        <ProgressBar variant="warning" now={20} key={2} />
                        <ProgressBar variant="danger" now={0} key={3} />
                    </ProgressBar>
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
                    <div className='white-box m0-box mt-2' style={{padding: 10}}>
                        <div className='date-header' type='button' onClick={() => handleExpand(request.userId)}>
                            <h6 style={{display: 'inline-block', margin: 0}}><i className="fa-solid fa-calendar-day"></i> 23 Nov 2024</h6>
                            <Badge bg="secondary" style={{marginLeft: 10}}>Total: 8h 30min</Badge>
                            <Badge bg="warning" style={{float: 'right', marginLeft: 'auto'}}>Pending</Badge>
                        </div>
                        <div className={`date-table ${expandAll[request.userId]? 'show-data-table': ''}`}>
                            <TableComponent tableData={request.timesheetRequests || []} onCheckedRowsChange={setCheckedRows} />
                        </div>
                    </div>
                </div>
            </Col>
        ))}
    </Row>
  )
}

export default AdminRequestsTimesheets

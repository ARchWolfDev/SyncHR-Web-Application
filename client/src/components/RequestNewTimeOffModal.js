import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useModalContext } from './ModalProvider'
// import { isEqual } from 'lodash';

function RequestNewTimeOffModal() {

    const timeOffList = {
        annualLeave: {
            name: 'Annual Leave',
            available: 10
        },
        medicalLeave: {
            name: 'Medical Leave',
            available: 2
        },
        birthdayLeave: {
            name: 'Birthday Leave',
            available: 1
        }
    }

    const {setValue, setRequestType} = useModalContext()
    const [activeTab, setActiveTab] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [comment, setComment] = useState('')
    const [timeOffRequest, setTimeOffRequest] = useState({
        categoryType: '',
        startDate: '',
        endDate: '',
        amountDays: '',
        comment: ''
    })

    const handleClick = (activeTab) => {
        setActiveTab(activeTab)
        setFromDate('')
        setToDate('')
        setAmount(0)
    }

    const calculateBusinessDays = (start, end) => {
        let fromDate = new Date(start)
        let toDate = new Date(end)
        let businessDaysCount = 0

        if (fromDate <= toDate) {
            while (fromDate <= toDate) {
                const daysOfWeek = fromDate.getDay()
                if (daysOfWeek !== 0 && daysOfWeek !== 6){
                    businessDaysCount++
                }
                fromDate.setDate(fromDate.getDate() + 1)
            }
        }
        setAmount(businessDaysCount)
    }

    const handleFromDate = (e) => {
        setFromDate(e.target.value)
        if(toDate) {
            calculateBusinessDays(e.target.value, toDate)
        }
    }
    const handleToDate = (e) => {
        setToDate(e.target.value)
        if (fromDate) {
            calculateBusinessDays(fromDate, e.target.value)
        }
    }
    const handleComment = (e) => {
        setComment(e.target.value)
    }

    const renderLeaveList = () => {
        const elementList = []
        for ( const key in timeOffList) {
            elementList.push(
                <div 
                key={timeOffList[key].name}
                className={`box white-box no-margin mb-3 ${activeTab === timeOffList[key].name? 'active-white-box': ''}`} 
                role='button'
                onClick={() => handleClick(timeOffList[key].name)}
            >
                <h6 className='no-margin'>{timeOffList[key].name}</h6>
                {timeOffList[key].available} available
                </div>
            )
        }
        return elementList
    }

    useEffect(() => {
        setTimeOffRequest({
            categoryType: activeTab,
            startDate: fromDate,
            endDate: toDate,
            amountDays: amount,
            comment: comment
        })
    }, [activeTab, fromDate, toDate, amount, comment])

    useEffect(() => {
        setRequestType('/api/request/timeOff')
        setValue(timeOffRequest);
    }, [timeOffRequest, setValue]);

    const renderRequestBody = () => {
        if (activeTab === '') {
            return <div className='no-content-message'>Select the Leave type</div>
        } else {
            return ( 
            <div>
                <Container>
                    <Form>
                        <Row className='mb-3'>
                            <Form.Group>
                                <Form.Label>Categoory Type</Form.Label>
                                <Form.Control value={activeTab} readOnly></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type='date' value={fromDate} onChange={handleFromDate}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type='date' value={toDate} onChange={handleToDate}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group>
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control value={amount} readOnly></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as="textarea" value={comment} onChange={handleComment}></Form.Control>
                            </Form.Group>
                        </Row>
                    </Form>
                </Container>
            </div>
            )
        }
    }

  return (
    <Container>
        <Row>
            <Col style={{maxWidth: '25%', borderRight: '0.5px solid #ddd'}}>
                {renderLeaveList()}
            </Col>
            <Col>
                {renderRequestBody()}
            </Col>
        </Row>
    </Container>
  )
}

export default RequestNewTimeOffModal

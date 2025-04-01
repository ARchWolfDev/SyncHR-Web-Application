import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table} from 'react-bootstrap'
import LoadingDiv from './LoadingDiv'
import { useUserContext } from './UserProvider'

function JobInfoBox() {

  const {currentUser} = useUserContext()
  const [jobInfo, setJobInfo] = useState(null)

  const handleJobInfo = (sectionInfo) => {
    const formData = []

    for (const key in sectionInfo) {
      if (sectionInfo[key] !== null) {
        formData.push(
          <Form.Group className="mb-3" key={`info-${key}`}>
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" value={sectionInfo[key]} readOnly />
          </Form.Group>
        )
      }
    }
    return formData
  }

  const handleInfoBoxes = (employeeJobInfo) => {
    const rows = []
    let cols = []

    for (const section in employeeJobInfo) {
      const sectionData = handleJobInfo(employeeJobInfo[section])
      if (sectionData.length === 0) continue
      
      cols.push(
        <Col key={`col-${section}`}>
          <h5>{section}</h5>
          <div className="br mb-3"></div>
          <Form>{sectionData}</Form>
        </Col>
      )
      if (cols.length === 3) {
        rows.push(<Row key={`row-${rows.length}`} className='mb-3'>{cols}</Row>)
        cols = []
      }
    }
    if (cols.length > 0) {
      rows.push(<Row key={`row-${rows.length}`}>{cols}</Row>)
    }
    return rows
  }

  useEffect(() => {
    const jobInformation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/user/${currentUser.user_id}?arg=jobInformation`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        const data = await response.json()
        if (response.ok) {
          setJobInfo(data.data)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
    jobInformation()
  }, [])

  if (jobInfo === null) {
    return <LoadingDiv />
  } else {
    return (
      <Container>
        {handleInfoBoxes(jobInfo)}
        <Row>
          <Col>
            <h5><i className="fa-solid fa-user-shield"></i> Contract Information</h5>
            <div className='br mb-3' ></div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Start Date</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>CTR-0001</td>
                  <td>25/10/2024</td>
                  <td>ARch Dev Solution Employee Contract</td>
                  <td>Active</td>
                  <td>Download</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default JobInfoBox

import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useUserContext } from './UserProvider';
import LoadingDiv from './LoadingDiv';
import { useNavigate } from 'react-router-dom';

function PersonalInfoBox() {

  const [isLoading, setIsLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState([])
  const {currentUser} = useUserContext()
  const navigate = useNavigate()

  const handlePersonalInformation = (sectionInfo) => {
    const formData = [];

    for (const key in sectionInfo) {
      if (sectionInfo[key] !== null) {
        formData.push(
          <Form.Group className="mb-3" key={`info-${key}`}>
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" value={sectionInfo[key]} readOnly />
          </Form.Group>
        );
      }
    }

    return formData;
  };

  const handleInfoBoxes = (employeeInfo) => {
    const rows = [];
    let cols = [];

    for (const section in employeeInfo) {
      const sectionData = handlePersonalInformation(employeeInfo[section]);
      if (sectionData.length === 0) continue;

      cols.push(
        <Col key={`col-${section}`}>
          <h5>{section}</h5>
          <div className="br mb-3"></div>
          <Form>{sectionData}</Form>
        </Col>
      );
      if (cols.length === 3) {
        rows.push(<Row key={`row-${rows.length}`} className='mb-3'>{cols}</Row>);
        cols = [];
      }
    }
    if (cols.length > 0) {
      rows.push(<Row key={`row-${rows.length}`}>{cols}</Row>);
    }

    return rows;
  };

  useEffect(() => {
    const personalInformation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/user/${currentUser.user_id}?arg=personalInformation`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        const data = await response.json()
        if (response.ok) {
          setPersonalInfo(data.data)
        } else {
          console.log(data.message)
          alert(data.message)
          navigate('/login')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    personalInformation()
  }, [])

  console.log(personalInfo)

  if (isLoading) {
    return <LoadingDiv />
  }

  return (
    <Container>
      {handleInfoBoxes(personalInfo)}
    </Container>
  );
}

export default PersonalInfoBox;

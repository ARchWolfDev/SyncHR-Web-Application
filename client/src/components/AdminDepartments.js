import React, { useState } from 'react'
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar'

function AdminDepartments() {

    const departments = [
        {
            id: 1,
            name: "Sales",
            responsible: { id: 1, name: "Alice Smith", email: "Alice.Smith@arch-dev.com" },
            employees: [
                { id: 1, name: "Alice Smith", role: "Manager", email: "Alice.Smith@arch-dev.com" },
                { id: 7, name: "Grace Wilson", role: "Sales Representative", email: "Grace.Wilson@arch-dev.com" },
                { id: 10, name: "Jack Anderson", role: "Sales Associate", email: "Jack.Anderson@arch-dev.com" },
                { id: 13, name: "Mia Walker", role: "Sales Executive", email: "Mia.Walker@arch-dev.com" },
                { id: 17, name: "Quinn Young", role: "Sales Manager", email: "Quinn.Young@arch-dev.com" }
            ]
        },
        {
            id: 2,
            name: "IT",
            responsible: { id: 14, name: "Noah Allen", email: "Noah.Allen@arch-dev.com" },
            employees: [
                { id: 2, name: "Bob Johnson", role: "Developer", email: "Bob.Johnson@arch-dev.com" },
                { id: 6, name: "Frank Miller", role: "Support Engineer", email: "Frank.Miller@arch-dev.com" },
                { id: 14, name: "Noah Allen", role: "IT Manager", email: "Noah.Allen@arch-dev.com" },
                { id: 19, name: "Sam Clark", role: "IT Support", email: "Sam.Clark@arch-dev.com" }
            ]
        },
        {
            id: 3,
            name: "Finance",
            responsible: { id: 3, name: "Carol Williams", email: "Carol.Williams@arch-dev.com" },
            employees: [
                { id: 3, name: "Carol Williams", role: "Analyst", email: "Carol.Williams@arch-dev.com" },
                { id: 9, name: "Ivy Taylor", role: "Data Scientist", email: "Ivy.Taylor@arch-dev.com" },
                { id: 12, name: "Liam Taylor", role: "Accountant", email: "Liam.Taylor@arch-dev.com" },
                { id: 18, name: "Rachel Adams", role: "Financial Analyst", email: "Rachel.Adams@arch-dev.com" }
            ]
        },
        {
            id: 4,
            name: "Marketing",
            responsible: { id: 15, name: "Olivia King", email: "Olivia.King@arch-dev.com" },
            employees: [
                { id: 4, name: "David Brown", role: "Designer", email: "David.Brown@arch-dev.com" },
                { id: 8, name: "Henry Moore", role: "Marketing Specialist", email: "Henry.Moore@arch-dev.com" },
                { id: 15, name: "Olivia King", role: "Marketing Director", email: "Olivia.King@arch-dev.com" },
                { id: 20, name: "Tina Evans", role: "Marketing Coordinator", email: "Tina.Evans@arch-dev.com" }
            ]
        },
        {
            id: 5,
            name: "Human Resources",
            responsible: { id: 11, name: "Kate Thomas", email: "Kate.Thomas@arch-dev.com" },
            employees: [
                { id: 5, name: "Emma Davis", role: "HR Specialist", email: "Emma.Davis@arch-dev.com" },
                { id: 11, name: "Kate Thomas", role: "HR Manager", email: "Kate.Thomas@arch-dev.com" },
                { id: 16, name: "Paul Scott", role: "Recruiter", email: "Paul.Scott@arch-dev.com" }
            ]
        }
    ]

    const navigate = useNavigate()
    const [pinned, setPinned] = useState([])
    const [departmentsPinned, setDepartmentsPinned] = useState([])

    const handleDepartment = (dep) => {
        const encodeDep = btoa(dep)
        navigate(`/department/${encodeDep}`)
    }

    const handlePin = (id) => {
        setPinned((prevPinnedIds) => {
            const newPinned = prevPinnedIds.includes(id)
                ? prevPinnedIds.filter((pinnedId) => pinnedId !== id)
                : [...prevPinnedIds, id];

            setDepartmentsPinned(departments.filter(dep => newPinned.includes(dep.id)));
            return newPinned;
        });
        console.log(departmentsPinned)
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Pin to Quick Bar
        </Tooltip>
      );

    const renderDepartmentsList = () => {
        return departments.map((dep) => (
            <Col key={dep.id} className='box department-box' style={{minWidth: '25%', position:'relative'}}>
                <div className='mb-2 avatar-text-div'>
                    <Avatar type='department' name={dep.name} size={30} />
                    <h5 style={{marginLeft: 10, marginBottom: 0}} type='button' onClick={() => handleDepartment(dep.name)}> {dep.name}</h5>
                </div>
                <h6>Responsible: {dep.responsible.name}</h6>
                <h6>Employees in: {dep.employees.length}</h6>
                <OverlayTrigger placement='top' overlay={renderTooltip} delay={{show: 500}}>
                    <i onClick={() => handlePin(dep.id)} className="pin fa-solid fa-thumbtack" style={pinned.includes(dep.id)? {color: 'red', opacity: 1}: {}}></i>
                </OverlayTrigger>
            </Col>
        ))
    }

  return (
    <Container>
        <Row><Col className='box'><h5>Settings</h5></Col></Row>
        <Row className='sm-view-row'>
            {renderDepartmentsList()}
        </Row>
    </Container>
  )
}

export default AdminDepartments

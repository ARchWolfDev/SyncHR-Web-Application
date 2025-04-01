import React, { useRef, useState } from 'react'
import { Button, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap'
import TableComponent from './TableComponent'
import { useModalContext } from './ModalProvider';

function AdminRoles() {

  const departments = [
    {
      id: 1,
      name: "Engineering",
      roles: [
        { id: 1, name: "Software Engineer" },
        { id: 2, name: "Quality Assurance Engineer" },
        { id: 3, name: "DevOps Specialist" },
        { id: 4, name: "Technical Lead" },
        { id: 5, name: "Backend Developer" }
      ]
    },
    {
      id: 2,
      name: "Marketing",
      roles: [
        { id: 6, name: "Content Strategist" },
        { id: 7, name: "Social Media Manager" },
        { id: 8, name: "SEO Specialist" },
        { id: 9, name: "Brand Manager" }
      ]
    },
    {
      id: 3,
      name: "Human Resources",
      roles: [
        { id: 10, name: "Recruiter" },
        { id: 11, name: "HR Manager" },
        { id: 12, name: "Compensation and Benefits Specialist" },
        { id: 13, name: "Employee Relations Officer" }
      ]
    },
    {
      id: 4,
      name: "Finance",
      roles: [
        { id: 14, name: "Accountant" },
        { id: 15, name: "Financial Analyst" },
        { id: 16, name: "Payroll Specialist" },
        { id: 17, name: "Tax Consultant" },
        { id: 18, name: "Treasury Manager" }
      ]
    },
    {
      id: 5,
      name: "Operations",
      roles: [
        { id: 19, name: "Operations Manager" },
        { id: 20, name: "Logistics Coordinator" },
        { id: 21, name: "Supply Chain Analyst" },
        { id: 22, name: "Facilities Manager" }
      ]
    }
  ];

  const [departmentList, setDepartmentList] = useState(departments)
  const [activeList, setActiveList] = useState(departments[0])
  const [checked, setChecked] = useState(false)
  const [checkedRoles, setCheckedRoles] = useState([])
  const [newRole, setNewRole] = useState('')
  const inputRef = useRef(null)
  const {handleShowModal} = useModalContext()

  const handleActiveList = (department) => {
    setActiveList(department)
    setCheckedRoles([])
  }

  const handleToggleButton = () => {
    setChecked(!checked)
    if (!checked) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }
  const handleAddForm = (e) => {
    e.preventDefault()
    const newRoleToAdd = {
      id: activeList.roles.length + 1,
      name: newRole
    }
    const updatedDepartmentList = departmentList.map(department => 
      department.id === activeList.id?
      {...department, roles: [...department.roles, newRoleToAdd]}:
      {department}
    )
    setDepartmentList(updatedDepartmentList)
    const updatedActiveList = updatedDepartmentList.find((department) => department.id === activeList.id)
    setActiveList(updatedActiveList)
  }
  const handleDeleteRole = () => {
    const updatedDepartmentsList = departmentList.map((dep) => {
      if (dep.id === activeList.id) {
        const remainingRoles = dep.roles.filter(
          (role) => !checkedRoles.some((checkedRole) => checkedRole.id === role.id)
        )
        return {...dep, roles: remainingRoles}
      }
      return dep
    })
    setDepartmentList(updatedDepartmentsList)
    const updatedActiveList = updatedDepartmentsList.find((list) => list.id === activeList.id)
    setActiveList(updatedActiveList)
    setCheckedRoles([])
  }

  const handleEditRoles = () => {
    handleShowModal('Edit role', "EditRole", 'md')
  }



  const renderAddForm = () => {
    if (checked) {
      return (
        <Form style={{marginTop: 10, display: checked?'flex':'none'}} onSubmit={handleAddForm}>
          <Form.Control size='sm' style={{marginRight: 10}} onChange={(e) => setNewRole(e.target.value)} ref={inputRef}/>
          <Button size='sm' type='submit'>Add</Button>
        </Form>
      )
    }
  }

  return (
    <Container>
      <Row>
        <Col className='col-3 col-white-box'>
          <div className='m0-box list-white-box'>
            {
              departments.map((department, index) => (
                <div
                  key={index}
                  type='button'
                  className={`white-box m0-box mb-3 ${activeList.id === department.id?'active-white-box': ''}`}
                  onClick={() => handleActiveList(department)}
                >
                  {department.name}
                </div>
              ))
            }
          </div>
        </Col>
        <Col>
          <div className='m0-box'>
            <h5>{activeList.name}</h5>
            <div className='br mb-3'></div>
            <ToggleButton 
              variant='primary' 
              size='sm' 
              type='checkbox' 
              checked={checked} 
              onClick={() => handleToggleButton()}
            >Add new
            </ToggleButton>
            <Button 
              variant="outline-secondary" 
              disabled={checkedRoles <= 0} 
              size="sm" 
              style={{marginLeft: 5}} 
              onClick={() => handleEditRoles()}>Edit ({checkedRoles.length})</Button>
            <Button 
              variant="danger" 
              disabled={checkedRoles <= 0} 
              size="sm" 
              style={{float: 'right'}} 
              onClick={handleDeleteRole}>Delete ({checkedRoles.length})</Button>
            {renderAddForm()}
            <TableComponent tableData={activeList.roles} onCheckedRowsChange={setCheckedRoles}/>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminRoles

import React, { useState } from 'react';
import { Col, Form, Row} from 'react-bootstrap';
import TableComponent from './TableComponent';
import Avatar from './Avatar';

function AdminEmployees() {
  const [employees] = useState([
    {'ID': 1, 'First Name': 'Alice', 'Last Name': 'Smith', 'Role': 'Manager', 'Department': 'Sales', 'Hired Date': '2020-03-15', 'Email': 'Alice.Smith@arch-dev.com'},
    {'ID': 2, 'First Name': 'Bob', 'Last Name': 'Johnson', 'Role': 'Developer', 'Department': 'IT', 'Hired Date': '2019-07-22', 'Email': 'Bob.Johnson@arch-dev.com'},
    {'ID': 3, 'First Name': 'Carol', 'Last Name': 'Williams', 'Role': 'Analyst', 'Department': 'Finance', 'Hired Date': '2018-01-10', 'Email': 'Carol.Williams@arch-dev.com'},
    {'ID': 4, 'First Name': 'David', 'Last Name': 'Brown', 'Role': 'Designer', 'Department': 'Marketing', 'Hired Date': '2021-11-05', 'Email': 'David.Brown@arch-dev.com'},
    {'ID': 5, 'First Name': 'Emma', 'Last Name': 'Davis', 'Role': 'HR Specialist', 'Department': 'Human Resources', 'Hired Date': '2017-06-20', 'Email': 'Emma.Davis@arch-dev.com'},
    {'ID': 6, 'First Name': 'Frank', 'Last Name': 'Miller', 'Role': 'Support Engineer', 'Department': 'IT', 'Hired Date': '2019-02-14', 'Email': 'Frank.Miller@arch-dev.com'},
    {'ID': 7, 'First Name': 'Grace', 'Last Name': 'Wilson', 'Role': 'Sales Representative', 'Department': 'Sales', 'Hired Date': '2020-08-03', 'Email': 'Grace.Wilson@arch-dev.com'},
    {'ID': 8, 'First Name': 'Henry', 'Last Name': 'Moore', 'Role': 'Marketing Specialist', 'Department': 'Marketing', 'Hired Date': '2022-04-18', 'Email': 'Henry.Moore@arch-dev.com'},
    {'ID': 9, 'First Name': 'Ivy', 'Last Name': 'Taylor', 'Role': 'Data Scientist', 'Department': 'Finance', 'Hired Date': '2021-10-25', 'Email': 'Ivy.Taylor@arch-dev.com'},
    {'ID': 10, 'First Name': 'Jack', 'Last Name': 'Anderson', 'Role': 'Sales Associate', 'Department': 'Sales', 'Hired Date': '2016-12-01', 'Email': 'Jack.Anderson@arch-dev.com'},
    {'ID': 11, 'First Name': 'Kate', 'Last Name': 'Thomas', 'Role': 'HR Manager', 'Department': 'Human Resources', 'Hired Date': '2018-07-14', 'Email': 'Kate.Thomas@arch-dev.com'},
    {'ID': 12, 'First Name': 'Liam', 'Last Name': 'Taylor', 'Role': 'Accountant', 'Department': 'Finance', 'Hired Date': '2019-09-23', 'Email': 'Liam.Taylor@arch-dev.com'},
    {'ID': 13, 'First Name': 'Mia', 'Last Name': 'Walker', 'Role': 'Sales Executive', 'Department': 'Sales', 'Hired Date': '2020-11-02', 'Email': 'Mia.Walker@arch-dev.com'},
    {'ID': 14, 'First Name': 'Noah', 'Last Name': 'Allen', 'Role': 'IT Manager', 'Department': 'IT', 'Hired Date': '2017-04-17', 'Email': 'Noah.Allen@arch-dev.com'},
    {'ID': 15, 'First Name': 'Olivia', 'Last Name': 'King', 'Role': 'Marketing Director', 'Department': 'Marketing', 'Hired Date': '2019-03-08', 'Email': 'Olivia.King@arch-dev.com'},
    {'ID': 16, 'First Name': 'Paul', 'Last Name': 'Scott', 'Role': 'Recruiter', 'Department': 'Human Resources', 'Hired Date': '2021-06-28', 'Email': 'Paul.Scott@arch-dev.com'},
    {'ID': 17, 'First Name': 'Quinn', 'Last Name': 'Young', 'Role': 'Sales Manager', 'Department': 'Sales', 'Hired Date': '2015-10-30', 'Email': 'Quinn.Young@arch-dev.com'},
    {'ID': 18, 'First Name': 'Rachel', 'Last Name': 'Adams', 'Role': 'Financial Analyst', 'Department': 'Finance', 'Hired Date': '2022-01-05', 'Email': 'Rachel.Adams@arch-dev.com'},
    {'ID': 19, 'First Name': 'Sam', 'Last Name': 'Clark', 'Role': 'IT Support', 'Department': 'IT', 'Hired Date': '2021-08-22', 'Email': 'Sam.Clark@arch-dev.com'},
    {'ID': 20, 'First Name': 'Tina', 'Last Name': 'Evans', 'Role': 'Marketing Coordinator', 'Department': 'Marketing', 'Hired Date': '2020-05-15', 'Email': 'Tina.Evans@arch-dev.com'}
  ])
  const [groupBy, setGroupBy] = useState('all')

  const handleGroupBySelectForm = (e) => {
    setGroupBy(e.target.value)
  }

  const groupByData = () => {
    if (groupBy !== 'all') {
      const groupedData = employees.reduce((result, employee) => {
        const groupKey = employee[groupBy]
        if (!result[groupKey]) {
            result[groupKey] = []
        }
        result[groupKey].push(employee)

        return result
      }, {})
      return Object.keys(groupedData).map((key) =>
        //TODO: Correct the overflow 
        (<Col key={key} className='box' style={{overflow: 'auto'}}>
          <div className='avatar-text-div'>
            <Avatar type='departments' size={40} name={key} />
            <h5>{key}</h5>
          </div>
          <TableComponent tableData={groupedData[key]} />
        </Col>)
      )
    } else {
      return (
        <Col className='box' style={{overflow: 'auto'}}>
          <TableComponent tableData={employees} />
        </Col>
      )
    }
  }

  return (
    <>
      <Row>
        <Col className='box'>
          <Form.Label>Gropu By</Form.Label>
          <Form.Select onChange={handleGroupBySelectForm}>
            <option value="all">All</option>
            <option value="Department">Department</option>
            <option value="Role">Role</option>
            <option value="Hired Date">Hired Date</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className='sm-view-row'>
          {groupByData()}
      </Row>
    </>
  );
}

export default AdminEmployees;

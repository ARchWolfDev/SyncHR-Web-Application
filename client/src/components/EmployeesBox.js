import React, { useEffect, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import LoadingDiv from './LoadingDiv';

function EmployeesBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState(null)

  // Filter the employees based on the search term
  const filteredEmployees = employees
    ? employees.filter(employee =>
        employee.complete_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Handle input change event
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/employees", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          setEmployees(data)
        } else {
          console.log(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchEmployees()
  }, [])

  if (employees === null) {
    return <LoadingDiv/>
  }

  console.log(employees)

  return (
    <div>
      {/* Search input */}
      <Form>
        <Form.Control
          type='text'
          placeholder='Search Employees'
          value={searchTerm}
          onChange={handleSearchChange}
          className='mb-3'
        />
      </Form>

      {/* Search results */}
      <ListGroup className='scrollable-list'>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <ListGroup.Item key={employee.id}>
              <Link style={{textDecoration: 'none', color: 'black', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}} to={`/profile/${employee.id}`}>
                <Avatar name={employee.complete_name} size={30} style={{marginRight: 10}} /> {employee.complete_name}
              </Link>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No employees found</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

export default EmployeesBox;

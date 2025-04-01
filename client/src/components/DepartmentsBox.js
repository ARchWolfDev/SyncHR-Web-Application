import React, {useEffect, useState} from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import Avatar from './Avatar';
import LoadingDiv from './LoadingDiv';

function DepartmentsBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [departments, setDepartments] = useState([])

    const filteredDepartments = departments.filter(department =>
        department.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    useEffect(() => {
        const fetchDepartmentsList = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/departments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const data = await response.json()
                if (response.ok) {
                    setDepartments(data)
                } else {
                    alert(data.message)
                    setDepartments([])
                }
            } catch (error) {
                console.error(error)
                setDepartments([])
            }
        }
        fetchDepartmentsList()
    }, [])

    console.log(departments)

    if (departments === null) {
        return <LoadingDiv />
    }

  return (
    <div>
        <Form>
            <Form.Control
                type='text'
                placeholder='Search Department'
                className='mb-3'
                onChange={handleSearchChange}
            >
            </Form.Control>
        </Form>
        <ListGroup className='scrollable-list'>
            {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                    <ListGroup.Item key={department.id} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Avatar size={30} style={{marginRight: 10}} type='department'/> {department.name}
                    </ListGroup.Item>
                ))
            ): (<ListGroup.Item>No department found</ListGroup.Item>)
            }
        </ListGroup>
    </div>
  )
}

export default DepartmentsBox

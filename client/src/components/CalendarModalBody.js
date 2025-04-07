import React, { useEffect, useState } from 'react'
import { Accordion, Col, FormCheck, ListGroup, Row } from 'react-bootstrap'
import LoadingComponent from './LoadingComponent'
import { useNavigate } from 'react-router'

function CalendarModalBody({selectedDate}) {

    const formatDate = (date) => {
        const insertedDatge = new Date(date)
        const year = insertedDatge.getFullYear()
        const month  = insertedDatge.getMonth() + 1
        const day = insertedDatge.getDate()

        return `${year}-${month}-${day}`
    }

    const [projectList, setProjectList] = useState([])
    const [activeItem, setActiveItem] = useState([])
    const [checkedTask, setCheckedTask] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/custom/projectTaskListTasksRelation', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json()

                if (!response.ok) {
                    alert(data.message)
                    localStorage.removeItem('token')
                    navigate('/login')
                    
                } 
                setProjectList(data)
                setActiveItem(data[0])

            } catch (error) {
                console.error(error)
            }
        }
        fetchProjects()
    }, [navigate])

    useEffect(() => {
        const fetchTimesheet = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/timesheet?selected_date=${formatDate(selectedDate)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json()
                console.log(data);
                setCheckedTask(data.map(task => ({
                    task_id: task.task_id,
                    project_id: task.project_id
                })))
            } catch (error) {
                console.error(error)
            }
        }
        fetchTimesheet()
    }, [selectedDate])

    const handleClickListItem = (item) => {
        setActiveItem(item)
    }
    
    const handleCheckedTasks = (projectId, taskId, isChecked) => {
        setCheckedTask(prevState => {
            const updatedTasks = isChecked
            ? [...prevState, {task_id: taskId, project_id: projectId}]
            : prevState.filter(item => !(item.task_id === taskId && item.project_id === projectId))

            return updatedTasks
        })
    }

    console.log(projectList)
    console.log(checkedTask)

    return (
        projectList.length === 0? (
            <LoadingComponent />
        ): (
            <Row>
                <Col className='white-list' lg={3}>
                    {
                        projectList.map(
                            project => (
                            <div 
                                type='button' 
                                key={project.id}
                                className={`${activeItem === project?'active-list-item':''} w-box m-3 list-item`}
                                onClick={() => handleClickListItem(project)}
                            >
                                {project.project_name}
                            </div>
                        )
                        )
                    }
                </Col>
                <Col className='w-box'>
                    {
                        Object.keys(activeItem).length === 0? 
                        (<div className='align-center'>Select and Project</div>) : 
                        (
                            <Accordion defaultActiveKey="0">
                                {
                                    activeItem.task_lists.map(item => (
                                        <Accordion.Item key={item.task_list_id} eventKey={item.task_list_id}>
                                            <Accordion.Header>{item.task_list_name}</Accordion.Header>
                                            <Accordion.Body className='p-0'>
                                                <ListGroup variant="flush">
                                                    {item.tasks.map(task => (
                                                        <ListGroup.Item className='check-list-item'>
                                                            <FormCheck 
                                                                checked={checkedTask.some(checked => activeItem.project_id === checked.project_id && task.task_id === checked.task_id) || false}
                                                                onChange={(e) => handleCheckedTasks(activeItem.project_id, task.task_id, e.target.checked)}
                                                            />
                                                            {task.task_name}
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))
                                }
                            </Accordion>
                        )
                    }
                </Col>
            </Row>
        )
    )
}

export default CalendarModalBody

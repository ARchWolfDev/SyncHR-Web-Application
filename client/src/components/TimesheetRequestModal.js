import React, {useEffect, useState} from 'react'
import { Accordion, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { useUserContext } from './UserProvider'
import { useModalContext } from './ModalProvider'
import LoadingDiv from './LoadingDiv'

function TimesheetRequestModal({selectedDate}) {

    const formatDate = (date) => {
        const insertedDatge = new Date(date)
        const year = insertedDatge.getFullYear()
        const month  = insertedDatge.getMonth() + 1
        const day = insertedDatge.getDate()

        return `${year}-${month}-${day}`
    }

    const {currentUser} = useUserContext()
    const {setValue, setRequestType} = useModalContext()
    const [activeTab, setActiveTab] = useState('')
    const [projects, setProjects] = useState([])
    const [activeTasksList, setActiveTasksList] = useState([])
    const [checkedTasks, setCheckedTasks] = useState([])
    const [toSend, setToSend] = useState({
        status: 1,
        date: formatDate(selectedDate),
        created_by: currentUser.user_id,
        created_date: formatDate(new Date()),
        tasks: checkedTasks
    })

    const handleChangeTab = (activeTab) => {setActiveTab(activeTab)}
    const handleCheckboxChange = (project, task, isChecked) => {
        setCheckedTasks(prevState => {
            const updatedTasks = isChecked
            ? [...prevState, {task_id: task, project_id: project}]
            : prevState.filter(item => !(item.task_id === task && item.project_id === project))

            setToSend(prev => ({
                ...prev,
                tasks: updatedTasks
            }));
    
            return updatedTasks;
        });
    };

    const renderProjectsList = () => {
        return projects.map((project) => (
            <div 
            key={project.id}
            role='button'
            className={`box white-box no-margin mb-3 ${activeTab === project.id? 'active-white-box': ''}`}
            onClick={() => handleChangeTab(project.id)} 
            >
                <h6 className='no-margin'>{project.name}</h6>
            </div>
        ))
    }

    const renderTasksLists = () => {
        return activeTasksList.map(tasksList => (
            <Accordion.Item key={tasksList.id} eventKey={tasksList.id}>
                <Accordion.Header>{tasksList.name}</Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                        {tasksList.tasks.map(task => (
                            <ListGroup.Item key={task.id}>
                                <Form.Check 
                                    style={{display: 'inline-block', marginRight: 10}}
                                    checked={checkedTasks.some(item => item.project_id === activeTab && item.task_id === task.id) || false}
                                    onChange={(e) => handleCheckboxChange(activeTab, task.id, e.target.checked)}
                                />
                                {task.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        ))
    }

    useEffect(() => {
        const fetchMarkedTasks = async () => {
            try {
                fetch(`http://127.0.0.1:5000/api/tasks?date=${formatDate(selectedDate)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => response.json())
                .then(data => setCheckedTasks(data))
            } catch (error) {
                console.error(error)
            }
        }
        fetchMarkedTasks()
    }, [selectedDate])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                fetch('http://127.0.0.1:5000/api/projects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => response.json())
                .then(data => setProjects(data))
            } catch (error) {
                console.error(error)
            }
        }
        fetchProjects()
    }, [])

    useEffect(() => {
        const fetchTaskLists = async () => {
            try {
                fetch (`http://127.0.0.1:5000/api/task-lists?projectId=${activeTab}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => response.json())
                .then(data => setActiveTasksList(data))
            } catch (error) {
                console.error(error)
            }
        }
        fetchTaskLists()
    }, [activeTab])

    useEffect(() => {
        setRequestType('/api/request/timesheet')
        setValue(toSend)
    }, [setValue, toSend, setRequestType])

  return (
    <Row>
        <Col style={{maxWidth: '25%', borderRight: '0.5px solid #ddd'}}>
            {projects? renderProjectsList() : <LoadingDiv />}
        </Col>
        <Col>
            <Accordion>
                {activeTasksList? renderTasksLists(): <LoadingDiv />}
            </Accordion>
        </Col>
    </Row>
  )
}

export default TimesheetRequestModal

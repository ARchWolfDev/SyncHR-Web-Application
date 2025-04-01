import React, { useEffect, useState, useMemo } from 'react'
import { Col, Container, Form, Row, Nav, Button, Accordion, ListGroup} from 'react-bootstrap'

function CalendarModal(props) {

    const projectsList = ['Internal', 'SyncHR']
    const projectsTasksList = {
        'Internal': [
            'Internal Task List'
        ],
        'SyncHR': [
            'Development',
            'Operational',
            'Test'
        ]

    }
    const projectTasks = {
        'Internal Task List': [
            'Meetings',
            'One to One',
            'Events',
            'Training'
        ],
        'Development': [
            'Project Meetins',
            'Application Developments',
            'Client Meetings'
        ],
        'Operational': [
            'Operational Activity',
            'Project Meetings',
            'Application Deployment'
        ],
        'Test': [
            'Project Meeting',
            'Application Test'
        ]
    }

    const userInformation = useMemo(() => ({
            'userId': 'EMP-10001',
            'completeName': 'Andrei Rachieru',
            'role': 'Manager',
            'department': 'Management'
        }), [])



    const [selectedProjects, setSelectedProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(''); 
    const [activeProjectIndex, setActiveProjectIndex] = useState(null)
    const [checkedTasks, setCheckedTasks] = useState({})

    const handleSelectedProject = (e) => {
        const selectedProject = e.target.value

        if (selectedProject && !selectedProjects.includes(selectedProject)) {
            setSelectedProjects(prevProjects => [...prevProjects, selectedProject])
            setActiveProjectIndex(selectedProjects.length)
        }
        setSelectedProject('');
    }

    const handleRemoveProject = (projectToRemove) => {
        setSelectedProjects(prevProjects => 
          prevProjects.filter(project => project !== projectToRemove) // Remove the selected project
        );
        if (selectedProjects.indexOf(projectToRemove) === activeProjectIndex) {
            setActiveProjectIndex(null)
            
        }
        if (selectedProjects.length === 0) {
            setActiveProjectIndex(null)
        }
    };

    const handleCheckboxChange = (project, taskList, task, isChecked) => {
        setCheckedTasks(prevState => ({
            ...prevState, 
            [project]: {
                ...prevState[project],
                [taskList]: {
                    ...prevState[project]?.[taskList],
                    [task]: isChecked
                }
            }
        }))
    }

    const handleTasks = (list, project) => {
        const tasks = projectTasks[list] || []
        if (tasks.length > 0) {
            return (
                tasks.map((task, index) => (
                    <ListGroup.Item key={index}>
                        <Form.Check 
                            key={task} 
                            className='accordion-custom-checkbox'
                            checked={checkedTasks[project]?.[list]?.[task] || false}
                            onChange={(e) => handleCheckboxChange(project, list,  task, e.target.checked)}
                            >
                        </Form.Check>{task}</ListGroup.Item>
                ))
            )
        } else {
            return (<ListGroup.Item>No tasks</ListGroup.Item>)
        }
    }

    const renderProjectContent = () => {
        if (activeProjectIndex === null || selectedProjects.length === 0 ) {
            return <div className='no-content-message'>Select a project</div>
        } else {
            const project = selectedProjects[activeProjectIndex]
            const taskList = projectsTasksList[project] || []
            return (
                <div>
                    <Accordion flush className='accordion-custom-border'>
                        {taskList.length > 0? (
                            taskList.map((list, index) => (
                                <Accordion.Item eventKey={index} key={index}>
                                    <Accordion.Header>{list}</Accordion.Header>
                                    <Accordion.Body>
                                        <ListGroup>
                                            {handleTasks(list, project)}
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                        ):(<div style={{padding: "1rem 1.25rem"}} >No project selected</div>)}
                    </Accordion>
                </div>
            )
        }
    }

    useEffect(() => {
        props.setValue(checkedTasks)
        props.setRequestType('timesheet/EMP-1001')
    }, [checkedTasks, props, userInformation])

  return (
    <Container>
        <Row>
            <Col className='calendar-modal-emplyee-info'>
                <Form>
                    <Form.Group className="mb-3" controlId="completeName">
                        <Form.Label>Employee</Form.Label>
                        <Form.Control type="text" value={userInformation.completeName} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" value={userInformation.role} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control type="text" value={userInformation.department} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="selectedDate">
                        <Form.Label>Selected Date</Form.Label>
                        <Form.Control type="text" value={props.selectedDate} readOnly/>
                    </Form.Group>
                </Form>
            </Col>
            <Col>
                <Form.Select className='mb-3' onChange={handleSelectedProject} value={selectedProject}>
                    <option value="">Select Project</option>
                    {projectsList.map((project, index) => (
                        <option value={project} key={index}>{project}</option>
                    ))}
                </Form.Select>
                <Nav variant="tabs" activeKey={activeProjectIndex} onSelect={(selectedKey) => setActiveProjectIndex(parseInt(selectedKey))}>
                    {selectedProjects.map((project, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link eventKey={index}>
                                {project} 
                                <Button 
                                    onClick={() => handleRemoveProject(project)} 
                                    style={{ padding: 0, marginLeft: '5px' }}  
                                    variant="link">
                                    <i className="fa-solid fa-x fa-2xs"></i>
                                </Button>
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
                {renderProjectContent()}
            </Col>
        </Row>
    </Container>
  )
}

export default CalendarModal

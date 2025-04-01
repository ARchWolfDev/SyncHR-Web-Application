import React, { useState, useRef } from 'react'
import { useModalContext } from './ModalProvider';
import { Container, Row, Col, Button, Form, ToggleButton, Badge } from 'react-bootstrap'
import TableComponent from './TableComponent';
import Avatar from './Avatar';

function AdminTasks() {

  const [taskLists, setTasksList] = useState([
    {
      id: 1,
      name: "Development",
      createdBy: "Alice Johnson",
      dateCreated: "2024-11-10",
      tasks: [
        { id: 1, name: "Application development" },
        { id: 2, name: "API integration" },
        { id: 3, name: "Database design" }
      ]
    },
    {
      id: 2,
      name: "Marketing",
      createdBy: "Bob Smith",
      dateCreated: "2024-11-11",
      tasks: [
        { id: 4, name: "Social media campaign" },
        { id: 5, name: "Email newsletter" },
        { id: 6, name: "SEO optimization" }
      ]
    },
    {
      id: 3,
      name: "Design",
      createdBy: "Carol White",
      dateCreated: "2024-11-09",
      tasks: [
        { id: 7, name: "Wireframe creation" },
        { id: 8, name: "UI/UX prototyping" },
        { id: 9, name: "Graphic design for ads" }
      ]
    },
    {
      id: 4,
      name: "Testing",
      createdBy: "David Lee",
      dateCreated: "2024-11-08",
      tasks: [
        { id: 10, name: "Unit testing" },
        { id: 11, name: "Integration testing" },
        { id: 12, name: "User acceptance testing" }
      ]
    },
    {
      id: 5,
      name: "Operations",
      createdBy: "Eve Brown",
      dateCreated: "2024-11-07",
      tasks: [
        { id: 13, name: "Server maintenance" },
        { id: 14, name: "Data backup" },
        { id: 15, name: "System monitoring" }
      ]
    }
  ]);

  const [activeList, setActiveList] = useState(taskLists[0])
  const [checkedForm, setCheckedForm] = useState(false)
  const [newTaskName, setNewTask] = useState('')
  const [checkedTasks, setCheckedTasks] = useState([])
  const {handleShowModal} = useModalContext();
  const inputRef = useRef(null)

  const handleCheckedRowsChange = (checkedIndices) => {
    setCheckedTasks(checkedIndices)
  }

  const handleTasksListButton = (listId) => {
    const listSelected = taskLists.filter((task) => task.id === listId)
    if (listSelected) {
      setActiveList(listSelected[0])
    }
    setCheckedTasks([])
  }
  const handleAddTaskRadioButton = () => {
    setCheckedForm((prevChecked) => !prevChecked)
    if (!checkedForm) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }
  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value)
  }
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskName.trim() === '') return
  
    const updatedTaskLists = taskLists.map((list) => {
      if (list.id === activeList.id) {
        const newTask = {
          id: list.tasks.length + 1,
          name: newTaskName
        }
        return {
          ...list,
          tasks: [...list.tasks, newTask]
        }
      }
      return list
    })
  
    setTasksList(updatedTaskLists)
  
    const updatedActiveList = updatedTaskLists.find((list) => list.id === activeList.id)
    setActiveList(updatedActiveList)
    setNewTask('')
  }

  const handleDeleteTasks = () => {
    const updatedTaskLists = taskLists.map((list) => {
      if (list.id === activeList.id) {
        const remainingTasks = list.tasks.filter(
          (task) => !checkedTasks.some((checkedTask) => checkedTask.id === task.id)
        )
        return { ...list, tasks: remainingTasks }
      }
      return list
    })

    setTasksList(updatedTaskLists)

    const updatedActiveList = updatedTaskLists.find((list) => list.id === activeList.id)
    setActiveList(updatedActiveList)
    setCheckedTasks([])
  }

  // TODO: Create an Edit Tasks Modal Component (Rename, Move (eventualy)) 
  const handleEditTask = () => {
    console.log(checkedTasks)
    handleShowModal("Edit tasks", '', 'md')
  }

  // const option = [
  //   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  //   { value: 'green', label: 'Green', color: '#36B37E' },
  //   { value: 'forest', label: 'Forest', color: '#00875A' },
  //   { value: 'slate', label: 'Slate', color: '#253858' },
  //   { value: 'silver', label: 'Silver', color: '#666666' },
  // ]

  return (
    <Container>
      <Row>
        <Col className='col-3 col-white-box'>
          <div className='m0-box list-white-box scroll-snap-list'>
            {taskLists.map((list) => (
              <div 
                key={list.id} 
                type='button' 
                className={`white-box m0-box mb-3 ${activeList.id === list.id?'active-white-box': ''}`} 
                onClick={() => handleTasksListButton(list.id)}
              >
                {list.name}
              </div>
            ))}
          </div>
        </Col>
        <Col>
          <div className='m0-box'>
            <h5>{activeList.name} 
              List 
              <i className="fa-solid fa-pen-to-square float-r"></i>
            </h5>
            <div className='br mb-3'></div>
            <Row>
              <Col>
              <p>Projects: <Badge bg="primary">SyncHR</Badge><Badge bg="success">Internal</Badge></p>
              <p>Tasks no: {activeList.tasks.length}</p>
              <p className='no-margin'>Most used by: </p>
              <div className='avatar-text-div'>
                <Avatar size={20} type='department' name='Development'/>
                <h6 style={{marginLeft: 5}}>Development Team</h6>
              </div>
              </Col>
              <Col className='col-4'>
                <span>Created by: <strong>{activeList.createdBy}</strong></span>
                <br></br>
                <span>Date: <strong>{activeList.dateCreated}</strong></span>
              </Col>
            </Row>
            <div className='br mb-3 mt-3'></div>
            <ToggleButton 
              variant='primary' 
              size='sm' 
              type='checkbox' 
              checked={checkedForm} 
              onClick={handleAddTaskRadioButton}>Add Task</ToggleButton>
            <Button 
              variant="outline-secondary" 
              disabled={checkedTasks <= 0} 
              size="sm" 
              style={{marginLeft: 5}} 
              onClick={() => handleEditTask()}>Edit ({checkedTasks.length})</Button>
            <Button 
              variant="danger" 
              disabled={checkedTasks <= 0} 
              size="sm" 
              style={{float: 'right'}} 
              onClick={handleDeleteTasks}>Delete ({checkedTasks.length})</Button>
            <Form style={{marginTop: 10, display: checkedForm?'flex':'none'}} onSubmit={handleAddTask}>
              <Form.Control size='sm' style={{marginRight: 10}} placeholder='Task Name + Enter' onChange={handleTaskInputChange} value={newTaskName} ref={inputRef}></Form.Control>
              <Button size="sm" type='submit'>Add</Button>
            </Form>
            <TableComponent tableData={activeList.tasks} onCheckedRowsChange={handleCheckedRowsChange}/>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminTasks

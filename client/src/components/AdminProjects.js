import React from 'react'
import { Col, Row, Badge } from 'react-bootstrap'
import Avatar from './Avatar'
import { useModalContext } from './ModalProvider'
import EditProjectModal from './EditProjectModal'

function AdminProjects() {


  const projects = [
    {id: 1, projectName: 'Project Name', clientName: 'Client Name', taskList: ['Development', 'Operational'], status: 'Active'}
  ]
  const {handleShowModal} = useModalContext()

  const handleEditIcon = (projectDetails) => {
    handleShowModal('Edit Project', (props) => <EditProjectModal {...props} project={projectDetails}/> , 'md')
  }

  return (
    <Row>
      {projects.map((project) => (
        <Col className='box' key={project.id} style={{display: 'flex', alignItems: 'center', flex: '1 1 100%'}}>
          <div className='avatar-text-div' style={{width: '50%'}}>
            <Avatar size={75} name='Project Name' type='project'/>
            <div style={{marginLeft: 10}}>
              <h5 style={{marginLeft: 0}}>{project.projectName} <Badge bg="success">{project.status}</Badge></h5>
              <p>{project.clientName}</p>
            </div>
          </div>
          <div style={{marginBottom: '1rem'}}>
            <p className='no-margin'>TaskList:</p>
            {project.taskList.map((list) => (
              <Badge bg="success" key={list}>{list}</Badge>
            ))}
          </div>
          <div style={{display: 'flex', marginLeft: 'auto'}}>
            <div style={{position: 'relative'}}>
              <Avatar size={30} name='John' />
            </div>
            <div style={{position: 'relative', right: 10}}>
              <Avatar size={30} name='Marcu'/>
            </div>
            <div style={{position: 'relative', right: 20}}>
              <Avatar size={30} name='Ioana'/>
            </div>
          </div>
          <div>
            <i type='button' onClick={() => handleEditIcon(project)} className="fa-solid fa-ellipsis"></i>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default AdminProjects

import React from 'react'
import { Form } from 'react-bootstrap'
import MultiSelect from './MultiSelect'

function EditProjectModal({project}) {
  return (
    <Form>
        <Form.Label>Project Name</Form.Label>
        <Form.Control className='mb-3' value={project.projectName}/>
        <Form.Label>Client Name</Form.Label>
        <Form.Control className='mb-3' value={project.clientName}/>
        <Form.Label>Task lists assigned</Form.Label>
        <MultiSelect />
        <Form.Label>Status</Form.Label>
        <Form.Select className='mb-3'>
            <option>Active</option>
            <option>Inactive</option>
            <option>On Hold</option>
        </Form.Select>
    </Form>
  )
}

export default EditProjectModal

import React from 'react'
import { useParams } from 'react-router-dom'

function DepartmentComponent() {

    const {id} = useParams()

  return (
    <div>
      {id}
    </div>
  )
}

export default DepartmentComponent

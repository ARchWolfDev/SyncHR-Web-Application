import React from 'react'
import { Placeholder } from 'react-bootstrap'

function PlaceholderScreen() {
  return (
    <div>
      <div className='sidebar'>
        <div className='sidebar-logo'>
          <Placeholder xs={12} size="lg"/>
        </div>
        <div className='sidebar-items'>
          <Placeholder xs={2}/>
          <Placeholder xs={9}/>
          <Placeholder xs={2}/>
          <Placeholder xs={9}/>
          <Placeholder xs={2}/>
          <Placeholder xs={9}/>
          <Placeholder xs={2}/>
          <Placeholder xs={9}/>
        </div>
      </div>
      <div className='header'>
          <Placeholder xs={6}/>
      </div>
      <div className='content'>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={3} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={3} />
        </Placeholder>
      </div>
    </div>
  )
}

export default PlaceholderScreen

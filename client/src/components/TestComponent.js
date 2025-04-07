import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import LoadingComponent from './LoadingComponent'

function TestComponent() {

    return (
        <div>
            <LoadingComponent />
            <Button disabled><div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div></Button>
        </div>
    )
}

export default TestComponent

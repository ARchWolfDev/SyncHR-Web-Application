import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

function ListObjectComponent({listData=[], objectComponent}) {

    const [activeItem, setActiveItem] = useState(listData[0])

    const handleClickListItem = (item) => {
        setActiveItem(item)
    }

    return (
        <Row>
            <Col className='white-list' lg={3}>
                {
                    listData.map(data => (
                        <div type='button' onClick={() => handleClickListItem(data)} className={`${activeItem.id === data.id?'active-list-item':''} w-box m-3 list-item`} key={data.id}>{data.project_name}</div>
                    ))
                }
            </Col>
            <Col>
                <div className='w-box'>
                    {objectComponent}
                </div>
            </Col>
        </Row>
    )
}

export default ListObjectComponent

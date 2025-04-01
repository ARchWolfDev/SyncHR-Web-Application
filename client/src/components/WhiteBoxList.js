import React, {useState} from 'react'
import { Col } from 'react-bootstrap'

function WhiteBoxList({listData, returnData = () => {}}) {

    const [activeList, setActiveList] = useState(listData[0])

    const handleActiveList = (list) => {
        setActiveList(list)
        returnData(list)
    }

  return (
    <Col className='col-3 col-white-box'>
        <div className='m0-box list-white-box scroll-snap-list'>
        {listData.map((list) => (
            <div 
            key={list.id} 
            type='button' 
            className={`white-box m0-box mb-3 ${activeList.id === list.id?'active-white-box': ''}`} 
            onClick={() => handleActiveList(list)}
            >
            {list.name}
            </div>
        ))}
        </div>
    </Col>
  )
}

export default WhiteBoxList

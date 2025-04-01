import React, { useState } from 'react'
import { Col, Container, Nav, Row} from 'react-bootstrap'
import SettingsModalTab0 from './SettingsModalTab0'
import SettingsModalTab1 from './SettingsModalTab1'
import SettingsModalTab2 from './SettingsModalTab2'

function SettingsModal(props) {

    const [navTab, setNavTab] = useState(0)

    const handleNavTab = (tabId) => {
        setNavTab(tabId)
    }

    const renderTabContent = () => {
        const tabContentArray = [<SettingsModalTab0 setValue={props.setValue} setRequestType={props.setRequestType}/>, <SettingsModalTab1 />, <SettingsModalTab2 />]
        return tabContentArray.at(navTab)
    }

    
  return (
    <Container>
        <Row>
            <Col style={{maxWidth: '25%', borderRight: '0.5px solid #ddd'}}>
                <Nav variant="pills" defaultActiveKey="link-0" className="flex-column column-nav-flex">
                    <Nav.Item>
                        <Nav.Link eventKey="link-0" onClick={() => handleNavTab(0)}><i className="fa-solid fa-user"></i> Personal info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" onClick={() => handleNavTab(1)}><i className="fa-solid fa-house"></i> App settings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" onClick={() => handleNavTab(2)}><i className="fa-solid fa-lock"></i> Security</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>
            <Col>
                {renderTabContent()}
            </Col>
        </Row>
    </Container>
  )
}

export default SettingsModal

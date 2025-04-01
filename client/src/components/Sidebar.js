import React, { useState } from 'react';
import { useModalContext } from './ModalProvider';
import { useToastContext } from './ToastMessageBoxProvider';
import SettingsModal from './SettingsModal';
import RequestNewTimeOffModal from './RequestNewTimeOffModal';
import HistoryTimeOffModal from './HistoryTimeOffModal';
import RequestNewRequestModal from './RequestNewRequestModal';
import HistoryRequestModal from './HistoryRequestModal';
import { Link, useLocation } from 'react-router-dom';
import logo from '../Logo_v2_bg_black.png'
import { CloseButton } from 'react-bootstrap';
import { useUserContext } from './UserProvider';

function Sidebar() {

  const activeButtonSubNav = {backgroundColor: 'black', borderRadius: '0.375rem 0.375rem 0px 0px'}

  const {handleLogoutUser, currentUser} = useUserContext()
  const {handleToastMessageBox} = useToastContext();
  const {handleShowModal} = useModalContext();
  const [offCanvan, setOffCanvan] = useState(false);
  const [timeOffSubNav, setTimeOffSubNav] = useState(false)
  const [requestsSubNav, setRequestsSubNav] = useState(false)
  const location = useLocation()

  const handleSettingsModal = () => {handleShowModal('Settings', (props) => <SettingsModal {...props} />)};
  const handleTimeOffButton = () => {setTimeOffSubNav(!timeOffSubNav)}
  const handleRequestNewTimeOffModal = () => {handleShowModal('Request new Time Off', (props) => <RequestNewTimeOffModal {...props}/>)}
  const handleHistoryTimeOffModal = () => {handleShowModal('Time Off History', (props) => <HistoryTimeOffModal {...props}/>)}
  const handleRequestsButton = () => {setRequestsSubNav(!requestsSubNav)}
  const handleNewRequestModal = () => {handleShowModal('New Request', (props) => <RequestNewRequestModal {...props} />)}
  const handleHistoryRequestsModal = () => {handleShowModal('Requests History', (props) => <HistoryRequestModal {...props} />)}
  const handleMyDocuments = () => {handleShowModal('My Documents')}
  const handleInbox = () => {handleShowModal('Inbox')}
  const triggerOffCanvan = () => {setOffCanvan(!offCanvan);};

  const renderAdminLink = () => {
    return currentUser.applicationRole.includes("Admin")?
    <Link to={'/admin/'} className={location.pathname.startsWith('/admin')? 'active-nav-item': ''}><i className="fa-solid fa-star"></i>Admin</Link>
    : null
  }

  // active-nav-item

  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <img alt='Logo' src={logo}></img>
          <h1 className="text-logo">Sync.</h1>
          <button
            className="menu-button btn btn-dark ms-auto"
            onClick={triggerOffCanvan}
            style={{ display: 'none' }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className={`${offCanvan ? 'offcanvan show' : ''} sidebar-items`}>
          <CloseButton onClick={triggerOffCanvan} className='mb-3 offcanvan-close'/>
          <Link to={'/home'} className={location.pathname === '/home'? 'active-nav-item': ''}><i className="fa-solid fa-house"></i>Home</Link>
          <Link to={'/admin/'} className={location.pathname.startsWith('/admin')? 'active-nav-item': ''}><i className="fa-solid fa-star"></i>Admin</Link>
          <div 
            role='button' 
            onClick={handleTimeOffButton} 
            style={timeOffSubNav? activeButtonSubNav:{}}>
              Time Off <i className={`fa-solid fa-chevron-down arrow ${timeOffSubNav? 'rotated' : ''}`}></i>
          </div>
          <div className={`sidebar-sub-items ${timeOffSubNav? 'show-sub-items': ''}`}>
            <div role='button' onClick={handleRequestNewTimeOffModal}>Request New</div>
            <div role='button' onClick={handleHistoryTimeOffModal}>History</div>
          </div>
          <div 
            role='button' 
            onClick={handleRequestsButton}
            style={requestsSubNav? activeButtonSubNav:{}}>
              Requests <i className={`fa-solid fa-chevron-down arrow ${requestsSubNav? 'rotated' : ''}`}></i>
          </div>
          <div className={`sidebar-sub-items ${requestsSubNav? 'show-sub-items': ''}`}>
            <div role='button' onClick={handleNewRequestModal}>Request New</div>
            <div role='button' onClick={handleHistoryRequestsModal}>History</div>
          </div>
          <div role='button' onClick={handleInbox}>Inbox</div>
          <div role='button' onClick={handleSettingsModal}>Settings</div>
          <div role='button' onClick={handleMyDocuments}>My Documents</div>
          <Link to={'/documentation/1'} className={location.pathname.startsWith('/documentation')? 'active-nav-item': ''}>Internal Documentation</Link>
          <div role='button' onClick={() => handleLogoutUser()}>Log out</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

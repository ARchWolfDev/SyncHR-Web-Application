import React, { createContext, useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalContext = createContext()

export const ModalProvider = ({children}) => {

    const [modalShow, setModalShow] = useState(false)
    const [modalSize, setModalSize] = useState('lg')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBody, setModalBody] = useState('')

    const handleCloseModal = () => {
        setModalShow(false)
    }
    const handleOpenModal = (title, body, size) => {
        setModalTitle(title)
        setModalBody(body)
        setModalSize(size)
        setModalShow(true)
    }
    const handleSaveChanges = () => {
        alert('Modal Saved')
        setModalShow(false)
    }

    return (
        <ModalContext.Provider value={{handleOpenModal}}>
            {children}
            <Modal show={modalShow} onHide={handleCloseModal} size={modalSize} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalBody}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>Close</Button>
                    <Button variant='primary' onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext)
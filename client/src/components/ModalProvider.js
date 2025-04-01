import React, { createContext, useContext, useState } from "react";
import Modal from "./Modal";
import { useToastContext } from "./ToastMessageBoxProvider";


const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const {handleToastMessageBox} = useToastContext();
    const [requestType, setRequestType] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(() => () => null); // Updated to store a component function
    const [value, setValue] = useState({});
    const [modalSize, setModalSize] = useState('lg')
    const [isLoading, setIsLoading] = useState(false)
    // large -> lg
    // medium -> md
    // small -> sm

  const handleShowModal = (title, ContentComponent, size) => {
    setModalSize(size)
    setModalTitle(title);
    setModalContent(() => ContentComponent); // Store component as a function to allow rerender
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  const handleSaveChanges = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (requestType) {
      try {
        fetch(`http://127.0.0.1:5000${requestType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(value)
        })
        .then(response => response.json())
        .then(data => handleToastMessageBox(false, data.message))
      } catch (error) {
        console.error(error)
        handleToastMessageBox(true, "Something is wrong, please try again")
      } finally {
        setIsLoading(false)
        setModalShow(false)
      }
    }
  };

  return (
    <ModalContext.Provider value={{ handleShowModal, value, setValue, modalShow, setRequestType }}>
      {children}
      <Modal
        show={modalShow}
        onHide={handleCloseModal}
        modalTitle={modalTitle}
        BodyComponent={modalContent}
        value={value}
        setValue={setValue}
        setRequestType={setRequestType}
        handleSaveChanges={handleSaveChanges}
        size={modalSize}
        isLoading={isLoading}
      />
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

import { useState, useRef, useEffect } from "react";

const useModal = () => {
    const modalRef = useRef(null);
    const [modalTitle, setModalTitle] = useState('')
    const [modalContent, setModalContent] = useState(null);
    const [value, setValue] = useState('value1');

    console.log('useModal value:', value)

    const handleShowModal = (title, content) => {
        setModalTitle(title)
        setModalContent(content);
        const modalElement = modalRef.current;
        const modalInstance = new window.bootstrap.Modal(modalElement);
        modalInstance.show();
    }

    const handleSaveChanges = () => {
        console.log('Saving data:', value);
    }

    useEffect(() => {
        if (modalRef.current) {
            const modalInstance = new window.bootstrap.Modal(modalRef.current);
            modalInstance.show(); // force the modal to re-render with the updated content
        }
    }, [value]);

    return { modalRef, modalTitle, modalContent, value, setValue,  handleShowModal, handleSaveChanges};
}

export default useModal
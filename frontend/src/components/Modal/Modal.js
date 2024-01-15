import './Modal.css'
import React from 'react'

const Modal = ({onClose, isOpen, children}) => {
    if(!isOpen) return null;

    const childSWithOnClose = React.cloneElement(children, {onClose})

    return (
        <>
            <div className='modal-backdrop' onClick={onClose}></div>
            <div className='modal-content'>
                {childSWithOnClose}
            </div>
        </>
    )
}

export default Modal
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ReservationContext } from '../../contexts/ReservationContext';

const PopModal = ({ title, content }) => {
    const { show, handleClose, handleShow, handleConti } = useContext(ReservationContext);

    return (
        <>
            {/* used template from react modal! */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="outline-primary" onClick={handleConti}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopModal;
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import PropTypes from 'prop-types';

const MessageDialog = ({message, onAccept}) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(message.show);
    }, [message]);

    const onHide = (() => {
        setShowModal(false);
    });

    const deleteDrink = (event) => {
        alert('borrar bebida');
    };

    return (
        <Modal show={showModal} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{message?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message?.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {message?.cancelButtonTitle}
                </Button>
                <Button variant="primary" onClick={deleteDrink}>
                    {message?.acceptButtonTitle}
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

MessageDialog.propTypes = {
    message: PropTypes.shape ({
        show: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        cancelButtonTitle: PropTypes.string.isRequired,
        acceptButtonTitle: PropTypes.string.isRequired
    }),
    onAccept: PropTypes.func.isRequired
}

export default MessageDialog;
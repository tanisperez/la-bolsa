import React, { useEffect, useState } from "react";

import { Alert } from "react-bootstrap";

import PropTypes from 'prop-types';

const AlertMessage = ({ message }) => {
    const [customMessage, setCustomMessage] = useState({...message});

    const closeAlert = (() => {
        const newMessage = {...customMessage};
        newMessage.show = false;
        setCustomMessage(newMessage);
    });

    useEffect(() => {
        setCustomMessage(message);
    }, [message]);

    return (
        <Alert variant={customMessage.variant} onClose={closeAlert} show={customMessage.show} dismissible>
            <Alert.Heading>{customMessage.title}</Alert.Heading>
            <p>{customMessage.body}</p>
        </Alert>
    );
}

AlertMessage.propTypes = {
    message: PropTypes.shape({
        show: PropTypes.bool.isRequired,
        variant: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string,
    })
}

export default AlertMessage;
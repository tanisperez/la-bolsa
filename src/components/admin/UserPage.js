import React, { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import AlertMessage from "@components/Alert/AlertMessage";

const UserPage = () => {
    const form = useRef(null);
    const [validated, setValidated] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        show: false,
        variant: 'danger',
        title: '',
        body: ''
    });

    const saveChanges = (event) => {

    }

    return (
        <>
            <AlertMessage message={alertMessage} autoCloseTimeOut={7_000}/>
            <Form ref={form} noValidate validated={validated} className="media-breakpoint-down-sm">
                <Form.Group className="mb-3" controlId="formMinDrinkPrice">
                    <Form.Label>Contraseña anterior</Form.Label>
                    <InputGroup>
                        <Form.Control type="password" required/>
                    </InputGroup>
                </Form.Group>
                <hr className="my-4"/>
                <Form.Group className="mb-3" controlId="formMaxDrinkPrice">
                    <Form.Label>Nueva contraseña</Form.Label>
                    <InputGroup>
                        <Form.Control type="password" required/>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCrackDrinkPrice">
                    <Form.Label>Repite la nueva contraseña</Form.Label>
                    <InputGroup>
                        <Form.Control type="password" required/>
                    </InputGroup>
                </Form.Group>
            </Form>
            <div className="d-flex justify-content-end">
                <Button onClick={saveChanges}>Guardar cambios</Button>
            </div>
        </>
    )
};

export default UserPage;
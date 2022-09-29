import React, { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import ConfigClient from "@clients/ConfigClient";

import AlertMessage from "@components/Alert/AlertMessage";

const UserPage = () => {
    const form = useRef(null);
    const [password, setPassword] = useState({
        validated: false,
        oldPassword: undefined,
        newPassword: undefined,
        repeatNewPassword: undefined
    });
    const [alertMessage, setAlertMessage] = useState({
        show: false,
        variant: 'danger',
        title: '',
        body: ''
    });

    const handleOldPasswordChange = (event) => {
        setPassword({
            ...password,
            oldPassword: event.target.value
        });
    }

    const handleNewPasswordChange = (event) => {
        setPassword({
            ...password,
            newPassword: event.target.value
        });
    }

    const handleRepeatNewPasswordChange = (event) => {
        setPassword({
            ...password,
            repeatNewPassword: event.target.value
        });
    }

    const saveChanges = (event) => {
        if (form.current.checkValidity() === false) {
            setPassword({
                ...password,
                validated: true
            });
            event.preventDefault();
            event.stopPropagation();
        } else {
            if (password.newPassword !== password.repeatNewPassword) {
                showErrorMessage('Se produjo un error actualizando la contraseña', 'Las contraseñas nuevas no coinciden');
            } else {
                const adminPasswords = {
                    password: password.oldPassword,
                    newPassword: password.newPassword
                }
                const configClient = new ConfigClient();
                configClient.updateAdminPassword(adminPasswords)
                    .then(() => {
                        showSuccessMessage('Se ha actualizado la contraseña de administrador', 'Para que los cambios surjan efecto, hay que reiniciar el servidor.');
                    })
                    .catch((error) => {
                        console.error(error.message);
                        showErrorMessage('Se produjo un error actualizando la contraseña de administrador', error.message);
                    });
            }
        }
    }

    const showErrorMessage = (title, body) => {
        setAlertMessage({
            show: true,
            variant: 'danger',
            title: title,
            body: body
        });
    }

    const showSuccessMessage = (title, body) => {
        setAlertMessage({
            show: true,
            variant: 'success',
            title: title,
            body: body
        });
    }

    return (
        <>
            <AlertMessage message={alertMessage} autoCloseTimeOut={7_000}/>
            <Form ref={form} noValidate validated={password.validated} className="media-breakpoint-down-sm">
                <Form.Group className="mb-3" controlId="formMinDrinkPrice">
                    <Form.Label>Contraseña anterior</Form.Label>
                    <InputGroup>
                        <Form.Control type="password" required onChange={handleOldPasswordChange}/>
                    </InputGroup>
                </Form.Group>
                <hr className="my-4"/>
                <Form.Group className="mb-3" controlId="formMaxDrinkPrice">
                    <Form.Label>Nueva contraseña</Form.Label>
                    <InputGroup>
                        <Form.Control type="password" required minLength={5} maxLength={10} onChange={handleNewPasswordChange}/>
                        <Form.Control.Feedback type="invalid">
                            La contraseña debe de tener entre 5 y 10 caracteres.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCrackDrinkPrice">
                    <Form.Label>Repite la nueva contraseña</Form.Label>
                    <InputGroup>
                        <Form.Control type="password" required minLength={5} maxLength={10} onChange={handleRepeatNewPasswordChange}/>
                        <Form.Control.Feedback type="invalid">
                            La contraseña debe de tener entre 5 y 10 caracteres.
                        </Form.Control.Feedback>
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
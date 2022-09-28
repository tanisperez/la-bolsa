import React, { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

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
                setAlertMessage({
                    show: true,
                    variant: 'danger',
                    title: 'Se produjo un error actualizando la contraseña',
                    body: 'Las contraseñas nuevas no coinciden'
                });
            } else {
                // Validar que la contraseña vieja coincide.

                // Guardar la nueva contraseña...
                alert(JSON.stringify(password));
            }
            /* const modifiedDrink = {
                drink_id: drink.drink_id,
                alias: drinkAlias,
                name: drinkName,
                min_price: minPrice,
                max_price: maxPrice,
                crack_price: crackPrice
            };
            drinkClient.editDrink(modifiedDrink)
                .then((result) => {
                    console.log('Drink modified: ' + JSON.stringify(result));
                    handleHide(true);
                })
                .catch((error) => console.error(error.message)); */
        }
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
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Form, InputGroup, Modal } from 'react-bootstrap';

import drinkClient from '@clients/DrinkClient';
import { PRICE_STEP } from '@config/LaBolsa';

const AddDrink = (props) => {
    const onHide = props.onHide;
    const form = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [drinkAlias, setDrinkAlias] = useState("");
    const [drinkName, setDrinkName] = useState("");
    const [minPrice, setMinPrice] = useState(undefined);
    const [maxPrice, setMaxPrice] = useState(undefined);
    const [crackPrice, setCrackPrice] = useState(undefined);

    useEffect(() => {
        const validation = validatePrices(minPrice, maxPrice, crackPrice);
        if (!validation.isValid) {
            setAlertMessage(validation.error);
        }
        setShowAlert(!validation.isValid);
    }, [minPrice, maxPrice, crackPrice]);

    const validatePrices = (minPrice, maxPrice, crackPrice) => {
        let error = '';
        if (minPrice && minPrice <= 0) {
            error = 'El precio mínimo no puede ser menor o igual que 0€';
        } else if (maxPrice && maxPrice <= 0) {
            error = 'El precio máximo no puede ser menor o igual que 0€';
        } else if ((maxPrice && minPrice) && maxPrice <= minPrice) {
            error = 'El precio máximo debe ser mayor que el precio mínimo';
        } else if (crackPrice > minPrice) {
            error = 'El precio crack debe ser menor o igual que el precio mínimo';
        }
        return {
            'isValid': error === '',
            'error': error
        }
    };

    const clearState = () => {
        setValidated(false);
        setShowAlert(false);
        setAlertMessage('');
        setDrinkAlias('');
        setDrinkName('');
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setCrackPrice(undefined);
    };

    const handleHide = (refresh) => {
        clearState();
        onHide(refresh);
    };

    const handleDrinkAliasChange = (event) => {
        const upperDrinkAlias = event.target.value.toUpperCase();
        setDrinkAlias(upperDrinkAlias);
    };

    const handleDrinkNameChange = (event) => {
        const drinkName = event.target.value;
        setDrinkName(drinkName);
    };

    const handleMinPriceChange = (event) => {
        const minPrice = parseFloat(event.target.value);
        setMinPrice(minPrice);
    };

    const handleMaxPriceChange = (event) => {
        const maxPrice = parseFloat(event.target.value);
        setMaxPrice(maxPrice);
    };

    const handleCrackPriceChange = (event) => {
        const maxPrice = parseFloat(event.target.value);
        setCrackPrice(maxPrice);
    };

    const addNewDrink = (event) => {
        if (form.current.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            event.stopPropagation();
        } else if (!showAlert) {
            const drink = {
                alias: drinkAlias,
                name: drinkName,
                min_price: minPrice,
                max_price: maxPrice,
                crack_price: crackPrice
            };
            drinkClient.addDrink(drink)
                .then((result) => {
                    console.log('Drink added: ' + JSON.stringify(result));
                    handleHide(true);
                })
                .catch((error) => console.error(error.message));
        }
    };

    return (
        <Modal show={props.show} onHide={handleHide} size="lg" fullscreen="lg-down" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Añadir una nueva bebida</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert show={showAlert} key="danger" variant="danger">
                    {alertMessage}
                </Alert>
                <Form ref={form} noValidate validated={validated}>
                    <Form.Group className="mb-3" controlId="formDrinkAlias">
                        <Form.Label>Alias de la bebida en la Bolsa</Form.Label>
                        <Form.Control type="text" placeholder="BRUG, ABS, STER..." required minLength={2} maxLength={4} value={drinkAlias} onChange={handleDrinkAliasChange} />
                        <Form.Control.Feedback type="invalid">
                            Introduce un alias para la bebida de 2 a 4 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDrinkName">
                        <Form.Label>Nombre de la bebida</Form.Label>
                        <Form.Control type="text" required minLength={2} maxLength={20} placeholder="Brugal, Arehucas, Santa Teresa" onChange={handleDrinkNameChange} />
                        <Form.Control.Feedback type="invalid">
                            Introduce un nombre para la bebida de 2 a 20 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMinDrinkPrice">
                        <Form.Label>Precio mínimo</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" required min={1} placeholder="4,5" step={PRICE_STEP} onChange={handleMinPriceChange} />
                            <InputGroup.Text>€</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                Introduce un precio mínimo mayor que 1€ y múltiplo de {PRICE_STEP}€.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMaxDrinkPrice">
                        <Form.Label>Precio máximo</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" required min={1} placeholder="6,0" step={PRICE_STEP} onChange={handleMaxPriceChange}/>
                            <InputGroup.Text>€</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                Introduce un precio máximo mayor que el precio mínimo y múltiplo de {PRICE_STEP}€.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCrackDrinkPrice">
                        <Form.Label className="text-danger fw-bold">Precio crack</Form.Label>
                        <InputGroup>
                            <Form.Control className="text-danger fw-bold" type="number" required min={1} placeholder="4,0" step={PRICE_STEP} onChange={handleCrackPriceChange}/>
                            <InputGroup.Text>€</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                Introduce un precio crack menor que el precio mínimo y múltiplo de {PRICE_STEP}€.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addNewDrink}>Añadir bebida</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddDrink;

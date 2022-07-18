import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

import drinkClient from '@clients//drink/DrinkClient';

const AddDrink = (props) => {
    const onHide = props.onHide;
    const [drinkAlias, setDrinkAlias] = useState("");
    const [drinkName, setDrinkName] = useState("");
    const [minPrice, setMinPrice] = useState(0.0);
    const [maxPrice, setMaxPrice] = useState(0.0);

    const handleDrinkAliasChange = (event) => {
        const upperDrinkAlias = event.target.value.toUpperCase();
        setDrinkAlias(upperDrinkAlias);
    };

    const handleDrinkNameChange = (event) => {
        const drinkName = event.target.value;
        setDrinkName(drinkName);
    };

    const handleMinPriceChange = (event) => {
        const minPrice = event.target.value;
        setMinPrice(minPrice);
    };

    const handleMaxPriceChange = (event) => {
        const maxPrice = event.target.value;
        setMaxPrice(maxPrice);
    };

    const addNewDrink = () => {
        const drink = {
            alias: drinkAlias,
            name: drinkName,
            min_price: minPrice,
            max_price: maxPrice
        };
        drinkClient.addDrink(drink)
            .then((result) => {
                console.log('Drink added: ' + JSON.stringify(result))
                onHide(true);
            })
            .catch((error) => console.log(error));
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Añadir una nueva bebida</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formDrinkAlias">
                        <Form.Label>Alias de la bebida en la Bolsa</Form.Label>
                        <Form.Control type="email" placeholder="BRUG, ABS, STER..." maxLength={4} value={drinkAlias} onChange={handleDrinkAliasChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDrinkName">
                        <Form.Label>Nombre de la bebida</Form.Label>
                        <Form.Control type="text" maxLength={20} placeholder="Brugal, Arehucas, Santa Teresa" onChange={handleDrinkNameChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMinDrinkPrice">
                        <Form.Label>Precio mínimo</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" min={1} placeholder="4.50" onChange={handleMinPriceChange}/>
                            <InputGroup.Text>€</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMaxDrinkPrice" onChange={handleMaxPriceChange}>
                        <Form.Label>Precio máximo</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" min={1} placeholder="6.00" />
                            <InputGroup.Text>€</InputGroup.Text>
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
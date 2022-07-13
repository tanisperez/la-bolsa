import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

const AddDrink = (props) => {
    const [drinkAlias, setDrinkAlias] = useState("");

    const handleDrinkAliasChange = (event) => {
        const upperDrinkAlias = event.target.value.toUpperCase();
        setDrinkAlias(upperDrinkAlias);
      };

    const addNewDrink = () => {
        console.log('Add new drink');
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Añadir una nueva bebida</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formDrinkAlias">
                        <Form.Label>Alias de la bebida en la Bolsa</Form.Label>
                        <Form.Control type="email" placeholder="BRUG, ABS, STER..." value={drinkAlias} onChange={handleDrinkAliasChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDrinkName">
                        <Form.Label>Nombre de la bebida</Form.Label>
                        <Form.Control type="text" placeholder="Brugal, Arehucas, Santa Teresa" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMinDrinkPrice">
                        <Form.Label>Precio mínimo</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" placeholder="4.50" />
                            <InputGroup.Text>€</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMaxDrinkPrice">
                        <Form.Label>Precio máximo</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" placeholder="6.00" />
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
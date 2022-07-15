import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Pencil, XLg } from 'react-bootstrap-icons';

import AddDrink from '../components/admin/add-drink/AddDrink';
import drinkClient from '@clients/drink/DrinkClient';

const Admin = () => {
    const [drinks, setDrinks] = useState([]);
    const [addDrinkShow, setAddDrinkShow] = useState(false);

    useEffect(() => {
        drinkClient.getDrinks()
            .then((result) => setDrinks(result))
            .then((error) => console.log(error));
    }, []);

    return (
        <Container className="admin-page">
            <Row className="admin-navbar">
                <Col>
                    <h1>Página de administración</h1>
                </Col>
                <Col md="auto" className="px-0">
                    <Button className="add-drink" onClick={() => setAddDrinkShow(true)}>Añadir bebida</Button>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Alias bolsa</th>
                            <th>Nombre de la bebida</th>
                            <th>Precio mínimo</th>
                            <th>Precio máximo</th>
                            <th className="edit-drink"></th>
                            <th className="delete-drink"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            drinks.map(drink => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <td>{drink.id}</td>
                                    <td>{drink.alias}</td>
                                    <td>{drink.name}</td>
                                    <td>{drink.minPrice}</td>
                                    <td>{drink.maxPrice}</td>
                                    <td><Pencil size={20}/></td>
                                    <td><XLg size={20}/></td>
                                </tr>
                            )) 
                        }
                    </tbody>
                </Table>
            </Row>
            <AddDrink show={addDrinkShow} onHide={() => setAddDrinkShow(false)}/>
        </Container >
    );
}

export default Admin;
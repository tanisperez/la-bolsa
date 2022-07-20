import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Pencil, XLg } from 'react-bootstrap-icons';

import drinkClient from '@clients/drink/DrinkClient';
import AddDrink from '@components/admin/add-drink/AddDrink';
import EditDrink from '@components/admin/edit-drink/EditDrink';

const Admin = () => {
    const [drinks, setDrinks] = useState([]);
    const [addDrinkShow, setAddDrinkShow] = useState(false);
    const [editDrinkShow, setEditDrinkShow] = useState(false);
    const [editDrink, setEditDrink] = useState(undefined);

    const loadDrinks = () => {
        drinkClient.getDrinks()
            .then((result) => setDrinks(result))
            .catch((error) => console.log(error));
    };

    const onHideAddDrinkModal = ((refresh) => {
        const refreshDrinks = refresh || false;
        setAddDrinkShow(false);
        if (refreshDrinks) {
            loadDrinks();
        }
    });

    const onHideEditDrinkModal = ((refresh) => {
        const refreshDrinks = refresh || false;
        setEditDrinkShow(false);
        if (refreshDrinks) {
            loadDrinks();
        }
    });

    const openEditDrinkModal = (drinkId) => {
        const drink = drinks.find((drink) => drink.drink_id == drinkId);
        setEditDrink(drink);
        setEditDrinkShow(true);
    };

    useEffect(() => {
        loadDrinks();
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
                                <tr key={drink.drink_id}>
                                    <td>{drink.drink_id}</td>
                                    <td>{drink.alias}</td>
                                    <td>{drink.name}</td>
                                    <td>{drink.min_price}</td>
                                    <td>{drink.max_price}</td>
                                    <td><Pencil size={20} onClick={() => openEditDrinkModal(drink.drink_id)}/></td>
                                    <td><XLg size={20}/></td>
                                </tr>
                            )) 
                        }
                    </tbody>
                </Table>
            </Row>
            <AddDrink show={addDrinkShow} onHide={onHideAddDrinkModal}/>
            <EditDrink show={editDrinkShow} onHide={onHideEditDrinkModal} drink={editDrink}/>
        </Container >
    );
}

export default Admin;
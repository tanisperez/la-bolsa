import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Pencil, XLg } from 'react-bootstrap-icons';

import drinkClient from '@clients/DrinkClient';
import AddDrink from '@components/Admin/AddDrink';
import EditDrink from '@components/Admin/EditDrink';
import MessageDialog from '@components/MessageDialog/MessageDialog';
import AlertMessage from '@components/Alert/AlertMessage';

const DrinkList = () => {
    const [drinks, setDrinks] = useState([]);
    const [addDrinkShow, setAddDrinkShow] = useState(false);
    const [editDrinkShow, setEditDrinkShow] = useState(false);
    const [editDrink, setEditDrink] = useState(undefined);
    const [deleteDrinkMessage, setDeleteDrinkMessage] = useState({
        show: false,
        title: 'Eliminar una bebida',
        buttons: {
            cancelTitle: 'Cancelar',
            acceptTitle: 'Eliminar'
        }
    });
    const [alertMessage, setAlertMessage] = useState({
        show: false,
        variant: 'danger',
        title: '',
        body: ''
    });

    const loadDrinks = () => {
        drinkClient.getDrinks()
            .then((result) => setDrinks(result))
            .catch((error) => {
                console.error(error);
                setAlertMessage({
                    show: true,
                    variant: 'danger',
                    title: 'Se produjo un error al recuperar las bebidas',
                    body: error.message
                });
            });
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

    const onDeleteDrink = ((data) => {
        drinkClient.deleteDrink(data.drink_id)
            .then(() => loadDrinks())
            .catch((error) => {
                console.error(error);
                setAlertMessage({
                    show: true,
                    variant: 'danger',
                    title: `Se produjo un error al eliminar la bebida con el id = ${data.drink_id}`,
                    body: error.message
                });
            });
    });

    const openEditDrinkModal = (drinkId) => {
        const drink = drinks.find((drink) => drink.drink_id == drinkId);
        setEditDrink(drink);
        setEditDrinkShow(true);
    };

    const openDeleteDrinkModal = (drinkId) => {
        const drink = drinks.find((drink) => drink.drink_id == drinkId);
        const { title, buttons } = deleteDrinkMessage;
        const message = {
            show: true,
            title: title,
            buttons: buttons,
            body: `¿Deseas eliminar ${drink.name}?`,
            data: drink
        }
        setDeleteDrinkMessage(message);
    };

    const isMarketEmpty = () => {
        return drinks.length == 0;
    }

    useEffect(() => {
        loadDrinks();
    }, []);

    return (
        <>
            <AlertMessage message={alertMessage} autoCloseTimeOut={7_000}/>
            <div className="drinks-table-container mb-3">
                <Table striped hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Alias</th>
                            <th>Nombre</th>
                            <th>Precio mínimo</th>
                            <th>Precio máximo</th>
                            <th>Precio crack</th>
                            <th className="edit-drink"></th>
                            <th className="delete-drink"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isMarketEmpty() ?
                                <tr>
                                    <td className="text-center" colSpan={8}>No hay bebidas en el mercado</td>
                                </tr>
                                :
                                drinks.map(drink => (
                                    <tr key={drink.drink_id}>
                                        <td>{drink.drink_id}</td>
                                        <td>{drink.alias}</td>
                                        <td>{drink.name}</td>
                                        <td>{drink.min_price} €</td>
                                        <td>{drink.max_price} €</td>
                                        <td>{drink.crack_price} €</td>
                                        <td><Pencil size={20} onClick={() => openEditDrinkModal(drink.drink_id)} /></td>
                                        <td><XLg size={20} onClick={() => openDeleteDrinkModal(drink.drink_id)} /></td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
            </div>

            <div className="d-flex justify-content-end">
                <Button onClick={() => setAddDrinkShow(true)}>Añadir bebida</Button>
            </div>
            <AddDrink show={addDrinkShow} onHide={onHideAddDrinkModal} />
            <EditDrink show={editDrinkShow} onHide={onHideEditDrinkModal} drink={editDrink} />
            <MessageDialog message={deleteDrinkMessage} onAccept={onDeleteDrink} />
        </>
    );
};

export default DrinkList;
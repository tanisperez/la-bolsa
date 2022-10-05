import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, XLg } from 'react-bootstrap-icons';

import drinkClient from '@clients/DrinkClient';
import AddDrink from '@components/Admin/AddDrink';
import EditDrink from '@components/Admin/EditDrink';
import MessageDialog from '@components/MessageDialog/MessageDialog';
import AlertMessage from '@components/Alert/AlertMessage';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DrinkList = () => {
    const [addDrinkShow, setAddDrinkShow] = useState(false);
    const [editDrinkShow, setEditDrinkShow] = useState(false);
    const [editDrink, setEditDrink] = useState(undefined);
    const [columnsDefinition] = useState([
        { field: 'drink_id', rowDrag: true, headerName: 'Id', width: 100},
        { field: 'alias', headerName: 'Alias', width: 90 },
        { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 150},
        { field: 'min_price', headerName: 'Precio mínimo', width: 140 },
        { field: 'max_price', headerName: 'Precio máximo', width: 140 },
        { field: 'crack_price', headerName: 'Precio crack', width: 140 },
        { field: 'edit_drink', headerName: '', width: 60, cellRenderer: (props) => (
            <Pencil size={20} onClick={() => openEditDrinkModal(props)} />
        )},
        { field: 'delete_drink', headerName: '', width: 60, cellRenderer: (props) => (
            <XLg size={20} onClick={() => openDeleteDrinkModal(props)} />
        )}
    ]);
    const [rowData, setRowData] = useState([]);
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
            .then((drinks) => {
                const rows = drinks.map((drink) => {
                    return {
                        drink_id: drink.drink_id,
                        alias: drink.alias,
                        name: drink.name,
                        min_price: drink.min_price,
                        max_price: drink.max_price,
                        crack_price: drink.crack_price,
                        edit_drink: drink.drink_id,
                        delete_drink: drink.drink_id
                    }
                });
                setRowData(rows);
            })
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

    const openEditDrinkModal = (props) => {
        const drinkId = props.value;
        const drink = props.context.rowData.find((drink) => drink.drink_id == drinkId);
        setEditDrink(drink);
        setEditDrinkShow(true);
    };

    const openDeleteDrinkModal = (props) => {
        const drinkId = props.value;
        const context = props.context;
        const drink = context.rowData.find((drink) => drink.drink_id == drinkId);
        const { title, buttons } = context.deleteDrinkMessage;
        const message = {
            show: true,
            title: title,
            buttons: buttons,
            body: `¿Deseas eliminar ${drink.name}?`,
            data: drink
        }
        setDeleteDrinkMessage(message);
    };

    const onRowDragEnd = (event) => {
        const newDrinksOrder = event.api.rowModel.rowsToDisplay
            .map((row => row.data));
        alert(JSON.stringify(newDrinksOrder));
    }

    useEffect(() => {
        loadDrinks();
    }, []);

    return (
        <>
            <AlertMessage message={alertMessage} autoCloseTimeOut={7_000} />
            <div className="drinks-table-container mb-3">
                <div className="ag-theme-alpine" style={{ height: 500 }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnsDefinition}
                        rowDragManaged={true}
                        suppressMoveWhenRowDragging={true}
                        animateRows={true}
                        overlayNoRowsTemplate={'No hay bebidas'}
                        onRowDragEnd={onRowDragEnd}
                        context={{
                            openEditDrinkModal,
                            openDeleteDrinkModal,
                            setEditDrink,
                            setEditDrinkShow,
                            setDeleteDrinkMessage,
                            deleteDrinkMessage,
                            rowData
                        }}>
                    </AgGridReact>
                </div>
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
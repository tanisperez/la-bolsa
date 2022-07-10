import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const Admin = () => {
    return (
        <Container className="admin-page">
            <Row className="admin-navbar">
                <Col>
                    <h1>Página de administración</h1>
                </Col>
                <Col md="auto" className="px-0">
                    <Button className="add-drink">Añadir bebida</Button>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>BRUG</td>
                            <td>Brugal</td>
                            <td>4.50</td>
                            <td>6.00</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>AREH</td>
                            <td>Arehucas</td>
                            <td>4.00</td>
                            <td>5.50</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>STER</td>
                            <td>Santa Teresa</td>
                            <td>5.00</td>
                            <td>6.00</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>ABS</td>
                            <td>Absolut</td>
                            <td>5.00</td>
                            <td>6.00</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default Admin;
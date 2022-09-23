import React, { useState } from 'react';
import { Container, Navbar, Tabs, Tab } from 'react-bootstrap';

import AdminHome from '@components/Admin/AdminHome';
import DrinkList from '@components/Admin/DrinkList';
import ConfigPage from '@components/Admin/ConfigPage';

const Admin = () => {
    const [key, setKey] = useState('home');

    return (
        <div className="admin-page">
            <Navbar bg="primary" variant="dark" className="mb-3">
                <Container>
                    <Navbar.Brand className="fs-2 fw-bold">Página de administración</Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Tabs id="admin-tab" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                    <Tab eventKey="home" title="General">
                        <AdminHome />
                    </Tab>
                    <Tab eventKey="drinks" title="Bebidas">
                        <DrinkList />
                    </Tab>
                    <Tab eventKey="config" title="Configuración">
                        <ConfigPage />
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}

export default Admin;
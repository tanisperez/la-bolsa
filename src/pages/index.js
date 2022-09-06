import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

import Market from '@components/Market/Market';

const LaBolsa = () => {
    return (
        <Container fluid>
            <Row className="mt-4 d-flex justify-content-center">
                <Image id="la-bolsa-logo" src="/la-bolsa.png" alt="La Bolsa" width={532} height={285} />
            </Row>
            <Row>
                <Market />
            </Row>
        </Container>
    );
}

export default LaBolsa
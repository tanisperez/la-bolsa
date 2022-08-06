import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

import Market from '@components/Market/Market';

const LaBolsa = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="logo-container">
                    <Image src="/la-bolsa.png" alt="La Bolsa" width={532} height={285} />
                </Col>
            </Row>
            <Row>
                <Market />
            </Row>
        </Container>
    );
}

export default LaBolsa
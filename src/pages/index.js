import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';

import Market from '@components/Market/Market';

const LaBolsa = () => {
    return (
        <Container>
            <Row className="logo-container">
                <Image src="/la-bolsa.png" alt="La Bolsa" width={600} height={300} />
            </Row>
            <Row>
                <Market />
            </Row>
        </Container>
    );
}

export default LaBolsa
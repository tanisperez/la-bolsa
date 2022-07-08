import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Market.module.css';
import Drink from '@components/drink/Drink';

const Market = () => {
    return (
        <div>
            <Row className="mt-4 mb-4">
                <Col>
                    <Drink alias={'BRUG'} name={'Brugal'} price={5.50} lastPrice={6.00} />
                </Col>
                <Col>
                    <Drink alias={'AREH'} name={'Arehucas'} price={5.00} lastPrice={4.50} />
                </Col>
                <Col>
                    <Drink alias={'STER'} name={'Santa Teresa'} price={6.00} />
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col>
                    <Drink alias={'ABS'} name={'Absolut'} price={5.50} />
                </Col>
                <Col>
                    <Drink alias={'PIND'} name={'Puerto de Indias'} price={6.00} lastPrice={5.50} />
                </Col>
                <Col>
                    <Drink alias={'NORD'} name={'Nordés'} price={6.50} lastPrice={6.00} />
                </Col>
            </Row>
        </div>
    );
}

export default Market;
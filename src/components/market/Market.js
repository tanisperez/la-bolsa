import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Market.module.css';

import MarketClient from '@clients/MarketClient';
import Drink from '@components/Drink/Drink';

const Market = () => {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        const marketClient = new MarketClient();
        marketClient.getMarket()
            .then((result) => setDrinks(result))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <Row className="mt-4 mb-4" xs={1} md={3}>
                {
                    drinks.map(drink => 
                        <Col key={drink.drink_id}>
                            <Drink key={drink.drink_id} alias={drink.alias} name={drink.name} price={drink.price} lastPrice={drink.last_price} />
                        </Col>
                    )
                }
            </Row>
        </div>
    );
};

export default Market;
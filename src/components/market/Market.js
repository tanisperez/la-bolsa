import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MarketClient from '@clients/MarketClient';
import Drink from '@components/Drink/Drink';

import { CLIENT_MARKET_REFRESH_TIME_IN_MILLIS } from '@config/LaBolsa';

import './Market.module.css';

const Market = () => {
    const [drinks, setDrinks] = useState([]);

    const loadMarket = () => {
        const marketClient = new MarketClient();
        marketClient.getMarket()
        .then((result) => setDrinks(result))
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        loadMarket();
        setInterval(loadMarket, CLIENT_MARKET_REFRESH_TIME_IN_MILLIS);
    }, []);

    return (
        <div>
            <Row className="mt-4 mb-4" xs={1} md={2} lg={2} xl={2} xxl={3}>
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
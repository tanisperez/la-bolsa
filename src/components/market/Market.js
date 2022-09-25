import React, { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MarketClient from '@clients/MarketClient';
import ConfigClient from '@clients/ConfigClient';

import Drink from '@components/Drink/Drink';

import styles from './Market.module.css';
import AlertMessage from '../Alert/AlertMessage';

const usePrevious = (value) => {
    const reference = useRef();
    useEffect(() => {
        reference.current = value;
    });
    return reference.current;
};

const Market = () => {
    const [drinks, setDrinks] = useState([]);
    const [crackStatus, setCrackStatus] = useState({
        crack_mode_start: undefined,
        crack_mode_end: undefined,
        enabled: false
    });
    const previousCrackStatus = usePrevious(crackStatus);
    const [alertMessage, setAlertMessage] = useState({
        show: false,
        variant: 'danger',
        title: '',
        body: ''
    });

    const loadMarket = () => {
        const marketClient = new MarketClient();
        marketClient.getMarket()
            .then((result) => {
                setDrinks(result.drinks);
                setCrackStatus(result.crack_mode_status);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        loadMarket();

        const configClient = new ConfigClient();
        configClient.getConfig()
            .then((config) => {
                console.log(`El mercado se refrescará cada ${config.client_market_refresh_time_in_seconds} segundos`);
                setInterval(loadMarket, config.client_market_refresh_time_in_seconds * 1_000);
            })
            .catch((error) => {
                console.error(error);
                setAlertMessage({
                    show: true,
                    variant: 'danger',
                    title: 'Ups, se produjo un error',
                    body: error.message
                });
            });
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (previousCrackStatus && previousCrackStatus.enabled == false && crackStatus.enabled == true) {
            console.log('Crack mode enabled!');
            const audio = new Audio('market-crash.mp3');
            audio.play();
        }
    }, [crackStatus, previousCrackStatus]);

    if (drinks.length == 0) {
        return (
            <div>
                <Row className="mt-5 mb-4">
                    <h1 className={styles.emptyMarket}>No hay bebidas en el mercado</h1>
                </Row>
            </div>
        )
    }
    return (
        <>
            <AlertMessage message={alertMessage} />
            <Row className="mt-4 mb-4" xs={1} sm={1} md={2} lg={2} xl={3} xxl={4}>
                {
                    drinks.map(drink =>
                        <Col key={drink.drink_id}>
                            <Drink key={drink.drink_id} alias={drink.alias}
                                name={drink.name} price={drink.price} lastPrice={drink.last_price}
                                priceChange={drink.price_change} crackModeEnabled={crackStatus.enabled} />
                        </Col>
                    )
                }
            </Row>
        </>
    );
};

export default Market;
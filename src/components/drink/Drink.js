import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';

import PropTypes from 'prop-types';

import styles from './Drink.module.css';

const Drink = ({alias, name, price, lastPrice}) => {

    const getPriceChangeClass = (price, lastPrice) => {
        if (lastPrice === undefined) {
            return styles.drinkNoLastPrice;
        }
        if (price > lastPrice) {
            return styles.drinkPriceChangePositive;
        }
        return styles.drinkPriceChangeNegative;
    };

    const getPriceChange = (price, lastPrice) => {
        if (lastPrice === undefined) {
            return 0;
        }
        return price - lastPrice;
    };

    return (
        <div className={styles.drink}>
            <Row className="m-2">
                <Col className="p-0">
                    <Row>
                        <span className={styles.drinkMarketAlias}>{alias}</span>
                    </Row>
                    <Row>
                        <span className={styles.drinkName}>{name}</span>
                    </Row>
                </Col>
                <Col md="auto" className={styles.drinkGraph}>
                    <Image src="/market-graph-down.png" alt="Gráfica de precio" width={90} height={60}/>
                </Col>
                <Col md={2} className="p-0">
                    <Row className="m-0">
                        <span className={styles.drinkPrice}>{price} €</span>
                    </Row>
                    <Row className="m-0">
                        <span className={getPriceChangeClass(price, lastPrice)}>{getPriceChange(price, lastPrice)} €</span>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

Drink.propTypes = {
    alias: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    lastPrice: PropTypes.number
}

export default Drink;
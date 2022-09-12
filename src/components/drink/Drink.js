import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';

import PropTypes from 'prop-types';

import styles from './Drink.module.css';

const Drink = ({ alias, name, price, lastPrice, crackModeEnabled }) => {

    const getPriceChangeClass = (price, lastPrice) => {
        if (crackModeEnabled) {
            return [styles.drinkPriceChange, styles.drinkPriceCrack];
        }
        if (lastPrice === price) {
            return [styles.drinkPriceChange, styles.drinkNoLastPrice];
        }
        if (price > lastPrice) {
            return [styles.drinkPriceChange, styles.drinkPriceChangePositive];
        }
        return [styles.drinkPriceChange, styles.drinkPriceChangeNegative];
    };

    const getMarketGraph = (price, lastPrice) => {
        if (price > lastPrice) {
            return '/market-up.png';
        }
        return '/market-down.png';
    }

    const getMarketGraphClassName = (price, lastPrice) => {
        if (price == lastPrice) {
            return styles.drinkGraphHidden;
        }
        if (price > lastPrice) {
            return styles.drinkGraphMoveUp;
        }
        return styles.drinkGraphMoveDown;
    }

    const getDrinkClassName = () => {
        if (crackModeEnabled) {
            return [styles.drink, styles.drinkAlert];
        }
        return [styles.drink];
    }

    const getPriceChange = (price, lastPrice) => {
        if (lastPrice === price) {
            return '0';
        }
        const diff = price - lastPrice;
        return (diff > 0) ? `+${diff}` : `${diff}`;
    };

    return (
        <div className={getDrinkClassName().join(' ')}>
            <Row className="m-2 align-items-center">
                <Col className="p-0">
                    <Row className={`${styles.drinkNameGraphContainer} mx-0`}>
                        <Col className={`${styles.drinkNameContainer} px-0`}>
                            <Row className="mx-0">
                                <span className={`${styles.drinkAlias} px-0`}>{alias}</span>
                                <span className={`${styles.drinkName} px-0`}>{name}</span>
                            </Row>
                        </Col>
                        <Col xs="auto" className="px-0 d-flex align-items-center me-1">
                            <Image src={getMarketGraph(price, lastPrice)} className={getMarketGraphClassName(price, lastPrice)} alt="Gráfica de precio" width={90} height={60} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xxl={2} className={styles.drinkPrices}>
                    <span className={`${styles.drinkPrice} px-0`}>{price} €</span>
                    <span className={getPriceChangeClass(price, lastPrice).join(' ')}>{getPriceChange(price, lastPrice)} €</span>
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
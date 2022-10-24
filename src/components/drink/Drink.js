import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';

import PropTypes from 'prop-types';

import styles from './Drink.module.css';

const Drink = ({ alias, name, price, lastPrice, priceChange, crackModeEnabled }) => {

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
        if ((price == lastPrice) || crackModeEnabled) {
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

    return (
        <div className={getDrinkClassName().join(' ')}>
            <div className="d-flex align-items-center">
                <Col className="p-0">
                    <Row className={`${styles.drinkNameGraphContainer} mx-0`}>
                        <Col className={`${styles.drinkNameContainer} px-0 d-flex flex-column`}>
                            <div className='d-flex align-items-center'>
                                <span className={`${styles.drinkAlias} px-0`}>{alias}</span>
                                <Image src={getMarketGraph(price, lastPrice)} className={getMarketGraphClassName(price, lastPrice)} alt="Gráfica de precio" width={67} height={45} />
                            </div>
                            <span className={`${styles.drinkName} px-0`}>{name}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs="auto" className={styles.drinkPrices}>
                    <span className={`${styles.drinkPrice} px-0`}>{price} €</span>
                    <span className={getPriceChangeClass(price, lastPrice).join(' ')}>{(priceChange > 0) ? `+${priceChange}` : `${priceChange}`} €</span>
                </Col>
            </div >
        </div >
    );
};

Drink.propTypes = {
    alias: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    lastPrice: PropTypes.number.isRequired,
    priceChange: PropTypes.number.isRequired
}

export default Drink;
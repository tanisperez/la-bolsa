import logger from '@utils/Logger';

import { PRICE_STEP, MARKET_REFRESH_PRICES_IN_MINUTES, MARKET_REFRESH_PRICES_IN_MILLIS, MARKET_CRACK_DURATION_IN_MILLIS } from '@config/LaBolsa';

class MarketService {

    constructor(drinkService) {
        this.market = [];
        this.drinkService = drinkService;
        this.crackModeEnabled = false;

        logger.info(`La actualización de precios se producirá cada ${MARKET_REFRESH_PRICES_IN_MINUTES} minutos`);
        setInterval(this.updateMarketPrices.bind(this), MARKET_REFRESH_PRICES_IN_MILLIS);
    }

    async updateMarketPrices() {
        if (this.market.length == 0) {
            this.initMarket();
        }
        if (!this.crackModeEnabled) {
            logger.info('Actualización de precios');
            for (let drink of this.market) {
                this.updateDrinkPrice(drink);
                logger.info(`{id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}, precio_anterior: ${drink.last_price}}`);
            }
        } else {
            logger.info(`La actualización de precios está desactivada por el modo crack hasta las ${this.endTimestamp.toLocaleString().replace(',', '')}`);
        }
    }

    async getMarket() {
        if (this.market.length == 0) {
            await this.initMarket();
        }
        return {
            drinks: this.market,
            crack_mode_status: this.getCrackModeStatus()
        };
    }

    async initMarket() {
        this.market = await this.drinkService.getDrinks();
        logger.info('Generación inicial de precios');
        for (let drink of this.market) {
            drink['price'] = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            drink['last_price'] = drink['price'];
            logger.info(`{id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
        }
    }

    getInitialRandomPrice(minPrice, maxPrice) {
        const maxSteps = this.getMaxStepsForPrices(minPrice, maxPrice);
        const randomStep = Math.floor(Math.random() * maxSteps);
        return minPrice + (randomStep * PRICE_STEP);
    }
    
    getMaxStepsForPrices(minPrice, maxPrice) {
        let count = 0;
        for (let i = minPrice; i<= maxPrice; i += PRICE_STEP) {
            count++;
        }
        return count;
    }

    updateDrinkPrice(drink) {
        drink.last_price = drink.price;
        if (drink.price == drink.max_price) {
            drink.price -= PRICE_STEP;
        } else if (drink.price == drink.min_price) {
            drink.price += PRICE_STEP;
        } else if (this.isRandomUp()) {
            drink.price += PRICE_STEP;
        } else {
            drink.price -= PRICE_STEP;
        }
    }

    isRandomUp() {
        const randomUp = Math.floor(Math.random() * 2);
        return randomUp == 1;
    }

    async addDrink(drink) {
        await this.getMarket();
        drink['price'] = this.getInitialRandomPrice(drink.min_price, drink.max_price);
        drink['last_price'] = drink['price'];
        this.market.push(drink);
        logger.info(`Bebida añadida al mercado {id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
    }

    async editDrink(drink) {
        await this.getMarket();
        const currentDrinkIndex = this.market.findIndex((marketDrink) => {
            return marketDrink.drink_id == drink.drink_id;
        });
        if (currentDrinkIndex >= 0) {
            drink['price'] = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            drink['last_price'] = drink['price'];
            this.market[currentDrinkIndex] = drink;
            logger.info(`Bebida modificada en el mercado {id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
        } else {
            logger.error(`No se encontró la bebida {id_bebida: ${drink.drink_id}, nombre: '${drink.name}'} en el mercado`);
        }
    }

    async deleteDrink(drinkId) {
        await this.getMarket();
        const currentDrinkIndex = this.market.findIndex((marketDrink) => {
            return marketDrink.drink_id == drinkId;
        });
        if (currentDrinkIndex >= 0) {
            this.market.splice(currentDrinkIndex, 1);
            logger.info(`Se ha eliminado del mercado la bebida con el drink_id = ${drinkId}`);
        } else {
            logger.error(`No se encontró la bebida con el drink_id = ${drinkId}`);
        }
    }

    enableCrackMode() {
        this.crackModeEnabled = true;
        this.startTimestamp = new Date();
        this.endTimestamp = new Date(Date.now() + MARKET_CRACK_DURATION_IN_MILLIS);
        
        logger.info(`Se ha habilitado el modo crack hasta las ${this.endTimestamp.toLocaleString().replace(',', '')}`);
        for (let drink of this.market) {
            drink['last_price'] = drink['price'];
            drink['price'] = drink.crack_price;
            logger.info(`{id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
        }

        setTimeout(this.disableCrackMode.bind(this), MARKET_CRACK_DURATION_IN_MILLIS);
    }

    disableCrackMode() {
        this.crackModeEnabled = false;
        this.startTimestamp = undefined;
        this.endTimestamp = undefined;
        
        logger.info('El modo crack ha finalizado');
        for (let drink of this.market) {
            drink['last_price'] = drink['price'];
            drink['price'] = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            logger.info(`{id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
        }
    }

    getCrackModeStatus() {
        return {
            crack_mode_start: this.startTimestamp?.toLocaleString().replace(',', ''),
            crack_mode_end: this.endTimestamp?.toLocaleString().replace(',', ''),
            enabled: this.crackModeEnabled
        }
    }
}

export default MarketService;
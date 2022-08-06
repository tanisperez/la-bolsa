import drinkService from '@services/DrinkService';
import logger from '@utils/Logger';
import { PRICE_STEP, MARKET_REFRESH_PRICES_IN_MINUTES, MARKET_REFRESH_PRICES_IN_MILLIS } from '@config/LaBolsa';

class MarketService {

    constructor(drinkService) {
        this.market = [];
        this.drinkService = drinkService;
        logger.info(`La actualización de precios se producirá cada ${MARKET_REFRESH_PRICES_IN_MINUTES} minutos`);
        setInterval(this.updateMarketPrices.bind(this), MARKET_REFRESH_PRICES_IN_MILLIS);
    }

    async updateMarketPrices() {
        if (this.market.length == 0) {
            this.initMarket();
        }
        logger.info('Actualización de precios');
        for (let drink of this.market) {
            this.updateDrinkPrice(drink);
            logger.info(`{id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}, precio_anterior: ${drink.last_price}}`);
        }
    }

    async getMarket() {
        if (this.market.length == 0) {
            await this.initMarket();
        }
        return this.market;
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

    addDrink(drink) {
        drink['price'] = this.getInitialRandomPrice(drink.min_price, drink.max_price);
        drink['last_price'] = drink['price'];
        this.market.push(drink);
        logger.info(`Bebida añadida al mercado {id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
    }

    editDrink(drink) {
        const currentDrinkIndex = this.market.findIndex((marketDrink) => {
            return marketDrink.drink_id == drink.drink_id
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
}

export default new MarketService(drinkService);
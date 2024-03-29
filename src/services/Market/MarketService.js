import logger from '@utils/Logger';

import configService from '@services/ConfigService';

import { PRICE_STEP } from '@config/LaBolsa';

class MarketService {

    constructor(drinkService) {
        this.market = [];
        this.drinkService = drinkService;
        this.crackModeEnabled = false;
        this.config = undefined;

        configService.getConfig()
            .then((config) => {
                this.config = config;
                const marketRefreshTimeInMillis = config.market_refresh_time_in_minutes * 60 * 1_000;
                logger.info(`La actualización de precios se producirá cada ${config.market_refresh_time_in_minutes} minutos`);
                setInterval(this.updateMarketPrices.bind(this), marketRefreshTimeInMillis);
            })
            .catch((error) => logger.error(error));
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
            drink.price = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            drink.last_price = drink.price;
            drink.price_change = drink.price - drink.last_price;
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
        drink.price_change = drink.price - drink.last_price;
    }

    isRandomUp() {
        const randomUp = Math.floor(Math.random() * 2);
        return randomUp == 1;
    }

    async addDrink(drink) {
        await this.getMarket();
        const currentDrinkIndex = this.market.findIndex((marketDrink) => {
            return marketDrink.drink_id == drink.drink_id;
        });
        if (currentDrinkIndex == -1) {
            drink.price = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            drink.last_price = drink.price;
            drink.price_change = drink.price - drink.last_price;
            this.market.push(drink);
        }
        logger.info(`Bebida añadida al mercado {id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
    }

    async editDrink(drink) {
        await this.getMarket();
        const currentDrinkIndex = this.market.findIndex((marketDrink) => {
            return marketDrink.drink_id == drink.drink_id;
        });
        if (currentDrinkIndex >= 0) {
            drink.price = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            drink.last_price = drink.price;
            drink.price_change = drink.price - drink.last_price;
            this.market[currentDrinkIndex] = drink;
            logger.info(`Bebida modificada en el mercado {id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
        } else {
            logger.error(`No se encontró la bebida {id_bebida: ${drink.drink_id}, nombre: '${drink.name}'} en el mercado`);
        }
    }

    async editDrinksOrder(drinks) {
        await this.getMarket();

        for (let drink in drinks) {
            const currentDrinkIndex = this.market.findIndex((marketDrink) => {
                return marketDrink.drink_id == drinks[drink].drink_id;
            });
            this.market[currentDrinkIndex].drink_order = drinks[drink].drink_order;
        }
        this.market = this.market.sort((a, b) => a.drink_order - b.drink_order);
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
        const marketCrackDurationInMillis = this.config.market_crack_duration_in_minutes * 60 * 1_000;
        this.crackModeEnabled = true;
        this.startTimestamp = new Date();
        this.endTimestamp = new Date(Date.now() + marketCrackDurationInMillis);
        
        logger.info(`Se ha habilitado el modo crack hasta las ${this.endTimestamp.toLocaleString().replace(',', '')}`);
        for (let drink of this.market) {
            drink.last_price = drink.price;
            drink.price = drink.crack_price;
            drink.price_change = drink.price - drink.last_price;
            logger.info(`{id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
        }

        setTimeout(this.disableCrackMode.bind(this), marketCrackDurationInMillis);
    }

    disableCrackMode() {
        this.crackModeEnabled = false;
        this.startTimestamp = undefined;
        this.endTimestamp = undefined;
        
        logger.info('El modo crack ha finalizado');
        for (let drink of this.market) {
            const newPrice = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            drink.price_change = newPrice - drink.price;
            drink.last_price = drink.price;
            drink.price = newPrice;
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
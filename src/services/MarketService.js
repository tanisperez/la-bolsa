import drinkService from '@services/DrinkService'

const PRICE_STEP = 0.5;
const MARKET_REFRESH_PRICES_IN_MINUTES = 20;
const MARKET_REFRESH_PRICES = MARKET_REFRESH_PRICES_IN_MINUTES * 60 * 1000;

class MarketService {

    constructor(drinkService) {
        this.market = [];
        this.drinkService = drinkService;
        console.log(`La actualización de precios se producirá cada ${MARKET_REFRESH_PRICES_IN_MINUTES} minutos`);
        setInterval(this.updateMarketPrices.bind(this), MARKET_REFRESH_PRICES);
    }

    async updateMarketPrices() {
        if (this.market.length == 0) {
            this.initMarket();
        }
        console.log('Actualización de precios');
        for (let drink of this.market) {
            this.updateDrinkPrice(drink);
            console.log(`{id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}, precio_anterior: ${drink.previous_price}}`);
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
        console.log('Generación inicial de precios');
        for (let drink of this.market) {
            drink['price'] = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            drink['previous_price'] = drink['price'];
            console.log(`{id_bebida: ${drink.drink_id}, nombre: '${drink.name}', precio_minimo: ${drink.min_price}, precio_maximo: ${drink.max_price}, precio_actual: ${drink.price}}`);
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
        drink.previous_price = drink.price;
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
}

export default new MarketService(drinkService);
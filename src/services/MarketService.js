import drinkService from '@services/DrinkService'

const PRICE_STEP = 0.5;

class MarketService {

    constructor(drinkService) {
        this.market = [];
        this.drinkService = drinkService;
        setInterval(this.updateMarketPrices.bind(this), 2000);
    }

    async updateMarketPrices() {
        if (this.market.length == 0) {
            this.initMarket();
        }
        for (let drink of this.market) {
            this.getNewDrinkPrice(drink);
            console.log(drink);
        }
        console.log('Update market prices');
    }

    async getMarket() {
        if (this.market.length == 0) {
            await this.initMarket();
        }
        return this.market;
    }

    async initMarket() {
        this.market = await this.drinkService.getDrinks();
        for (let drink of this.market) {
            drink['price'] = this.getInitialRandomPrice(drink.min_price, drink.max_price);
            drink['previous_price'] = drink['price'];
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

    getNewDrinkPrice(drink) {
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
import drinkService from '@services/DrinkService'

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
            console.log(drink);
        }
        console.log('Update market prices');
    }

    async getMarket() {
        if (this.market.length == 0) {
            this.initMarket();
        }
        return this.market;
    }

    async initMarket() {
        this.market = await this.drinkService.getDrinks();
        for (let drink of this.market) {
            drink['price'] = this.getInitialRandomPrice(drink.min_price, drink.max_price);
        }
    }

    getInitialRandomPrice(minPrice, maxPrice) {
        const min = minPrice * 10;
        const max = maxPrice * 10;
        const randomPrice = Math.floor(Math.random() * (max - min + 1) + min);
        return randomPrice / 10;
    }
    
    getMaxStepsForPrices(minPrice, maxPrice, step = 0.5) {
        let count = 0;
        for (let i = minPrice; i<= maxPrice; i += step) {
            count++;
        }
        return count;
    }
}

export default new MarketService(drinkService);
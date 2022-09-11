import drinkService from '@services/DrinkService';
import MarketService from '@services/Market/MarketService';

const marketService = new MarketService(drinkService);
export default marketService;
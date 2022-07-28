jest.mock('./DrinkService');
import marketService from './MarketService';

describe('MarketService', () => {
    it.each([
        [4.5, 5.5, 3],
        [4, 5.5, 4],
        [4, 6, 5],
        [4, 7.5, 8]
    ])('get max steps for drink prices between %d and %d', (minPrice, maxPrice, expectedSteps) => {
        const maxSteps = marketService.getMaxStepsForPrices(minPrice, maxPrice);

        expect(maxSteps).toBe(expectedSteps);
    });

    it('get initial random price', () => {
        const minPrice = 4.5;
        const maxPrice = 6;

        const randomPrice = marketService.getInitialRandomPrice(minPrice, maxPrice);

        expect(randomPrice).toBeLessThanOrEqual(maxPrice);
        expect(randomPrice).toBeGreaterThanOrEqual(minPrice);
    });
});
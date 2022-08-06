import marketService from '@services/MarketService';
import logger from '@utils/Logger';

export default async function handler(request, response) {
    switch (request.method) {
        case 'GET':
            return getMarket(response);
        default:
            logger.info(`Method ${request.method} is not implemented`);
            return response.status(400).send('');
    }
}

async function getMarket(response) {
    const drinks = await marketService.getMarket();
    response.status(200)
        .json(drinks);
}
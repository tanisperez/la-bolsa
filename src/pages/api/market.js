import marketService from '@services/MarketService';
import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} from ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'GET':
            return getMarket(response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

async function getMarket(response) {
    const drinks = await marketService.getMarket();
    response.status(200)
        .json(drinks);
}
import drinkService from '@services/DrinkService';
import marketService from '@services/MarketService';

import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} from ${request.socket.remoteAddress}`);

    try {
        switch (request.method) {
            case 'PUT':
                return updateDrinkOrders(request, response);
            default:
                logger.info(`El método ${request.method} no está implementado`);
                return response.status(400).send('');
        }
    } catch (error) {
        logger.error(error);
        response.status('500')
            .send(error.message);
    }
}

async function updateDrinkOrders(request, response) {
    const drinks = request.body;
    logger.info('Petición para ordenar las bebidas: ' + JSON.stringify(drinks));

    await drinkService.editDrinksOrder(drinks);
    logger.info('El orden de las bebidas ha sido modificado');

    await marketService.editDrinksOrder(drinks);
    const market = await marketService.getMarket();

    response.status('200')
        .json(market);
}
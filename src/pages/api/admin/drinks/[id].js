import drinkService from '@services/DrinkService';
import marketService from '@services/MarketService';

import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} from ${request.socket.remoteAddress}`);

    try {
        switch (request.method) {
            case 'PUT':
                return editDrink(request, response);
            case 'DELETE':
                return deleteDrink(request, response);
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

async function editDrink(request, response) {
    const drink = request.body;
    logger.info('Petición para editar una bebida: ' + JSON.stringify(drink));

    const modifiedDrink = await drinkService.editDrink(drink);
    logger.info('Bebida modificada: ' + JSON.stringify(modifiedDrink));

    const drinkDB = await drinkService.getDrink(drink.drink_id);
    marketService.editDrink(drinkDB);

    response.status('200')
        .json(modifiedDrink);
}

async function deleteDrink(request, response) {
    const url = request.url;
    const drinkId = url.substring(url.lastIndexOf('/') + 1);
    logger.info(`Petición para borrar la bebida con el id: ${drinkId}`);

    const deletedDrinkId = await drinkService.deleteDrink(drinkId);
    logger.info(`La bebida con el id ${deletedDrinkId} fue eliminada`);

    marketService.deleteDrink(drinkId);

    response.status('200')
        .json({
            drink_id: drinkId
        });
}
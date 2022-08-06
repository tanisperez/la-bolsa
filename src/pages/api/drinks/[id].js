import drinkService from '@services/DrinkService';
import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} from ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'PUT':
            return editDrink(request, response);
        case 'DELETE':
            return deleteDrink(request, response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

async function editDrink(request, response) {
    const drink = request.body;
    logger.info('Petición para editar una bebida: ' + JSON.stringify(drink));

    const modifiedDrink = await drinkService.editDrink(drink);
    logger.info('Bebida modificada: ' + JSON.stringify(modifiedDrink));

    response.status('200')
        .json(modifiedDrink);
}

async function deleteDrink(request, response) {
    const url = request.url;
    const drinkId = url.substring(url.lastIndexOf('/') + 1);
    logger.info(`Petición para borrar la bebida con el id: ${drinkId}`);

    const deletedDrinkId = await drinkService.deleteDrink(drinkId);
    logger.info(`La bebida con el id ${deletedDrinkId} fue eliminada`);

    response.status('200')
        .json({
            drink_id: drinkId
        });
}
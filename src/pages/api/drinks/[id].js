import drinkService from '@services/DrinkService';
import logger from '@utils/Logger';

export default async function handler(request, response) {
    switch (request.method) {
        case 'PUT':
            return editDrink(request, response);
        case 'DELETE':
            return deleteDrink(request, response);
        default:
            logger.info(`Method ${request.method} is not implemented`);
            return response.status(400).send('');
    }
}

async function editDrink(request, response) {
    const drink = request.body;
    logger.info('Edit drink request: ' + JSON.stringify(drink));

    const modifiedDrink = await drinkService.editDrink(drink);
    logger.info('Drink modified: ' + JSON.stringify(modifiedDrink));

    response.status('200')
        .json(modifiedDrink);
}

async function deleteDrink(request, response) {
    const url = request.url;
    const drinkId = url.substring(url.lastIndexOf('/') + 1);
    logger.info(`Delete drink id: ${drinkId}`);

    const deletedDrinkId = await drinkService.deleteDrink(drinkId);
    logger.info(`Delete drink with id ${deletedDrinkId}`);

    response.status('200')
        .json({
            drink_id: drinkId
        });
}
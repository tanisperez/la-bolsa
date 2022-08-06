import drinkService from '@services/DrinkService'
import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} desde ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'GET':
            return getDrinks(response);
        case 'POST':
            return addDrink(request, response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

async function getDrinks(response) {
    const drinks = await drinkService.getDrinks();
    response.status(200)
        .json(drinks);
}

async function addDrink(request, response) {
    const drink = request.body;
    logger.info('Petición para añadir una bebida: ' + JSON.stringify(drink));

    drink.drink_id = await drinkService.addDrink(drink);
    logger.info('Bebida añadida: ' + JSON.stringify(drink));

    response.status('201')
        .json(drink);
}
import drinkService from '@services/DrinkService'

export default async function handler(request, response) {
    switch (request.method) {
        case 'GET':
            return getDrinks(response);
        case 'POST':
            return addDrink(request, response);
        default:
            console.log(`Method ${request.method} is not implemented`);
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
    console.log('Add drink request: ' + JSON.stringify(drink));

    drink.drink_id = await drinkService.addDrink(drink);
    console.log('Drink added: ' + JSON.stringify(drink));

    response.status('201')
        .json(drink);
}
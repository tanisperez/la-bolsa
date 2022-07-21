import drinkService from '@services/drink/DrinkService'

export default async function handler(request, response) {
    switch (request.method) {
        case 'PUT':
            return editDrink(request, response);
        default:
            console.log(`Method ${request.method} is not implemented`);
            return response.status(400).send('');
    }
}

async function editDrink(request, response) {
    const drink = request.body;
    console.log('Edit drink request: ' + JSON.stringify(drink));

    const modifiedDrink = await drinkService.editDrink(drink);
    console.log('Drink modified: ' + JSON.stringify(modifiedDrink));

    response.status('200')
        .json(modifiedDrink);
}
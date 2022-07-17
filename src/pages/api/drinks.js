import drinkService from '@services/drink/DrinkService'

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
    console.log(request.body);
    response.status('201').send('');
}
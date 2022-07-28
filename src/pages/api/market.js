import marketService from '@services/MarketService'

export default async function handler(request, response) {
    switch (request.method) {
        case 'GET':
            return getDrinks(response);
        default:
            console.log(`Method ${request.method} is not implemented`);
            return response.status(400).send('');
    }
}

async function getDrinks(response) {
    const drinks = await marketService.getMarket();
    response.status(200)
        .json(drinks);
}
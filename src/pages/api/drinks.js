import drinkService from '@services/drink/DrinkService'

export default async function handler(req, res) {
    const drinks = await drinkService.getDrinks();
    res.status(200)
        .json(drinks);
}

class DrinkClient {
    async getDrinks() {
        return [
            {
                "id": 1,
                "alias": "BRUG",
                "name": "Brugal",
                "minPrice": 4.50,
                "maxPrice": 6
            },
            {
                "id": 2,
                "alias": "AREH",
                "name": "Arehucas",
                "minPrice": 4.00,
                "maxPrice": 5.50
            },
            {
                "id": 3,
                "alias": "STER",
                "name": "Santa Teresa",
                "minPrice": 5.00,
                "maxPrice": 6.00
            },
            {
                "id": 4,
                "alias": "ABS",
                "name": "Absolut",
                "minPrice": 5.00,
                "maxPrice": 6.00
            }
        ]
    }
}

const drinkClient = new DrinkClient();
export default drinkClient;
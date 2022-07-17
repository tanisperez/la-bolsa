class DrinkClient {
    async getDrinks() {
        const result = await fetch('/api/drinks');
        const drinks = await result.json();
        return drinks;
    }

    async addDrink(drink) {
        return fetch('/api/drinks', {
            method: 'POST',
            body: JSON.stringify(drink),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

const drinkClient = new DrinkClient();
export default drinkClient;
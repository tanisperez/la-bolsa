class DrinkClient {
    async getDrinks() {
        const response = await fetch('/api/drinks');
        const drinks = await response.json();
        return drinks;
    }

    async addDrink(drink) {
        const response = await fetch('/api/drinks', {
            method: 'POST',
            body: JSON.stringify(drink),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const addedDrink = await response.json();
        return addedDrink;
    }

    async editDrink(drink) {
        const response = await fetch(`/api/drinks/${drink.id}`, {
            method: 'PUT',
            body: JSON.stringify(drink),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const addedDrink = await response.json();
        return addedDrink;
    }
}

const drinkClient = new DrinkClient();
export default drinkClient;
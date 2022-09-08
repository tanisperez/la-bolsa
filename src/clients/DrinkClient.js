class DrinkClient {
    async getDrinks() {
        const response = await fetch('/api/admin/drinks');
        const drinks = await response.json();
        return drinks;
    }

    async addDrink(drink) {
        const response = await fetch('/api/admin/drinks', {
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
        const response = await fetch(`/api/admin/drinks/${drink.drink_id}`, {
            method: 'PUT',
            body: JSON.stringify(drink),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const addedDrink = await response.json();
        return addedDrink;
    }

    async deleteDrink(drink_id) {
        const response = await fetch(`/api/admin/drinks/${drink_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await response.json();
    }
}

export default new DrinkClient();
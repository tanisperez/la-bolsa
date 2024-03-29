class DrinkClient {
    async getDrinks() {
        const response = await fetch('/api/admin/drinks');
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje "${text}"`);
        }
        return await response.json();
    }

    async addDrink(drink) {
        const response = await fetch('/api/admin/drinks', {
            method: 'POST',
            body: JSON.stringify(drink),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje "${text}"`);
        }
        return await response.json();
    }

    async editDrink(drink) {
        const response = await fetch(`/api/admin/drinks/${drink.drink_id}`, {
            method: 'PUT',
            body: JSON.stringify(drink),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje "${text}"`);
        }
        return await response.json();
    }

    async editDrinksOrder(drinks) {
        const response = await fetch('/api/admin/drinks/order', {
            method: 'PUT',
            body: JSON.stringify(drinks),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje "${text}"`);
        }
        return await response.json();
    }

    async deleteDrink(drink_id) {
        const response = await fetch(`/api/admin/drinks/${drink_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje "${text}"`);
        }
        return await response.json();
    }
}

export default new DrinkClient();
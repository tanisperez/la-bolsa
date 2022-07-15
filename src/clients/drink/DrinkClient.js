class DrinkClient {
    async getDrinks() {
        const result = await fetch('/api/drinks');
        const drinks = await result.json();
        return drinks;
    }
}

const drinkClient = new DrinkClient();
export default drinkClient;
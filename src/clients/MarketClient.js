class MarketClient {
    async getMarket() {
        const response = await fetch('/api/market');
        const drinks = await response.json();
        return drinks;
    }
}

export default MarketClient;
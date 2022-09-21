class MarketClient {
    async getConfig() {
        const response = await fetch('/api/config');
        return await response.json();
    }
}

export default MarketClient;
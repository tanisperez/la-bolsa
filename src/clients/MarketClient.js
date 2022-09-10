class MarketClient {
    async getMarket() {
        const response = await fetch('/api/market');
        return await response.json();
    }

    async getCrackModeStatus() {
        const response = await fetch('/api/admin/crack/status');
        return await response.json();
    }

    async enableCrackMode(drink) {
        const response = await fetch('/api/admin/crack/enable', {
            method: 'PUT'
        });
        return await response.json();
    }
}

export default MarketClient;
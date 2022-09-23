class MarketClient {
    async getConfig() {
        const response = await fetch('/api/config');
        return await response.json();
    }

    async editConfig(config) {
        const response = await fetch(`/api/admin/config`, {
            method: 'PUT',
            body: JSON.stringify(config),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const modifiedConfig = await response.json();
        return modifiedConfig;
    }
}

export default MarketClient;
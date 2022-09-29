class MarketClient {
    async getMarket() {
        const response = await fetch('/api/market');
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje "${text}"`);
        }
        return await response.json();
    }

    async getCrackModeStatus() {
        const response = await fetch('/api/admin/crack/status');
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje "${text}"`);
        }
        return await response.json();
    }

    async enableCrackMode(drink) {
        const response = await fetch('/api/admin/crack/enable', {
            method: 'PUT'
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje "${text}"`);
        }
        return await response.json();
    }
}

export default MarketClient;
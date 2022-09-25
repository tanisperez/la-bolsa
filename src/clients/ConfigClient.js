class ConfigClient {
    async getConfig() {
        const response = await fetch('/api/config');
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje ${text}`);
        }
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
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Se produjo un error con el código ${response.status} y el mensaje ${text}`);
        }
        return await response.json();
    }
}

export default ConfigClient;
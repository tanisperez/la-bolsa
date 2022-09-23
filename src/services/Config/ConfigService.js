import BaseService from '@services/Base/BaseService';

class DrinkService extends BaseService {
    constructor() {
        super();
        this.config = undefined;
    }

    async getValueAsInt(key) {
        const row = await this.selectFirst(`
            SELECT 
                value
            FROM config
            WHERE
                key = '${key}'`);
        return parseInt(row.value);
    }

    async getValueAsString(key) {
        const row = await this.selectFirst(`
            SELECT 
                value
            FROM config
            WHERE
                key = '${key}'`);
        return row.value;
    }

    async getMarketRefreshPricesInMinutes() {
        return this.getValueAsInt('MARKET_REFRESH_PRICES_IN_MINUTES');
    }
    
    async getMarketCrackDurationInMinutes() {
        return this.getValueAsInt('MARKET_CRACK_DURATION_IN_MINUTES');
    }

    async getClientMarketRefreshTimeInSeconds() {
        return this.getValueAsInt('CLIENT_MARKET_REFRESH_TIME_IN_SECONDS');
    }

    async getAdminPassword() {
        return this.getValueAsString('ADMIN_PASSWORD');
    }

    async getConfig() {
        if (this.config == undefined) {
            const marketRefresTimeInMinutes = await this.getMarketRefreshPricesInMinutes();
            const marketCrackDurationInMinutes = await this.getMarketCrackDurationInMinutes();
            const clientMarketRefreshTimeInSeconds = await this.getClientMarketRefreshTimeInSeconds();
            this.config = {
                market_refresh_time_in_minutes: marketRefresTimeInMinutes,
                market_crack_duration_in_minutes: marketCrackDurationInMinutes,
                client_market_refresh_time_in_seconds: clientMarketRefreshTimeInSeconds
            }
        }
        return this.config;
    }
}

export default DrinkService;
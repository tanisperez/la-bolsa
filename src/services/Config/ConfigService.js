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

    async getAdminPassword() {
        return this.getValueAsString('ADMIN_PASSWORD');
    }

    async getConfig() {
        if (this.config == undefined) {
            const marketRefresTimeInMinutes = await this.getMarketCrackDurationInMinutes();
            const marketCrackDurationInMinutes = await this.getMarketCrackDurationInMinutes();
            this.config = {
                market_refresh_time_in_minutes: marketRefresTimeInMinutes,
                market_crack_duration_in_minutes: marketCrackDurationInMinutes
            }
        }
        return this.config;
    }
}

export default DrinkService;
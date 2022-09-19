import BaseService from '@services/Base/BaseService';

class DrinkService extends BaseService {

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

}

export default DrinkService;
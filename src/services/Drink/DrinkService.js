import BaseService from '@services/Base/BaseService';

class DrinkService extends BaseService {
    
    async getDrinks() {
        const rows = await this.select('SELECT drink_id, alias, name, min_price, max_price, crack_price FROM drink');
        return rows.map(row => {
            return {
                drink_id: row.drink_id,
                alias: row.alias,
                name: row.name,
                min_price: row.min_price,
                max_price: row.max_price,
                crack_price: row.crack_price
            };
        });
    }

    async getDrink(drinkId) {
        const row = await this.selectFirst(`
            SELECT 
                drink_id, 
                alias, 
                name, 
                min_price, 
                max_price,
                crack_price
            FROM drink
            WHERE
                drink_id = ?`, 
            [drinkId]);
        return {
            drink_id: row.drink_id,
            alias: row.alias,
            name: row.name,
            min_price: row.min_price,
            max_price: row.max_price,
            crack_price: row.crack_price
        };
    }

    async addDrink(drink) {
        const drinkId = await this.executeQuery('INSERT INTO drink(alias, name, min_price, max_price, crack_price) VALUES(?, ?, ?, ?, ?)', 
            [drink.alias, drink.name, drink.min_price, drink.max_price, drink.crack_price]);
        return drinkId;
    }

    async editDrink(drink) {
        await this.executeQuery(`
            UPDATE drink
            SET
                alias = ?,
                name = ?,
                min_price = ?,
                max_price = ?,
                crack_price = ?
            WHERE
                drink_id = ?`, 
            [drink.alias, drink.name, drink.min_price, drink.max_price, drink.crack_price, drink.drink_id]);
        return drink;
    }

    async deleteDrink(drinkId) {
        await this.executeQuery(`
            DELETE FROM drink
            WHERE
                drink_id = ?`, [drinkId]);
        return drinkId;
    }
};

export default DrinkService;
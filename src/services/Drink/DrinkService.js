import BaseService from '@services/Base/BaseService';

class DrinkService extends BaseService {
    
    async getDrinks() {
        const rows = await this.select(`
            SELECT 
                drink_id,
                drink_order,
                alias, 
                name, 
                min_price, 
                max_price, 
                crack_price 
            FROM drink
            ORDER BY 
                drink_order ASC`);
        return rows.map(row => {
            return {
                drink_id: row.drink_id,
                drink_order: row.drink_order,
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
                drink_order,
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
            drink_order: row.drink_order,
            alias: row.alias,
            name: row.name,
            min_price: row.min_price,
            max_price: row.max_price,
            crack_price: row.crack_price
        };
    }

    async addDrink(drink) {
        const drinkId = await this.executeQuery(`
            INSERT INTO drink(alias, drink_order, name, min_price, max_price, crack_price) 
            VALUES(?, (SELECT COALESCE(MAX(drink_order), 0) + 1 FROM drink), ?, ?, ?, ?)`, 
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

    async editDrinksOrder(drinks) {
        for (let drink in drinks) {
            await this.executeQuery(`
                UPDATE drink
                SET
                    drink_order = ?
                WHERE
                    drink_id = ?`, 
                [drinks[drink].drink_order, drinks[drink].drink_id]);
        }
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
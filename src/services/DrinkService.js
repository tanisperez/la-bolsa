import sqlite3 from 'sqlite3';

class DrinkService {
    constructor() {
        const SQLite3 = sqlite3.verbose();
        this.db = new SQLite3.Database('public/labolsa.db');
    }

    select(query) {
        return new Promise((resolve, reject) => {
            this.db.all(query, (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    selectFirst(query, params) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (error, row) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(row);
                }
            });
        });
    }

    executeQuery(query, values) {
        return new Promise((resolve, reject) => {
            this.db.run(query, values, function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    async getDrinks() {
        const rows = await this.select('SELECT drink_id, alias, name, min_price, max_price FROM drink');
        return rows.map(row => {
            return {
                drink_id: row.drink_id,
                alias: row.alias,
                name: row.name,
                min_price: row.min_price,
                max_price: row.max_price
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
                max_price 
            FROM drink
            WHERE
                drink_id = ?`, 
            [drinkId]);
        return {
            drink_id: row.drink_id,
            alias: row.alias,
            name: row.name,
            min_price: row.min_price,
            max_price: row.max_price
        };
    }

    async addDrink(drink) {
        const drinkId = await this.executeQuery('INSERT INTO drink(alias, name, min_price, max_price) VALUES(?, ?, ?, ?)', 
            [drink.alias, drink.name, drink.min_price, drink.max_price]);
        return drinkId;
    }

    async editDrink(drink) {
        await this.executeQuery(`
            UPDATE drink
            SET
                alias = ?,
                name = ?,
                min_price = ?,
                max_price = ?
            WHERE
                drink_id = ?`, 
            [drink.alias, drink.name, drink.min_price, drink.max_price, drink.drink_id]);
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

const drinkService = new DrinkService();
export default drinkService;
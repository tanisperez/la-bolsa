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

    async getDrinks() {
        const rows = await this.select("SELECT drink_id, alias, name, min_price, max_price FROM drink")
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
};

const drinkService = new DrinkService();
export default drinkService;
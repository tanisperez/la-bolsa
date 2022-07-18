import sqlite3 from 'sqlite3';

class DrinkService {
    constructor() {
        const SQLite3 = sqlite3.verbose();
        this.db = new SQLite3.Database('public/labolsa.db');
    }

    #select(query) {
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

    #insert(query, values) {
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
        const rows = await this.#select("SELECT drink_id, alias, name, min_price, max_price FROM drink")
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

    async addDrink(drink) {
        const drinkId = await this.#insert("INSERT INTO drink(alias, name, min_price, max_price) VALUES(?, ?, ?, ?)", 
            [drink.alias, drink.name, drink.min_price, drink.max_price]);
        return drinkId;
    }
};

const drinkService = new DrinkService();
export default drinkService;
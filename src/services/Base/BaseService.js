import sqlite3 from 'sqlite3';

class BaseService {
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
}

export default BaseService;
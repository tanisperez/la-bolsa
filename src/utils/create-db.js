const sqlite3 = require('sqlite3');

const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database('public/labolsa.db');

const query = (command, method = 'all') => {
    return new Promise((resolve, reject) => {
      db[method](command, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

console.log('Creating table drink...');
db.serialize(async () => {
    await query(`CREATE TABLE IF NOT EXISTS drink (
                    drink_id INTEGER PRIMARY KEY, 
                    alias TEXT NOT NULL, 
                    name TEXT NOT NULL, 
                    min_price NUMERIC NOT NULL, 
                    max_price NUMERIC NOT NULL,
                    crack_price NUMERIC NOT NULL
                )`, 'run');
});

console.log('Create table config...');
db.serialize(async () => {
  await query(`CREATE TABLE IF NOT EXISTS config (
                  key TEXT PRIMARY KEY, 
                  value TEXT NOT NULL
              )`, 'run');
});

console.log('Done');

db.close();
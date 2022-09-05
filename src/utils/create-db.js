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

/*
console.log('Inserting drink...');
db.serialize(async () => {
  await query(`INSERT INTO drink(alias, name, min_price, max_price)
               VALUES ('BRUG', 'Brugal', 4.00, 5.50)`, 'run');
});
console.log('Inserting drink...');
db.serialize(async () => {
    await query(`INSERT INTO drink(alias, name, min_price, max_price)
                 VALUES ('ABS', 'Absolut', 4.50, 6.00)`, 'run');
});
*/
console.log('Done');

db.close();
// for v2 team to write our own database query functions
const connection = require('./index.js');

const addDeals = (lat, lng, cb) => {
  
  const sql = `SELECT * FROM listings WHERE id=${id}`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result, fields) => err ? reject(err) : resolve(result));
  });
};

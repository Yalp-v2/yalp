// for v2 team to write our own database query functions
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yalp'
});
const dbIndex = require('./index.js'); 

const saveUserSearches = (userID, searchText, callback) => {
  console.log(this, 'THIS OUTSIDE')
  searchText.forEach(function(each){
    let queryStr = "INSERT INTO user_searches (user_id, searchString) VALUES (? , ?);"
    let params = [userID, each]
    console.log(console.log(dbIndex))
    dbIndex.connection.query(queryStr, params, (error, results) => {
  	  if(error){
  	  	throw error
  	  } else {
        console.log('User Search Category Saved - v2-index')
        callback(null, results)
  	  }
    })
  }.bind(this))
}

// const addDeals = () => {
//   const sql = ``;
//   return new Promise((resolve, reject) => {
//     connection.query(sql, (err, result, fields) => err ? reject(err) : resolve(result));
//   }).then(results => callback(results));
// };

const getNearbyDeals = (lat, lng) => {
  // every degree lat and lng is approx. 69 miles
  let minLat = JSON.stringify(Number(lat) - (1 / 69));
  let maxLat = JSON.stringify(Number(lat) + (1 / 69))
  let sql = `select * from deals where merchant_lat BETWEEN ${minLat} and ${maxLat}`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result, fields) => err ? reject(err) : resolve(result));
  });
}

const getMerchantHasDeal = (lat, lng, merchantName, callback) => {
  lat = JSON.stringify(Number(lat).toFixed(4) + '%');
  lng = JSON.stringify(Number(lng).toFixed(4) + '%');
  let sql = `SELECT * from deals WHERE merchant_lat LIKE ${lat} AND merchant_lng LIKE ${lng}`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result, fields) => err ? callback(err, null) : callback(null, result));
  })
}

module.exports = {
  getNearbyDeals,
  getMerchantHasDeal,
  saveUserSearches
}
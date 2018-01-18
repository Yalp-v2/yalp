const axios = require('axios');
const googleAPI = `https://maps.googleapis.com/maps/api/place/`;
const GOOGLE_API_KEY = 'AIzaSyAyGUK-2jzstlnMvbJPWWElabgp3wGUPXM';
const db = require('../../database/index.js')
let location = `location=37.7749,-122.4194`;

const getBusinessInfo = (businessRef, cb) => {
  axios.get(`${googleAPI}details/json?reference=${businessRef}&key=${GOOGLE_API_KEY}`)
    .then(response => cb(response))
    .catch(error => console.log('error:', error))
}

const searchBusinesses = (query, userID, cb) => {
  db.getLocation(userID, (err, results) => {
    if(err){
      throw err
    } else {
      location = `location=${results[0].location}`
      console.log(location)
      axios.get(`${googleAPI}textsearch/json?query=${query}&${location}&key=${GOOGLE_API_KEY}`)
        .then(response => cb(response))
        .catch(error => console.log('error:', error))
    }
  })
}

const getPhotos = (ref, cb) => {
  return `${googleAPI}photo?maxwidth=175&photoreference=${ref}&key=${GOOGLE_API_KEY}`
}

module.exports = {
  getBusinessInfo,
  searchBusinesses,
  getPhotos
}

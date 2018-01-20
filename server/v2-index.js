// for v2 team to write their own routes below
const express = require('express');
const router = express.Router();
const v2Helpers = require('../client/helper/v2-helpers.js');
const db = require('./../database/v2-index.js')


router.get('*/server/merchantdeal', (req, res) => {
  let merchantName = req.query.merchantName;
  let lat = req.query.lat;
  let lng = req.query.lng;
  return new Promise((resolve, reject) => {
    db.getMerchantHasDeal(lat, lng, merchantName, (err, response) => {
      err ? reject(err) : resolve(response);   
    })
  }).then(results => {
    // should get an array of objects of deals that have similar lat lng
    // need to filter by restaurant name
    if (results.length === 0) {
      res.send('No deal!');
    } else {
      let possibleMerchantMatches = results.filter(restaurant => {
        return restaurant.merchant_name.includes(merchantName) || merchantName.includes(restaurant.merchant_name);
      });
      possibleMerchantMatches.length === 0 ? res.json('No deal!') : res.json(possibleMerchantMatches);
    }
  });
})

router.get('*/server/deal', (req, res) => {
  return new Promise((resolve, reject) => {
    v2Helpers.getRestaurantDeals('37.7836198', '-122.4089431', (err, response) => {
      err ? reject(err) : resolve(response);
    })
  }).then(response => {
    console.log(response.data.deals);
  })
})

router.get('/suggestions/:id', (req, res) => {
	v2Helpers.startSuggestions(req.params.id, (err, results) => {
		var parsedResults = JSON.parse(results.body).businesses
		res.send(parsedResults)
	})
})

module.exports = router;
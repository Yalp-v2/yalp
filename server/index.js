const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('../database/index.js');
const api = require('../client/helper/yelpHelpers.js');
const v2Index = require('./v2-index.js');
const v2Helpers = require('../client/helper/v2-helpers.js');
const dbV2 = require('../database/v2-index.js'); 

require('./passport.js')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting up passport
app.use(session({ secret: 'Keyboard Warrior', resave: true, saveUnitialized: true}));

app.use(passport.initialize());


app.use(passport.session()); //for persistent login sessions

// serve static asset...
app.use(express.static(__dirname + '/../client/dist'));
app.use('/', v2Index);

app.post('/server/login', passport.authenticate('local-login'), function (req, res){
  if (!req.isAuthenticated()) {
    res.status(400);
    res.end('Invalid User.');
  } else {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    console.log('REACHING THIS BLOCK', req.user);
    res.status(201).json(req.user);
  }
}
);

app.post('/server/signup', passport.authenticate('local-signup'),
function (req, res) {
  res.status(201).json({message:"Success", username: req.user.username});
}
// , (err, results) => {
//     if (err) {
//       ///These logs are needed temporarily for heroku testing & logging
//       console.log('REACHED ERROR CALLBACK FOR POST USER');
//       res.status(400);
//       res.end('Failed to Create User.');
//     } else {
//       ///These logs are needed temporarily for heroku testing & logging
//       console.log('REACHED SUCCESS CALLBACK FOR POST USER');
//       res.status(201).json(results);
//     }
// }
)

// when user search
app.get('/server/search/:query', (req, res) => {
  api.searchBusinesses(req.params.query, req.url.split('=')[1], results => {
    if(results.data.results.length > 0) {
      v2Helpers.saveUserSearches(req.url.split('=')[1], req.params.query, (error, results) => {
        //Viktor callback to v2Helpers to start save process of users searched categories. 
        let userCategory = []
        JSON.parse(results.body).businesses[0].categories.forEach(function(each){
          userCategory.push(each.alias)
          //Viktor , take userCategory and add to user search database
          db.saveUserSearches(req.url.split('=')[1], userCategory, (error, results) => {
            if(error){
              throw error;
            } else {
              console.log('user search successfully saved - index.js /server/search')
            }
          })
        })
      })
    }

    res.status(201).json(results.data.results);
  })
  // use below for test
  // db.tempSearch(req.body, (err, results) => {
  //   if (err) {
  //     res.status(400);
  //     res.end('Failed to Search.');
  //   } else {
  //     //using fake data object mirroring API
  //     res.status(201).json(api.fakeData);
  //   }
  // })
});

// when user clicks on a business
app.get('/server/business/:reference', (req, res) => {
  let businessRef = req.params.reference;
  api.getBusinessInfo(businessRef, resp => {
    res.json(resp.data.result)
  })
});

app.get('/server/business/photos/:photoRef', (req, res) => {
  let photoRef = req.params.photoRef;
  let photos = api.getPhotos(photoRef);
  res.status(201).json(photos)
  // res.status(200).json('ok');
});

// get all friend checkins for a particular business
app.get('/server/business/checkins', (req, res) => {
  db.getFriendsCheckins1(req.query.userId, req.query.businessId, (err, results1) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve checkins')
    } else {
      db.getFriendsCheckins2(req.query.userId, req.query.businessId, (err, results2) => {
        if (err) {
          res.status(400);
          res.end('Unable to retreive checkins')
        } else {
          console.log('checkins results:', results1, results2)
        }
      })
    }
  })
})

// when user clicks on checkin button on business page
app.post('/server/profile/checkins', (req, res) => {
  let userId = req.body.userId;
  let businessId = req.body.business.id;
  let businessName = req.body.business.name;
  db.addCheckIn(userId, businessId, businessName, resp => {
    res.status(201).json(resp);
  })
})
//when user submits a review for a business
app.post('/review', (req, res) => {
  let review = {
    rating: req.body.rating,
    text: req.body.text
  }
  db.addNewReview(req.body.userID, req.body.businessID, review, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to submit new review');
    } else {
      res.status(201).json(results);
    }
  })
});

//when business page reviews render
app.get('/server/reviews/friends', (req, res) => {
  db.getFriendsReviews(req.query.userId, req.query.businessId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve friend reviews');
    } else {
      res.status(201).json(results);
    }
  })
})

//when business page reviews render
app.get('/server/reviews/others', (req, res) => {
  db.getStrangersReviews(req.query.userId, req.query.businessId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve others reviews');
    } else {
      res.status(201).json(results);
    }
  })
})

// when user clicks add review author as friend on business page
app.get('/server/addfriend', (req, res) => {
  db.addFriend(req.query.userId, req.query.friendId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to add friend');
    } else {
      res.status(201).json(results);
    }
  })
})

app.get('/server/checkfriend', (req, res) => {
  db.friendChecker(req.query.userId, req.query.friendId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to add friend');
    } else {
      res.status(201).json(results);
    }
  })
})

app.get('/server/user/:id', (req, res) => {
  db.getUsernameById(req.params.id, (err, results) => {
    if (err) {
      res.send(400)
      res.end('Unable to retrieve username from id')
    } else {
      res.status(201).json(results)
    }
  })
})

// when user clicks on his/her profile
app.get('/profiles/:id', (req, res) => {
  res.status(200).json('ok');
});

app.get('/server/profile/checkins', (req, res) => {
  let userId = req.body.userId;
  let business = req.body.business.id;
  db.checkCheckIn(userId, businessId, resp => {
    console.log(resp);
    res.status(201).json(resp)

  })

})

app.post('/profile/favorites', (req, res) => {
  const { userId, businessId, businessName } = req.body;
  console.log(userId, businessId);
  db.addFavorite(userId, businessId, businessName, (err, result) => {
    res.status(201).json(result);
  })
})

app.get('/profile/favorites/:userId', (req, res) => {
  console.log(req.params);
  const { userId } = req.params;
  db.getFavorite(parseInt(userId), (err, result) => {
      res.status(200).json(result);
  });
});

app.get('/user/friends/:id', (req, res) => {
  db.getFriends(parseInt(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/checkins/:id', (req, res) => {
  db.getCheckins(parseInt(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/reviews/:id', (req, res) => {
  db.getReviews(parseInt(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/favorites/:id', (req, res) => {
  db.getFavorites(parseInt(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

//Saves users most recent location for suggestion purposes
app.post('/userLocation/:id', (req, res) => {
  db.saveLocation(req.params.id, req.body.location, (err, results) => {
    if(err){
      throw err
    } else {
      //console.log(results)
      //res.statusCode(200)
    }
  })
})

app.get('/userLocation/:id'), (req, res) => {
  db.getLocation(req.body.userID, (err, results) => {
    if(err){
      throw err
    } else {
      res.json(results)
    }
  })
}

const server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;
  console.log('Listening at port %s', port);
});

module.exports = server;

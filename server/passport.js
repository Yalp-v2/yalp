const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const db = require('../database/index.js').connection;

module.exports = function(passport) {

  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( (id, done) => {
    db.query("SELECT * FROM users WHERE id = ? ", [id], function (err, rows) {
      done(err, rows[0]);
    })
  });

  passport.use(
    'local-signup',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      function(req, username, password, done) {
        db.query("SELECT * FROM users WHERE email = ?", [username], function(err, rows) {
          if (err) {
            return done(err, null)
          }
          if (rows.length) {
            return done(null, false);
            // return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          } else {

            var newUser = {
              username: req.body.username,
              password: bcrypt.hashSync(password, null, null),
              email: req.body.email,
              name: req.body.name
            };

            var insertQuery = "INSERT INTO users (username, password, email, name) values (?,?,?,?)";

            db.query(insertQuery, [newUser.username, newUser.password, newUser.email, newUser.name], function(err, rows) {
              console.log('ROWS PROPERTY', rows);
              console.log('ERR ARGUMENT', err);

              // there's no callback being sent in as typical
              if(err){
                return done(err, null);
              } else {
                newUser.id = rows.insertId;
                // return done(null, newUser);
                return done(null, newUser);

              }

            });
          }
        });
      }
    )
  )
  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      function(req, username, password, done) {
        db.query("SELECT * FROM users WHERE email = ?", [username], function(err, rows) {
          if (err) {
            return done(err);
          }
          if (!rows.length) {
            return done(null, false);
            // return done(null, false),
            // req.flash('loginMessage', 'No user found.'));
          }

          if (!bcrypt.compareSync(password, rows[0].password)) {
            return done(null, false);
            // return done(null, false,
            // req.flash('loginMessage', 'Oops! Wrong password.'));
          }
          return done(null, rows[0]);
        })
      }
    )
  )
}






//
// module.exports.passport = function(passport, user) {
//   var User = user;
//   var LocalStrategy = require('passport-local').Strategy;
// }
//
//
//
// passport.use('local-signup', new LocalStrategy(
//
//   {
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
//   },
//
//   function (req, email, password, done) {
//     var generateHash = function(password) {
//       return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
//     };
//    }
//
// ));

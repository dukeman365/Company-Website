//auth/auth.js
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../../database/models/user');

//Create passport middleware to handle registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.create({
      email,
      password
    });
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

//Middleware to handle user login
passport.use('login', new localStrategy({
  usernameField:'email',
  passwordField:'password'
}))

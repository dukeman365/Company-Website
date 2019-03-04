//auth/auth.js
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../../database/models/user');
const database = require('../../database/Database');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Database Connection

//==user registration==
passport.use('signup', new(localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    //Save information
    const user = await UserModel.create({
      email,
      password
    });
    //send user to the next middleware
    return done(null, user);
  } catch (error) {
    done(error);
  }
})));

//==user login==
passport.use('login', new(localStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, async (email, password, done) => {
      try {
        //Find the user associated with the email
        const user = await UserModel.findOne({
          email
        });
        //if the user isn't found, return message
        if (!user) {
          return done(null, false, {
            message: "User not found"
          });
        }
        //validate password
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, {
            message: 'Wrong Password'
          });
        }
        //send user information to next middleware
        return done(null, user, {
          message: 'Logged in Successfully'
        });
      } catch (error) {
        return done(error);
      }
    })));
    //==end user login==
    //==end user registration==

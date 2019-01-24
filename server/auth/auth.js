//auth/auth.js
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../../database/models/user');
const database = require('../../database/Database');
const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
//Database Connection

//==Serialize user==
passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser((id, done) => {
db.collection('')
})
//==End Serialize user==

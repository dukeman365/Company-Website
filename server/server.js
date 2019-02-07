//server.js

//Setup
//==============================
var express = require('express');
var app = express();
require('dotenv').config();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser')
var api = require('./api/API');
var index = require('./website/Index.js')
var path = require('path')
//==Auth==
//Require Passport
const passport = require('passport')
//Require Express Session
const session=require('express-session')
//==End Auth==


//serve static assets
app.use(express.static(path.join(__dirname, '/Public')));

//Allow Input from URL requests
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())



//Database connection
var Database = require('../database/Database')
Database.connectToServer(function(err) {
  if (err)
    console.log(err);

});
//End Database Connnection
//==Authorization==
/*app.use(session({
  secret: process.env["SESSION__SECRET"],
  resave: true,
  saveUninitialized: true,
}))*/
app.use(passport.initialize())
//==End Authorization==
//View Engine
var hbs = require('express-handlebars');
app.set('views', path.join(__dirname, '../views'))
app.set('database', path.join(__dirname, '../database'))
//set view engine
app.engine('handlebars', hbs({
  defaultLayout: 'main', //set default layout
  layoutsDir: "views/layouts", //set layout directory
  partialsDir: "views/partials" //set partials directory
}));
//end prepare view engine
//Second view Engine
const pug = require('pug')
//End second view engine
app.set('view engine', 'handlebars'); //set view engine
//End View Engine

//End Setup
//===============================

//Routes
//===============================
router.get('/', function(req, res) {
  res.render('landing', {
    layout: 'landingLayout'
  });
})

//Set the port
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Server running on port: " + port)

//Register Routes
app.use('/api', api)
app.use('/index', index)
app.use('/', router);

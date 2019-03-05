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
var Database = require('./database/Database.js')//get the database
app.set('views', path.join(__dirname, 'views'));//set views to views directory
app.set('database', path.join(__dirname, '../database'))//sets "database" to database directory

//use body parser
app.use(bodyParser.json())
//serve static assets
app.use(express.static(path.join(__dirname, '/Public')));
//Allow Input from URL requests
app.use(bodyParser.urlencoded({
  extended: true
}))
//Database connection
Database.connectToServer(function(err) {
  if (err)
    console.log(err);
});
//End Database Connnection

//View Engine
var hbs = require('express-handlebars');

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
//Landing page
router.get('/', function(req, res) {
  res.render('landing', {
    layout: 'landingLayout'
  });
})
//End Landing pages
//Set the port
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Server running on port: " + port)

//Register Routes
app.use('/api', api)//API Route
app.use('/index', index)//Website Router
app.use('/', router);

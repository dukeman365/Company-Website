//server.js

//Setup
//==============================
var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser')
var api = require('./api/API');
var index = require('./website/Index.js')

var hbs = require('express-handlebars');
var path = require('path')

//Database connection
var Database = require('../database/Database')

Database.connectToServer(function(err) {
  if (!err) {
    console.log("Database Connected")


  } else {
    console.log(err)
  }


});
//set view engine
app.engine('handlebars', hbs({
  defaultLayout: 'main',
  layoutsDir: "views/layouts",
  partialsDir: "views/partials"
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'))

//Allow Input from URL requests
router.use(bodyParser.urlencoded({
  extended: true
}))

router.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/Public')));




//===============================
router.get('/', function(req, res) {
  res.render('landing', {
    layout: 'landingLayout'
  });
})

//Set the port
app.listen(port);
console.log("Server running on port: " + port)

//Register Routes
app.use('/api', api)
app.use('/index', index)
app.use('/', router);

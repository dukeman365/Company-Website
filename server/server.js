//server.js

//Setup
//==============================
var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser')
var api = require('./API/API');
var index = require('./website/Index.js')
var hbs = require('express-handlebars');
var path = require('path')


//set view engine
app.engine('handlebars', hbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Allow Input from URL requests
router.use(bodyParser.urlencoded({
  extended: true
}))

router.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/Public')));


//Database connection
var Database = require('../Database/Database')

Database.connectToServer(function(err) {
  if (!err) {
    console.log("Database Connected")


  } else {
    console.log(err)
  }


});
//===============================


//Set the port
app.listen(port);
console.log("Server running on port: " + port)

//Register Routes
app.use('/api', api)
app.use('/index', index)
app.use('/', router);

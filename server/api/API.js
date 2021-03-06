//server.js

//Setup
//==============================

//==Setup==
var express = require('express');
var router = express.Router();
//==Finish Setup==

//==Require Routes==
var post = require('./routes/protected/post')
var services = require('./routes/protected/services')
//==End Require Routes==
router.use(function(req, res, next) {
  console.log('API Accessed')
  next()
})





//Routes
//==============================
router.get('/', function(req, res) {
  res.json({
    message: 'Welcome to the API'
  });
})

//Link To Other Routes
router.use('/post', post)
router.use('/services', services)



module.exports = router;

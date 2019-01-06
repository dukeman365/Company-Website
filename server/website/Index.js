var express = require('express');
var app = express();
var router = express.Router();



  router.get('/',function(req, res) {
    res.render('home',{layout:'homeLayout'});
  })
  router.get('/about',function(req, res) {
    res.render('../views/about',{layout:'aboutLayout'});
  })
  router.get('/contact',function(req, res) {
    res.render('../views/contact',{layout:'contactLayout'});
  })



module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path')

//import model
var Service = require('../../../../database/models/service');



//Routes for blog posts
router.route('/')
  .post(function(req, res) {
    const service = new Service();
  })
//import models
var Post = require('../../../../database/models/services');

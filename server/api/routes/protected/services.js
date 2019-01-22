var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path')

//import model
var Service = require('../../../../database/models/service');

//import route
var service_id=require('./service_id');


//Routes for blog posts
router.route('/')

  //Route for services
  .post(function(req, res) {
    const service = new Service();
    console.log('test')
    //==Set service data==
    service.name = req.query.name;
    service.description = req.query.description;
    service.price = req.query.price;
    //==End set service data==
    service.save(function(err) {
      if (err) {
        console.log(err);
      }

      res.json({
        message: 'Service Added'
      })
    })
  })

  .get(function(req, res) {
    //Find all posts
    Service.find({id:req.query._id},function(err, services) {
      if (err)
        res.send(err);

      res.json(services);
    })
  })

router.use('/', service_id);
module.exports = router;

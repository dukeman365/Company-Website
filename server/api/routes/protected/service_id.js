//Setup
//==============================
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//import models
var Service = require('../../../../database/models/service');

//==Service Id Route
router.route('/:service_id')

  //==Get a single service by ID==
  .get(function(req, res) {
    Service.findById(req.params.service_id, function(err, service) {
      if (err)
        res.send(err);

      res.json(service);
    })
  })
  //==End get a single service by ID==

  //==Update Services Data==
  .put(function(req, res) {
    Service.findById(req.params.service_id, function(err, service) {
      if (err)
        res.send(err);

      if (req.body.name != null) {
        service.name = req.body.name;
      }
      if (req.body.description != null) {
        service.description = req.body.description;
      }
      if (req.body.price != null) {
        service.price = req.body.price;
      }

      service.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Service Updated'
        });
      })
    })
  })

  //==End Update services data==

  //==Delete service==
  .delete(function(req, res) {
    Service.deleteOne({
      _id: req.params.service_id
    }, function(err) {
      if (err) {
        res.json(err)
      }
      console.log('service deleted')
    })
  })
//==End Delete service
module.exports = router;

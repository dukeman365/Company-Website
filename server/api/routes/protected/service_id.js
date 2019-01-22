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

      if (req.body.title != null) {
        service.title = req.body.title;
      }
      if (req.body.author != null) {
        service.title = req.body.title;
      }
      if (req.body.content != null) {
        service.title = req.body.title;
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

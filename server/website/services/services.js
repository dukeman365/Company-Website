const express = require('express');
const router = express.Router();
const Service = require('../../../database/models/service')

router.route('/services')
  .get(function(req, res) {
    Service.find({}).sort({
      date: -1
    }).exec(function(err, services) {
      if (err)
        res.send(err);

      //Set context
      var context = {
        layout: 'servicesLayout',
        services: services
      }
      //End Set conntext

      res.render('../views/services', context) //render page
    })
  })

module.exports = router;

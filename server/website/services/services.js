const express = require('express');
const router = express.Router();

router.route('/services')
  .get(function(req, res) {
    res.render('services', {
      layout: 'servicesLayout'
    });
  })

module.exports = router;

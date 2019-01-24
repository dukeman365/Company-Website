const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
host:'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});


router.route('/contact')

  .get(function(req, res) {
    res.render('../views/contact', { //context
        layout: 'contactLayout'
      } //End context
    );
  })

  .post(function(req, res) {

    var mailOptions = {
      from: req.body.email,
      to: process.env.GMAIL_USER,
      subject: req.body.subject,
      text: req.body.name + " (" + req.body.email +")" + " says: " +req.body.message
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        res.render('../views/contact', { //context
            layout: 'contactLayout'
          } //End context
        );
      }
    })
  });

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})


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
      text: req.body.message
    }
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
      console.log(error);
      } else {
      console.log('Email sent: ' + info.response)
      }
    })
  })

module.exports = router;

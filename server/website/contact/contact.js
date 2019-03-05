const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
// this may be the problem

//Transporter setup
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', //set host service
  port: 587, //set port
  secure: false, //set security settings
  auth: {
    user: process.env.GMAIL_USER, //client username
    pass: process.env.GMAIL_PASSWORD //client password
  }
});
//end transporter setup

//routes for contact
router.route('/contact')

  //get page
  .get(function(req, res) {
    //render page
    res.render('../views/contact', { //context
        layout: 'contactLayout'
      } //end context
    ); //end render page
  })
  //end get contact page

  //send email
  .post(async function(req, res) {
//set mail options
    let mailOptions = {
      from: req.body.email, //sender's Email
      to: process.env.GMAIL_USER, //client's Email
      subject: req.body.subject, //email subject
      text: req.body.name + " (" + req.body.email + ")" + " says: " + req.body.message//email text
    }
    //end set mail options

    let send = await transporter.sendMail(mailOptions, function(error, info) {
      if (error) { //handle errors
        console.log(error);
      } //end handle errors
      else {//render contact page
        res.render('../views/contact', { //context
            layout: 'contactLayout'
          } //End context
        );//end render contact pages
      }
    })//end send mail with transporter
  }); //end send email


//end routes for contact

module.exports = router;

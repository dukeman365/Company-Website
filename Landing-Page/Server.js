var express = require('express');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var bodyParser = require('body-parser');
var path = require('path');
var dotenv = require('dotenv').config()
var app = express();


app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/contact', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/contact.html'))
})

app.post('/contact', function(req, res) {
  let mailOpts, trans;
  trans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'robinsoncook@gmail.com',
      pass: 'L@ckd0wn'
    }
  });
  mailOpts = {
    from: req.body.name + '&lt;' + req.body.email + '&gt;',
    to: process.env.GMAIL_USER,
    subject: 'New message from contact form at SPDESIGN',
    text: '${req.body.name} (${req.body.email}) says:${req.body.message}'
  }
  trans.sendMail(mailOpts, function(error, response) {
    if (error) {
      res.send(error);
    } else {
      res.send('contact-success');
    }
  });
});


app.listen(process.env.PORT || 5000);

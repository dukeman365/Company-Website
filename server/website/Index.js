var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../../database/models/post')
var post_id = require('./blog/post_id')
var contact = require('./contact/contact')
var services = require('./services/services')
const pug = require('pug');
//Route for Index page
router.get('/', function(req, res) {
  Post.find({}).sort({
    date: -1
  }).exec(function(err, posts) {
    if (err)//handle errors
     console.log(err);//log error to console

    //Set context
    var context = {
      layout: 'homeLayout',
      posts: posts
    }
    //end set context
    res.render('../views/home', context)//render page
  })
})
//End route for index page

//Routes for about page
router.get('/about', function(req, res) {

  //set context for page render
  var context = {

    layout: 'aboutLayout',

    sections: [{
      title: "Our Team",
      content: "All of our team members are dedicated to providing you the best development experience."
    }, {
      title: "Our Commitment",
      content: "We're with you every step of the way. Once you're part of our Birdwell family, we'll take care of your online presence no matter how small the detail."
    }, {
      title: "Our Advantage",
      content: ["When comes to custom web pages, you wont find a better value. SP-Design uses the most up to date technology to bring your online presence to the next level."]
    }]
  }
  //End set context for page render

  res.render('../views/about', context); //render page
});
//End routes for about page

//Route for contact page
router.get('/contact', function(req, res) {
  res.render('../views/contact', { //context
      layout: 'contactLayout'
    } //End context
  );
})
//End route for contact pages

router.get('/blog', function(req, res) {
  //Find all posts
  Post.find({}).sort({
    date: -1
  }).exec(function(err, posts) {
    if (err)
      res.send(err);

    //Set context
    var context = {
      layout: 'blogLayout',
      posts: posts,
      helpers: {
        deletePost: function() {
          console.log("hello")
        }
      }

    }
    //End Set conntext

    res.render('../views/blog', context) //render page
  })
})

router.get('/blog--new', function(req, res) {
  app.set('view engine', 'pug')
  //Find all posts
  Post.find({}).sort({
    date: -1
  }).exec(function(err, posts) {
    if (err)
      res.send(err);

    res.render('pug/blog.pug', {
      posts: posts,
      deletePost: deletePost
    })
  })
})

router.get('/blog/:post_id', function(req, res) {
  Post.findById(req.params.post_id, function(err, post) {
    if (err)
      res.send(err);

    var context = {
      layout: 'postLayout',
      title: post.title,
      author: post.author,
      content: post.content,
      id: post._id
    }
    res.render('../views/post', context);
  })
})

router.use('/', services) //services pages
router.use('/', contact); //contact page
router.use('/', post_id); //post page

module.exports = router;//export routes

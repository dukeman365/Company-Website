var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../../database/models/post')
var post_id=require('./blog/post_id')
var contact=require('./contact/contact')

//Route for Index page
router.get('/', function(req, res) {
  res.render('home', {
    layout: 'homeLayout'
  });
})
//End route for index page

//Routes for about page
router.get('/about', function(req, res) {

  //set context for page render
  var context = {

    layout: 'aboutLayout',

    sections: [{
      title: "Our Team",
      content: "test content"
    }, {
      title: "Our Commitment",
      content: ""
    }, {
      title: "Our Advantage",
      content:["When comes to custom web pages, you wont find a better value. SP-Design uses the most up to date technology to bring your online presence to the next level."]
  }]}
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
      posts: posts
    }
    res.render('../views/blog', context)
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

router.use('/',contact);
router.use('/',post_id);
module.exports = router;

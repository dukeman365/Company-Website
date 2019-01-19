var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../../database/models/post')



router.get('/', function(req, res) {
  res.render('home', {
    layout: 'homeLayout'
  });
})

router.get('/about', function(req, res) {
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
      content: "When comes to custom web pages, you wont find a better value. We use the most up to date technology, whether you're looking for a simple marketing page to bring your business to an online audience, or you're trying to take your online presence to the next level."
    }]
  }


  res.render('../views/about', context);
});

router.get('/contact', function(req, res) {
  res.render('../views/contact', {
    layout: 'contactLayout'
  });
})


router.get('/blog', function(req, res) {
  //Find all posts
  Post.find({}).sort({
    date: -1
  }).exec(function(err, posts) {
    if (err)
      res.send(err);

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

module.exports = router;

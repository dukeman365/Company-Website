//routes/post.js

//Setup
//==============================
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//import models
var Post = require('../../../database/models/post');

//import Routes
var post_id = require('./post_id')

//Routes
//==============================

//Route for blog posts
router.route('/')

  //==Make New Post==
  .post(function(req, res) {

    //create new instance of post
    var post = new Post();

    //==Input post data==
    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;

    //==Get Date==
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var now = mm + '/' + dd + '/' + yyyy;
    post.date = now;
    //==End Get Date==

    //==End Input post data==

    //Save Post
    post.save(function(err) {
      if (err) {
        res.send(err);
      }

      //==Send Confirmation
      res.json({
        message: 'Post Created'
      });
      //==End Send Confirmation
    });
    //==End Save Post==
  })
  //==End make new post==

  //==get all posts==
  .get(function(req, res) {
    //Find all posts
    Post.find(function(err, posts) {
      if (err)
        res.send(err);

      res.json(posts);
    })
  })
//==End get all posts==

//==End make new post==
router.use('/', post_id)


module.exports = router;

//Setup
//==============================
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//import models
var Post = require('../../../../database/models/post');

//==Post Id Route
router.route('/:post_id')

  //==Get a single post by ID==
  .get(function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
      if (err)
        res.send(err);

      res.json(post);
    })
  })
  //==End get a single post by ID==

  //==Update Posts Data==
  .put(function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
      if (err)
        res.send(err);

      if (req.body.title != null) {
        post.title = req.body.title;
      }
      if (req.body.author != null) {
        post.title = req.body.title;
      }
      if (req.body.content != null) {
        post.title = req.body.title;
      }

      post.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Post Updated'
        });
      })
    })
  })
  //==End Update posts data==

  //==Delete post==
  .delete(function(req, res) {
    Post.deleteOne({
      _id: req.params.post_id
    }, function(err) {
      if (err) {
        res.json(err)
      }
      console.log('post deleted')
    })
  })
//==End Delete post
module.exports = router;

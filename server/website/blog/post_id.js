const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.route('/:post_id')

.get(function(req, res) {
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

module.exports=router;

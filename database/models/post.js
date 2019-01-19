//database/models/post.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var database = ('../database');
var db = database.getDb;


var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  date: Date,
  content: {
    type: String,
    required: true,
    unique: true
  }
})


//Export file
module.exports = mongoose.model('Post', PostSchema);

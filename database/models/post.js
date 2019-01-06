//database/models/post.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
  title: String,
  author: String,
  date: String,
  content:String,
})

//Export file
module.exports = mongoose.model('Post', PostSchema);

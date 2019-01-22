var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  name: String,
  description: String,
  price: String,
  time: String
})

module.exports=mongoose.model('Service', ServiceSchema);

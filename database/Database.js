//Database.js

//Setup
//==========================
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var mongoose=require('mongoose');
var url = "mongodb://server:passw0rd@ds037977.mlab.com:37977/sp-design";
var _db;

//Connect To Server Function
connectToServer = (callback) => {
  mongoose.connect(url,{useNewUrlParser: true}, function(err, db) {
    _db = db;
    return callback(err);
  })
}


//Get DB function
//======================================
getDb = () => {
  console.log('db connection successful')
  return _db;
}

//Export Function
//======================================
module.exports = {
  connectToServer: connectToServer,
  getDb: getDb
};

//Database.js

//Setup
//==========================
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/mydb";
var _db;

//Connect To Server Function
connectToServer = (callback) => {
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
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

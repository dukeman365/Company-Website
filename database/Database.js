//Database.js

//Setup
//==========================
var mongo = require('mongodb');
var mongoose=require('mongoose');
var url = "mongodb://server:passw0rd@ds037977.mlab.com:37977/sp-design";
var _db;

//Connect To Server Function
connectToServer = (callback) => {
  mongoose.connect(url,{useNewUrlParser: true}, function(err, db) {
    _db = db;
    console.log('db connected to server')
    console.log(process.env.GMAIL_PASSWORD);
    return callback(err);
  })
}


//Get DB function
//======================================
getDb = () => {
  console.log('auth connection successful')
  return _db;
}

//Export Function
//======================================
module.exports = {
  connectToServer: connectToServer,
  getDb: getDb
};

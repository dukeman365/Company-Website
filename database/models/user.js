//user/user.js

var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {

    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})


UserSchema.pre('save', async function(next) {
  const user = this;

  const has = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

module.exports = mongoose.model('user', UserSchema)

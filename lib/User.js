(function() {
  var User, UserSchema, mongolab_url, mongoose;

  mongoose = require('mongoose');

  mongolab_url = process.env.MONGOLAB_URL;

  mongoose.connect(mongolab_url);

  UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    address: String,
    zipcode: Number,
    lists: Array
  }, {
    collection: 'user'
  });

  User = mongoose.model('user', UserSchema);

  module.exports = User;

}).call(this);

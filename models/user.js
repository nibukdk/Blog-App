  var mongoose = require("mongoose"),
    Blog= require("./post.js"),
    passportLocalMongoose = require("passport-local-mongoose");


  var userSchema = mongoose.Schema({
    username: String,
    password: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }]
  });
  userSchema.plugin(passportLocalMongoose);


  var User = mongoose.model('User', userSchema);

  module.exports = User;

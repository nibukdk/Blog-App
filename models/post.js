  var mongoose = require("mongoose"),
      User= require("./user.js"),
    passportLocalMongoose = require("passport-local-mongoose");


  //Creating BlogSchema
var blogSchema = mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  },
  created_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

 blogSchema.plugin(passportLocalMongoose);

var Blog = mongoose.model('Blog', blogSchema);


  module.exports = Blog;

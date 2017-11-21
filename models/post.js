  var mongoose = require("mongoose"),

    passportLocalMongoose = require("passport-local-mongoose");


  //Creating BlogSchema
var blogSchema = mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});

 blogSchema.plugin(passportLocalMongoose);

var Blog = mongoose.model('Blog', blogSchema);
 

 

  module.exports = Blog;
  
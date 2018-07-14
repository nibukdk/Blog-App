let mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");


//Creating BlogSchema
let projectSchema =mongoose.Schema({
  title: String,
  programmingLanguage:String,
  description: String,
  Features : String
});



projectSchema.plugin(passportLocalMongoose);

let Project = mongoose.model('Project', projectSchema);




module.exports = Project;

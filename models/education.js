let mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");


//Creating BlogSchema

let educationSchema = mongoose.Schema({
  school:String,
  graduation: Date,
  degree: String,

});




educationSchema.plugin(passportLocalMongoose);

let Education = mongoose.model('Education', educationSchema);




module.exports = Education;

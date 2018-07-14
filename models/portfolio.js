let mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Education = require("./education"),
    Project = require("./project");

//Creating BlogSchema
let portfolioSchema = mongoose.Schema({
name: String,
image: String,
projects:{
  type: mongoose.Schema.ObjectId,
  ref: 'Project'
},
education :{
type: mongoose.Schema.ObjectId,
ref: 'Education'
},
});




portfolioSchema.plugin(passportLocalMongoose);


let Portfolio = mongoose.model('Portifolio', portfolioSchema);
module.exports = Portfolio;

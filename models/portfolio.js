let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");



let portfolioSchema = mongoose.Schema({
    name:String,
    introduction : String,

  
});



portfolioSchema.plugin(passportLocalMongoose);

let Portfolio = mongoose.model("Portfolio", portfolioSchema);



module.exports = Portfolio;

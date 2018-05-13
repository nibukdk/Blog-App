let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");


let projectSchema = mongoose.Schema({
    title : String,
    description: String,
    language : String,
    feature: String,
    author : String,
    created: {
      type: Date,
      default: Date.now
    }
});




projectSchema.plugin(passportLocalMongoose);

let Project = mongoose.model("Project", projectSchema);


module.exports = Project;

let express = require("express"),
  router = express.Router(),
  methodOverride = require("method-override"),
  Portfolio = require("../models/portfolio.js"),
  Project = require("../models/projects.js");


router.get("/about", function(req, res) {
  //res.send("This is portfolio site");
  Portfolio.findOne({
    name: "Nibesh Khadka"
  }, function(err, response) {
    if (err) {
      res.redirect("back")
    } else {
      //  console.log(response.introduction);
      Project.find({}, function(err, result){
        if(err){
          redirect("back");
        }
        else {
          res.render("portfolio", {res: response, project: result});
        }
      });

    }
  });


});

router.get("/about/update", function(req, res) {
  Portfolio.findOne({
    name: "Nibesh Khadka"
  }, function(err, response) {
    if (err) {
      res.redirect("back")
    } else {
      console.log(response.projects);
      res.render("update-portfolio", {res: response});
    }
  });

});




module.exports = router;
/*  Portfolio.create({
    name:"Nibesh Khadka",
    introduction: "My name is Nibesh Khadka",
    education : "Bachelors of Engineering",
    projects:[
    {
    title: "Blog-App",
    description :"This is Blog-App",
    language: "NodeJs, Express and MongoDb",
    feature : "This is Portfolio + Blog App. Soon, it will have PWA feature with machine learning search engine optimizatio features",
    author : "Nibesh Khadka"
  }
  ]
    contact : "nibeshkhadka@gmail.com"

});
Project.create({
  title: "Blog-App",
  description: "This is Blog-App",
  language: "NodeJs, Express and MongoDb",
  feature: "This is Portfolio + Blog App. Soon, it will have PWA feature with machine learning search engine optimizatio features",
  author: "Nibesh Khadka"

}, function(err, result) {
  Portfolio.findByIdAndUpdate({
    _id: "5af7949f6b13154e6f2041f3"
  }, function(err, portfolio) {
    if (err) {
      //redirect("back");
      console.log(err)
    } else {
      portfolio.projects.push(result);
      portfolio.save(function(err, result) {
        if (err) {

          console.log(err);
        } else {}
      })
    }
  })
});
  */

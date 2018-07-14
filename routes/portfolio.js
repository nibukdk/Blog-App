var express = require('express'),
    router =     router = express.Router(),
    Blog = require("../models/post.js");


    router.use(function(req,res,next){
      res.locals.user= req.user;
      next();
    });
    //Prevent back button after logout
    router.use(function (req, res, next) {
         res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
         res.header('Expires', '-1');
         res.header('Pragma', 'no-cache');
         next()
     });



router.get("/portfolio", function(req,res){
  res.render("portfolio");
});


module.exports= router;

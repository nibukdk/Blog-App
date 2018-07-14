var express = require('express'),
    router = express.Router(),
    User = require("../models/user.js"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

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

    //Registration route
    router.get('/register', function(req, res) {
      let currentUser= req.user;
      res.render('register');
    });


    router.post('/register', function(req, res) {
      let currentUser= req.user;
      let username = req.body.username,
        password = req.body.password;

    let newUser = new User({ username: req.body.username});
      User.register( newUser,password, function(err, newUser) {
        if (err) {
          console.log(err);
          return res.render('register');
        }

        passport.authenticate('local')(req, res, function() {
           res.redirect('/',{currentUser: currentUser});
         });
      });

    });

    //Login Route
    router.get('/login', function(req, res) {
      let currentUser= req.user;
      res.render('login',{currentUser: currentUser});
    });

    //LOgin middleware
    var loginMiddleware = passport.authenticate("local", {

      successRedirect: '/blogs',
      failureRedirect: '/login'
    });

    router.post('/login', loginMiddleware, function(req, res) {

    });

    router.get("/logout", function(req, res){

      req.logout();
      res.redirect("/");
    });


    function isLoggedInMiddleWare(req, res, next){
      if(req.isAuthenticated()){
        return next();
      }

        res.redirect("/login");

    }


    module.exports = router;

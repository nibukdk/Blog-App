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

    router.get('/', function(req, res) {
      let currentUser= req.user;
      res.render('index',{currentUser: currentUser});

    });
  //**********Create new Blogs*********///
  //Load blogs
  router.get('/blogs', function(req, res) {
    let currentUser = req.user;
    Blog.find({}, function(err, blogs) {
      if (err) {
        res.send(err);
      }
      else {
        res.render('index', { blogs: blogs, currentUser : currentUser });
      }
    });

  });


    router.get('/blogs/new',isLoggedInMiddleWare, function(req, res) {
      let currentUser= req.user;
      res.render('new', {currentUser: currentUser});
    });
    router.post('/blogs', function(req, res) {
      let currentUser= req.user;
      var title = req.body.blog.title,
        image = req.body.blog.image,
        body = req.body.blog.body;
      console.log(req.body);
      Blog.create({
        title: title,
        image: image,
        body: body

      }, function(err, data) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        else {
          res.redirect('/blogs');
        }
      });

    });

    // Read Post
    router.get('/blogs/:id', function(req, res) {
      let currentUser= req.user;
      Blog.findById(req.params.id, function(err, result) {
        if (err) {
          res.redirect('/blogs');
        }
        else {
          res.render('show', { result: result, currentUser: currentUser});
        }
      });

    });

    //Update Blogs Post
    router.get('/blogs/:id/update',isLoggedInMiddleWare, function(req, res) {
      let currentUser= req.user;
      Blog.findById(req.params.id, function(err, result) {
        if (err) {
          res.redirect('/blogs');
        }
        else {
          res.render('edit', { result: result , currentUser: currentUser});
        }
      });

    });
    //Update Edited Post
    router.put('/blogs/:id',isLoggedInMiddleWare, function(req, res) {
      let currentUser= req.user;
      var data = req.body.blog;
      Blog.findByIdAndUpdate(req.params.id, data, function(err, updateBlog) {
        if (err) {
          res.redirect('/blogs');
        }
        else {
          res.redirect('/blogs/' + req.params.id);
        }

      });
    });


    //Delete Post
    router.delete('/blogs/:id', function(req, res) {
      let currentUser= req.user;
      Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
          res.redirect('/blogs/' + req.params.id);
        }
        else {
          res.redirect('/blogs');
        }

      });
    });



    function isLoggedInMiddleWare(req, res, next){
      if(req.isAuthenticated()){
        return next();
      }

        res.redirect("/login");
    }

module.exports = router;

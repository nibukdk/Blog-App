var express = require('express'),
    router =     router = express.Router();



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




    module.exports = router;

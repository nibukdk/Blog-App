var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  //passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user"),
  Blog = require("./models/post"),
  app = express();

mongoose.connect('mongodb://localhost/blog-app', { useMongoClient: true });
mongoose.Promise = global.Promise;



//Setting up the engine to use ejs and look up for views folder

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extented: true }));
app.use(express.static(__dirname + '/public/stylesheets/'));
app.use(methodOverride('_method'));

//use passport and set session
app.use(require("express-session")({
  secret: 'Login is necessary',
  resave: false,
  saveUninitialized: false
}));




app.use(passport.initialize());
app.use(passport.session());

//Use of local authentication 
passport.use(new LocalStrategy(User.authenticate()));

//Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//checking connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});






//For home page

app.get('/', function(req, res) {
  res.redirect('/blogs');
});
//Load blogs
app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      res.send(err);
    }
    else {
      res.render('index', { blogs: blogs });
    }
  });

});
//Restfull Routes for creating Blogs-Post
//**********Create new Blogs*********///
app.get('/blogs/new', function(req, res) {
  res.render('new');
});
app.post('/blogs', function(req, res) {
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
app.get('/blogs/:id', function(req, res) {
  Blog.findById(req.params.id, function(err, result) {
    if (err) {
      res.redirect('/blogs');
    }
    else {
      res.render('show', { result: result });
    }
  });

});

//Update Blogs Post
app.get('/blogs/:id/update', function(req, res) {
  Blog.findById(req.params.id, function(err, result) {
    if (err) {
      res.redirect('/blogs');
    }
    else {
      res.render('edit', { result: result });
    }
  });

});
//Update Edited Post
app.put('/blogs/:id', function(req, res) {
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
app.delete('/blogs/:id', function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/blogs/' + req.params.id);
    }
    else {
      res.redirect('/blogs');
    }

  });
});

//XXXXXXXXXXXXX-- End of Creation of Blog -----XXXXXXXXXX///


//******User Authentication Route********/////  



//Registration route
app.get('/register', function(req, res) {
  res.render('register');
});


app.post('/register', function(req, res) {
  var username = req.body.user.username,
    password = req.body.user.password;

  User.register(new User({ username: username }), password, function(err, result) {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });

  });

});

//Login Route
app.get('/login', function(req, res) {
  res.render('login');
});

//LOgin middleware
var loginMiddlware = passport.authenticate("local", {
  successRedirect: '/blogs',
  failureRedirect: '/login'
});

app.post('/login', loginMiddlware, function(req, res) {

});



//Listen to server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Server is good and running.');
});

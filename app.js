var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  Blog = require("./models/post"),
  Portfolio = require("./models/portfolio"),
  Education = require("./models/education"),
  Project = require("./models/project"),
  blogRoute = require("./routes/blogs.js");
userRoute = require("./routes/users.js");
commentRoute = require("./routes/comments.js"),
  portfolioRoute = require("./routes/portfolio.js");


app = express();

mongoose.connect('mongodb://localhost/blog-app', {
  useNewUrlParser: true
});
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;
//Setting up the engine to use ejs and look up for views folder

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({
  extented: true
}));
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

//Get current user
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
//Use of local authentication
passport.use(new LocalStrategy(User.authenticate()));

//Prevent back button after logout
app.use(function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});



//Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//checking connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});




app.get('/', function(req, res) {
  let currentUser = req.user;
  res.render('portfolio', {
    currentUser: currentUser
  });

});


//Use ROutes
app.use(blogRoute);
app.use(userRoute);
app.use(commentRoute);
app.use(portfolioRoute)




//Listen to server
app.listen(8080, function() {
  console.log('Server is good and running.');
});

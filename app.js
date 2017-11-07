var express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  mongoose= require("mongoose");
  
  mongoose.connect('mongodb://localhost/blog-app');
  
  //router= express.Router();


app.use(bodyParser.urlencoded({extented:true}));
app.use(express.static(__dirname +'/public/stylesheets/'));

//Setting up the engine to use ejs and look up for views folder
app.set('view engine','ejs');
app.set('views','./views');

//Create new mongoose Schema


//checking connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('connected');
});

var blogSchema= mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var Blog= mongoose.model('Blog', blogSchema);


Blog.create({
  title: 'New Blog',
  image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIaSbiFogqApvRQbwmq0BnY5sPlp6vLfIhZ5vPDTOY-4t89T01Vg',
  body:'German Shepard are really awesome dogs'
})

//For home page

app.get('/',function(req, res){
  res.redirect('/blogs');
});
//Load blogs
app.get('/blogs',function(req,res){
  Blog.find({},function(err, blogs){
    if(err){
      res.send(err);
    }
    else{
      res.render('index',{blogs: blogs})
    }
  });
  
});

//Create new Blogs
app.get('/blogs/new', function(req, res){
    res.render('new');
});
/*
//Registration route
app.get('/register',function(req,res){
 res.render('register'); 
});

app.post('/register',function(req,res){
    res.send('Registered');
});

//Login Route
app.get('/login',function(req,res){
 res.render('login'); 
});

app.post('/login',function(req,res){
    res.send('Submitted');
    console.log(req.body);
});
*/


//Listen to server
 app.listen(process.env.PORT, process.env.IP, function(){
        console.log('Server is good and running.');
    });
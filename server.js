// ref: https://medium.freecodecamp.org/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const mongoose = require("mongoose");
const express = require("express");
const hbs  = require('express-handlebars');
const index = require('./routes/index');
const images = require('./routes/api/images');
const users = require('./routes/api/users');
const usersSSR = require('./routes/users');
const projectsSSR = require('./routes/projects');
const projects = require('./routes/api/projects');
const bodyParser = require('body-parser');
const config = require('config');
const methodOverride = require('method-override');
const path = require('path');
const app = express();


//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.set( 'view engine', 'hbs' );

app.use(express.static(__dirname + '/public'));

//Method Override
app.use(methodOverride('_method'));

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );

//Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

// route middleware that will happen on every request
app.use(function(req, res, next) {
  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next();
});

const favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname,'public','img','favicon.jpg')));

// apply the routes to our application
app.use('/', index);

app.use('/users', usersSSR);

app.use('/projects', projectsSSR);

app.use('/api/images', images);

app.use('/api/users', users);

app.use('/api/projects', projects);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`));

// module.exports = app;
// module.exports = parser;

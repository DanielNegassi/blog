const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
//require db
require('./db/db');

//set up our session
app.use(session({
  secret: 'this is a random secret string that you make up',
  resave:false,//only save when the session object has been modified
  saveUninitialized:false// useful for login sessions, we only want to save when we have a session
}));

// Set up middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

const usersController = require('./controllers/auth.js')
const authorsController = require('./controllers/authors.js');
const articlesController = require('./controllers/articles.js');

// Custom middleware to check sesssion
app.use((req, res, next) => {
  // Check to see if they are logged
  // calling next will send them to the route the route they were going to
  // so one of your controllers

  // LOOK AT THE REQUEST FOR INFORMATION ABOUT WHERE IT IS COMING FROM.
  next()
  // if not logged you can redirect wherever you want
});


// set up controller routes
app.use('/auth', usersController);
app.use('/authors', authorsController);
app.use('/articles', articlesController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});



app.listen(3000, () => {
  console.log('App is listening on port 3000');
});

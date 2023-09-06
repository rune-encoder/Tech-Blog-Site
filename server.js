// Import node.js path module provides utilities for working with file and directory paths.
const path = require('path');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Imports Express.js.
const express = require('express');

// Import express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// Import the routes.
const routes = require('./controllers');

// Import the connection object: Sequelize connection.
const sequelize = require('./config/connection');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pointing to the public directory (absolute path).
app.use(express.static(path.join(__dirname, 'public')));

//Send all the requests that begin with / to the index.js in the routes folder.
app.use(routes)

// Synchronize sequelize models to the database before starting Express.js server, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening!'));
});



const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
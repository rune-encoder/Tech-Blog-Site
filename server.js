// const path = require('path');

// Imports Express.js.
const express = require('express');

// Import the routes.
const routes = require('./controllers');

// Import the connection object: Sequelize connection.
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

//Send all the requests that begin with / to the index.js in the routes folder.
app.use(routes)

// Synchronize sequelize models to the database before starting Express.js server, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening!'));
});

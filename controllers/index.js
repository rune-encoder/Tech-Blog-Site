const router = require('express').Router();

const homeRoutes = require('./homeRoutes')
const apiRoutes = require('./api');

// Send all the requests that begin with `/` to homeRoutes.js.
router.use('/', homeRoutes);

// Send all the requests that begin with /api to the index.js in the api folder.
router.use('/api', apiRoutes);

// *** Will DELETE - To help with Insomnia checking routes
router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });

module.exports = router;
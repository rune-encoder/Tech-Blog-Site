const router = require('express').Router();

const homeRoutes = require('./homeRoutes')
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Will DELETE - To help with Insomnia checking routes
router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });

module.exports = router;
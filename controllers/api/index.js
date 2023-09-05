const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

//Send all the requests that begin with /api/users to the userRoutes.js in the api folder.
router.use('/users', userRoutes);

//Send all the requests that begin with /api/posts to the postsRoutes.js in the api folder.
router.use('/posts', postRoutes);

//Send all the requests that begin with /api/comments to the commentroutes.js in the api folder.
router.use('/comments', commentRoutes);

module.exports = router;

const express = require('express');
const { model } = require('mongoose');
const authMiddleware = require('../middlewares/auth')
const blog = require('./blog');
const user = require('./user');
const router = express.Router();
router.use('/blogs', blog,authMiddleware);
router.use('/users', user);
module.exports = router;
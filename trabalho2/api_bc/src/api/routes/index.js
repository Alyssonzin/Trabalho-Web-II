const express = require('express');
const router = express.Router();
const articles = require('./articles');
const users = require('./users');

router.use(express.json());
router.use('/articles', articles);
router.use('/users', users);

module.exports = router;
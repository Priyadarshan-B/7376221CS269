const express = require('express');
const { getPosts } = require('../controllers/latestPost/latestPost');
const router = express.Router();

router.get('/post', getPosts);

module.exports = router;
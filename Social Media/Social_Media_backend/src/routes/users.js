const express = require("express");
const { getUser } = require("../controllers/topUser/topuser");
const router = express.Router();

router.get('/top-user', getUser);

module.exports = router;
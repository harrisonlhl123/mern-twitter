const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/tweets"
  });
});

module.exports = router;
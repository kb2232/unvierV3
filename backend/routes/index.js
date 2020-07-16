const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  res.send(`welcome to home`);
});

module.exports = router;

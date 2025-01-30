var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

/* GET home page. */
router.get('/', auth.authenticate, function(req, res, next) {
  res.render('chat', { title: 'SW1', user: req.session.user });
});

module.exports = router;

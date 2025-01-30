var express = require('express');
var router = express.Router();

/* GET restricted page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    res.render('restricted', { title: 'Restricted' });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;

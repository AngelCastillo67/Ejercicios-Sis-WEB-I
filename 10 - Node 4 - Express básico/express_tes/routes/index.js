var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const items = ['Item 1', 'Item 2', 'Item 3']; // Ejemplo de array de texto
  res.render('index', { title: 'Express', items: items });
});

module.exports = router;
